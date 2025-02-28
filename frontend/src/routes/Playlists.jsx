import {useEffect, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import {fetchUserPlaylists} from "../requests/Spotify.js";

export const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated, displayName, pfpUrl, jwt} = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    useEffect(() => {
        const getPlaylists = async () => {
            try {
                const res = await fetchUserPlaylists(jwt);
                setPlaylists(res.data);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };

        if (jwt) {
            getPlaylists();
        }
    }, [jwt]);

    return (
        <div>
            <h1>Welcome, {displayName}!</h1>
            <img
                src={pfpUrl}
                alt="Profile"
                style={{ borderRadius: "50%" }}
            />
            <br />

            <h2>Your Playlists</h2>
            {playlists.length > 0 ? (
                <ul>
                    {playlists.map(playlist => (
                        <li key={playlist.id}>
                            <div>
                                {playlist.images && playlist.images[0] && (
                                    <img
                                        src={playlist.images[0].url}
                                        alt={`${playlist.name} cover`}
                                        style={{ width: "50px", height: "50px", marginRight: "10px" }}
                                    />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No playlists found. Try creating one!</p>
            )}
        </div>
    );
};