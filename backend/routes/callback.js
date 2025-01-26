import axios from "axios";
import {stringify} from "node:querystring";
import {fetchUserSpotifyData} from "../Utils/SpotifyUtils.js";
import {saveUserToDb} from "../Utils/AWS.js";
import {generateJWT} from "../Utils/JWT.js";
import {Router} from "express";
import dotenv from 'dotenv';
dotenv.config();

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;
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
        )

        console.table(exchangeRes.data);
        const {access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn} = exchangeRes.data;

        let userId = await fetchUserSpotifyData(accessToken);

        if (!userId) {
            res.status(401).send('Failed to obtain user ID.');
            return;
        }

        await saveUserToDb(userId, accessToken, refreshToken, expiresIn)
        res.json(generateJWT(userId)); //send frontend back a JWT for them to save locally
        console.log(`User ${userId} saved to database!`);

    } catch (error) {
        console.error('Error exchanging authorization code:', error);
        res.status(500).send('Failed to exchange authorization code.');
    }
})

export default callbackRouter;