import crypto from "crypto";
import {stringify} from "node:querystring";
import {Router} from "express";
import dotenv from 'dotenv';
import {SPOTIFY_SCOPE} from "../utils/Constants.js";
dotenv.config();

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;
const scope = SPOTIFY_SCOPE

const loginRouter = Router();

loginRouter.get('/login', (req, res) => {
    let state = crypto.randomBytes(16).toString('hex');
    console.log("Attempting to log in...");
    res.redirect('https://accounts.spotify.com/authorize?' +
        stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
})

export default loginRouter;