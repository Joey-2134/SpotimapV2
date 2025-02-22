import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
    const [displayName, setDisplayName] = useState(sessionStorage.getItem("displayName") || "");
    const [profilePicture, setProfilePicture] = useState(sessionStorage.getItem("pfp") || "");

    const login = (response) => {
        localStorage.setItem("accessToken", response.accessToken);
        sessionStorage.setItem("displayName", response.displayName);
        sessionStorage.setItem("pfp", response.pfp);

        setToken(response.accessToken);
        setDisplayName(response.displayName);
        setProfilePicture(response.pfp);

        window.location.redirect("http://localhost:5175/playlists");
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("displayName");
        sessionStorage.removeItem("pfp");

        setToken(null);
        setDisplayName("");
        setProfilePicture("");
    };

    return (
        <AuthContext.Provider value={{ token, displayName, profilePicture, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
