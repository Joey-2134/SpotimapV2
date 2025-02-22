import {fetchUserRefreshToken, updateUserDetails} from "./AWS.js";
import axios from "axios";
import {stringify} from "node:querystring";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

export const fetchUserSpotifyData = async (accessToken) => {
    try {
        const res = await fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export const getSetOfArtistsFromPlaylist = (playlistTracks) => {
    let artists = new Set();

    if (!playlistTracks || !playlistTracks.items) {
        return artists; // Return empty set if no items
    }

    playlistTracks.items.forEach(item => {
        item.track.artists.forEach(artist => {
            artists.add(artist.name);
        })
    });

    return artists;
}

export const refreshAccessToken = async (userId) => {
    const refreshToken = await fetchUserRefreshToken(userId);
    if (!refreshToken) {
        console.error('Refresh token not found');
        return;
    }

    try { //request to refresh access token
        const response = await axios.post('https://accounts.spotify.com/api/token',
            stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${authHeader}`,
                }
            }
        );

        const {access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = response.data;

        await updateUserDetails(userId, accessToken, refreshToken, expiresIn); //update user in aws DB

        return accessToken;
    } catch (error) {

    }

}