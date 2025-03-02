import {useEffect, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import {fetchUserPlaylists} from "../requests/Spotify.js";
import PlaylistCard from "../compenents/PlaylistCard.jsx";
import Navbar from "../compenents/Navbar.jsx";

export const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true); // ⬅️ Loading state
    const navigate = useNavigate();
    const { isAuthenticated, displayName, pfpUrl, jwt } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    useEffect(() => {
        const getPlaylists = async () => {
            setLoading(true); // ⬅️ Show loading before fetching
            try {
                const res = await fetchUserPlaylists(jwt);
                setPlaylists(res.data.items);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            } finally {
                setLoading(false); // ⬅️ Hide loading after fetching
            }
        };

        if (jwt) {
            getPlaylists();
        }
    }, [jwt]);

    return (
        <>
            <Navbar pfp={pfpUrl} name={displayName}/>
            <div className="flex flex-col items-center">

                <h2 className="mb-5 text-5xl font-bold">Your Playlists</h2>

                {loading ? (
                    <div className="flex items-center justify-center mt-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#1ed760] border-solid"></div>
                        <p className="ml-3 text-white text-lg">Loading your playlists...</p>
                    </div>
                ) : playlists.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {playlists.map(playlist => (
                            <PlaylistCard key={playlist.id} imgUrl={playlist.images[0]?.url} playlistName={playlist.name} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No playlists found. Try creating one!</p>
                )}
            </div>
        </>
    );
};