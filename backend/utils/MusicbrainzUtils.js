import axios from "axios";
import fs from "fs/promises";

export const getCountryFromMBFromArtistName = async (artistName) => {
    const endpoint = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(artistName)}&fmt=json`;
    const headers = {
        'User-Agent': 'SpotimapV2/0.1 ( joeygalvin2134@gmail.com )'
    };

    try {
        const response = await axios.get(endpoint, { headers });
        const artistData = response.data.artists[0];

        const artistInfo = {
            name: artistData.name,
            country: artistData.area?.name || "Unknown",
        };

        return artistInfo.country;
    } catch (error) {
        console.error(`Failed to fetch artist data: ${error.message}`);
        return null;
    }
};

