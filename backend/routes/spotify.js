import {Router} from 'express';
import {verifyJWT} from "../utils/JWT.js";
import {fetchUserAccessToken} from "../utils/AWS.js";
import {verifySpotifyAccessToken} from "../middleware/SpotifyMiddleware.js";

const playlistRouter = Router();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

playlistRouter.use(verifyJWT, verifySpotifyAccessToken);

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
// playlistRouter.get('/playlists/:playlistId', async (req, res) => {
//     let accessToken = await fetchUserAccessToken(req.user.userId);
//     let artistNames = new Set();
//     let countries = new Set();
//     const { playlistId } = req.params;
//
//     try {
//         let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
//
//         while (nextUrl) {
//             const response = await fetch(nextUrl, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });
//
//             if (!response.ok) return res.status(404).json({ message: 'Playlist not found or error occurred' });
//
//             const data = await response.json();
//             // data.items.forEach(item => {
//             //     item.track.artists.forEach(artist => {
//             //         artistNames.add(artist.name);
//             //     })
//             // })
//             nextUrl = data.next;
//         }
//     } catch (error) { // gets list of artists from playlist
//         console.log(`Failed to fetch playlist tracks: ${error}`);
//         return res.status(500).json({ message: 'Failed to fetch playlist tracks.' });
//     }
//
//     // for (const artist of artistNames) {
//     //     try {
//     //         console.log(`Getting country for ${artist}`);
//     //         const country = await getCountryFromMBFromArtistName(artist);
//     //         countries.add(country);
//     //         await delay(DELAY_BETWEEN_MB_REQUESTS);
//     //
//     //     } catch (error) {
//     //         console.error(`Failed to fetch country for artist ${artist}: ${error.message}`);
//     //     }
//     // } //gets country of each artist
//     //
//     // countries = Array.from(countries);
//     // console.log("Old countries:", countries);
//     // countries = await cleanCountryData(countries);
//     // let newCountrySet = new Set();
//     // for (const country of countries) {
//     //     if (country) newCountrySet.add(country);
//     // }
//     // console.log("clean countries:", newCountrySet);
//     // return res.status(200).json(Array.from(newCountrySet));
//
// });

export default playlistRouter;