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