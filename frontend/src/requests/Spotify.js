import axios from "axios";
import {BACKEND_BASE_URL} from "../../utils/constants.js";

export const fetchUserPlaylists = async (jwt) => {
    return await axios.get(`${BACKEND_BASE_URL}/playlists`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}