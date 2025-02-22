import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Playlists = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ displayName: "", pfpUrl: "" });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const jwt = params.get("jwt");
        const displayName = params.get("displayName");
        const pfpUrl = params.get("pfpUrl");

        if (jwt) {
            localStorage.setItem("jwt", jwt);
            sessionStorage.setItem("displayName", displayName);
            sessionStorage.setItem("pfpUrl", pfpUrl);

            setUser({ displayName, pfpUrl });

            window.history.replaceState({}, document.title, "/dashboard");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome, {user.displayName || "User"}!</h1>
            <img
                src={user.pfpUrl || "https://via.placeholder.com/100"}
                alt="Profile"
                width="100"
                style={{ borderRadius: "50%" }}
            />
            <br />
            <button onClick={() => {
                localStorage.removeItem("jwt");
                sessionStorage.clear();
                navigate("/login");
            }}>
                Logout
            </button>
        </div>
    );
};
