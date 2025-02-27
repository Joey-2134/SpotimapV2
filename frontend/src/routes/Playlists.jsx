import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

export const Playlists = () => {
    const navigate = useNavigate();
    const { isAuthenticated, displayName, pfpUrl} = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    return (
        <div>
            <h1>Welcome, {displayName}!</h1>
            <img
                src={pfpUrl}
                alt="Profile"
                width="100"
                style={{ borderRadius: "50%" }}
            />
            <br />
        </div>
    );
};