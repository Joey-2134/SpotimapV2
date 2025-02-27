import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

export const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/playlists");
        } else {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    return <div>Redirecting...</div>;
};