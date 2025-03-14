import axios from "axios";
import {stringify} from "node:querystring";
import {fetchUserSpotifyData} from "../utils/SpotifyUtils.js";
import {saveUserToDb} from "../utils/AWS.js";
import {generateJWT} from "../utils/JWT.js";
import {Router} from "express";
import dotenv from 'dotenv';
import {FRONTEND_BASE_URL} from "../utils/Constants.js";
dotenv.config();

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';
const client_secret = process.env.CLIENT_SECRET;

const callbackRouter = Router();

callbackRouter.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null || code === null) {
        res.status(401).send('Failed to obtain authorization code.');
        return;
    }

    try {
        const exchangeRes = await axios.post('https://accounts.spotify.com/api/token',
            stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
                client_id: client_id,
                client_secret: client_secret
            }),
        );

        const {access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn} = exchangeRes.data;

        let userData = await fetchUserSpotifyData(accessToken);
        const {id: userId, display_name: displayName, images} = userData;
        const pfpUrl = images?.[0]?.url || null;

        if (!userId) {
            res.status(401).send('Failed to obtain user ID.');
            return;
        }

        try {
            await saveUserToDb(userId, accessToken, refreshToken, expiresIn, displayName, pfpUrl);
            //console.log("User Spotify AT: " + accessToken);
            console.log(`User ${userId} saved to database!`);
        } catch (error) {
            console.error('Error saving user to database:', error);
            res.status(500).send('Failed to save user to database.');
            return;
        }

        const {accessToken: jwtAccess, refreshToken: jwtRefreshToken} = generateJWT(userId);

        res.cookie('refresh_token', jwtRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        return res.redirect(`${FRONTEND_BASE_URL}/callback?token=${encodeURIComponent(jwtAccess)}&displayName=${encodeURIComponent(displayName)}&pfpUrl=${encodeURIComponent(pfpUrl || '')}`);
    } catch (error) {
        console.error('Error exchanging authorization code:', error);
        res.status(500).send('Failed to exchange authorization code.');
    }
})

export default callbackRouter;