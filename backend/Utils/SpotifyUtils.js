export const fetchUserSpotifyData = async (accessToken) => {
    try {
        const res = await fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await res.json();
        return data.id;
    } catch (error) {
        console.log(error);
    }

}