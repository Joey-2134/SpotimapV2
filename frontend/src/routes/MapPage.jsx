import MapComponent from "../components/MapComponent.jsx";
import {useContext, useEffect, useState} from "react";
import {getArtistsData} from "../requests/Spotify.js";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export const MapPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [artistData, setArtistData] = useState([]);
    const [error, setError] = useState("");
    const [playlistId, setPlaylistId] = useState(null);

    const navigate = useNavigate();
    const { isAuthenticated, jwt } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]); // check auth

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('playlistId');

        if (!id) {
            setError("No playlist ID found in URL");
            setIsLoading(false);
        } else {
            setPlaylistId(id);
        }
    }, []); // get playlistId from URL

    useEffect(() => {
        if (!playlistId) return;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getArtistsData(jwt, playlistId);

                setArtistData(response.data);
                console.table(response.data);
            } catch (error) {
                if (error.response) {
                    setError(`HTTP error! Status: ${error.response.status}`);
                } else {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [playlistId, jwt]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center mt-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#1ed760] border-solid"></div>
                <p className="ml-3 text-white text-lg"> Loading your map...</p>
                <p className="ml-3 text-white text-lg">(This takes approx 1 second per track in your playlist)</p>
            </div>
        )
    }

    if (error) { // needs restyling
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
                <div className="text-center text-red-500">
                    <p>Error loading data: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="map h-screen w-screen">
            <MapComponent artistData={artistData}/>
        </div>
    );
}