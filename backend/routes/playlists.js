import {Router} from 'express';
import {verifyJWT} from "../Utils/JWT.js";
import {fetchUserAccessToken} from "../Utils/AWS.js";

const playlistRouter = Router();

playlistRouter.use(verifyJWT);

playlistRouter.get('/playlists',  async (req, res) => {
    let accessToken = await fetchUserAccessToken(req.user.userId);
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const playlists = await response.json();
        return res.status(200).json(playlists);
    } catch (error) {
        console.log(`Failed to fetch playlists: ${error}`);
    }

})

export default playlistRouter;