import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import express from 'express';
import loginRouter from "./routes/login.js";
import callbackRouter from "./routes/callback.js";
import playlistRouter from "./routes/playlists.js";
import authRouter from "./routes/auth.js";

export const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    credentials: false
}));
app.use(loginRouter, callbackRouter, playlistRouter, authRouter);

app.listen(port, () => {
    console.log(`Spotimap listening on port: ${port}`)
})