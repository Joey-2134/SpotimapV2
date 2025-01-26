import {Router} from 'express';
import {verifyJWT} from "../utils/JWT.js";
import {fetchUserAccessToken} from "../utils/AWS.js";
import {getSetOfArtistsFromPlaylist} from "../utils/SpotifyUtils.js";
import {getCountryFromMB} from "../utils/MusicbrainzUtils.js";

const playlistRouter = Router();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
});

//todo this route could definitely be refactored
playlistRouter.get('/playlists/:playlistId/tracks', async (req, res) => {
    let accessToken = await fetchUserAccessToken(req.user.userId);
    const { playlistId } = req.params;

    try {
        let artistNames = new Set();
        let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        while (nextUrl) {
            const response = await fetch(nextUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                return res.status(404).json({ message: 'Playlist not found or error occurred' });
            }

            const data = await response.json();
            data.items.forEach(item => {
                item.track.artists.forEach(artist => {
                    artistNames.add(artist.name);
                })
            })
            nextUrl = data.next;
        } // gets list of artists from playlist

        let countries = new Set();
        for (const artist of artistNames) {
            try {

                console.log(`Getting country for ${artist}`);
                const country = await getCountryFromMB(artist);
                countries.add(country);
                await delay(700);

            } catch (error) {
                console.error(`Failed to fetch country for artist ${artist}: ${error.message}`);
            }
        }

        return res.status(200).json(Array.from(countries));

    } catch (error) {
        console.log(`Failed to fetch playlist: ${error}`);
        return res.status(500).json({ message: 'Failed to fetch playlist tracks.' });
    }
});


export default playlistRouter;