import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API_URL;

export const fetchUserPlaylists = async (jwt) => {
    return await axios.get(`${BACKEND_URL}/playlists`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}

export const getArtistsData = async (jwt, playlistId) => {
    return await axios.get(`${BACKEND_URL}/playlists/${playlistId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}