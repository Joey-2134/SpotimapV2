import axios from "axios";

export const getCountryFromMB = async (artistName) => {
    const endpoint = `https://musicbrainz.org/ws/2/artist?query=artist:${artistName}&fmt=json`;
    const headers = {
        'User-Agent': 'SpotimapV2/0.1 ( joeygalvin2134@gmail.com )'
    };

    const response = await axios.get(endpoint, { headers });
    return response.data.artists[0].area.name;
}