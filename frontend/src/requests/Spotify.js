import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API_URL;

export const fetchUserPlaylists = async (jwt) => {
    console.log("Fetching user playlists");
    return await axios.get(`${BACKEND_URL}/playlists`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}

export const getArtistsData = async (jwt, playlistId) => {
    console.log(`Fetching artists data for playlist: ${playlistId}`);
    return await axios.get(`${BACKEND_URL}/playlists/${playlistId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}