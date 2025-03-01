import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API_URL;

export const fetchUserPlaylists = async (jwt) => {
    return await axios.get(`${BACKEND_URL}/playlists`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}