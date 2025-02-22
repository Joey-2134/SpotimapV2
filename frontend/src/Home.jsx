import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        const displayName = sessionStorage.getItem("displayName");
        const pfpUrl = sessionStorage.getItem("pfpUrl");

        if (jwt && displayName && pfpUrl) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return <div>Redirecting...</div>;
}