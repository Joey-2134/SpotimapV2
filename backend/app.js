//<editor-fold desc="Imports and Constants">
require('dotenv').config();

const express = require('express');
const crypto = require('crypto');
const {stringify} = require("node:querystring");
const axios = require('axios');
const { fetchUserSpotifyData } = require("./Utils/SpotifyUtils");
const { saveUserToDb } = require("./Utils/AWS");

const app = express();
const port = 3000

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const scope = process.env.SCOPE;
//</editor-fold>

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/login', (req, res) => {
    let state = crypto.randomBytes(16).toString('hex');
    res.redirect('https://accounts.spotify.com/authorize?' +
        stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
})

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null || code === null) {
        res.send('Failed to obtain authorization code.');
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

        console.log(exchangeRes.data);
        const {access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn} = exchangeRes.data;

        let userId = await fetchUserSpotifyData(accessToken);

        if (userId) {
            await saveUserToDb(userId, accessToken, refreshToken, expiresIn);
            console.log('User saved to DB');
        } else {
            res.send('Failed to obtain user ID.');
        }

    } catch (error) {
        console.error('Error exchanging authorization code:', error);
        res.send('Failed to obtain access token.');
    }
})

app.listen(port, () => {
    console.log(`Spotimap listening on port: ${port}`)
})