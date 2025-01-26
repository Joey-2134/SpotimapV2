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