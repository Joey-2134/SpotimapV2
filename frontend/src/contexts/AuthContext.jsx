import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        jwt: null,
        displayName: null,
        pfpUrl: null
    });
    
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        const displayName = sessionStorage.getItem("displayName");
        const pfpUrl = sessionStorage.getItem("pfpUrl");

        if (jwt && displayName) {
            setAuthState({
                isAuthenticated: true,
                jwt,
                displayName,
                pfpUrl: pfpUrl || ""
            });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("jwt");
        sessionStorage.removeItem("displayName");
        sessionStorage.removeItem("pfpUrl");
        
        setAuthState({
            isAuthenticated: false,
            jwt: null,
            displayName: null,
            pfpUrl: null
        });
    };

    return (
        <AuthContext.Provider value={{
            ...authState,
            logout,
            setAuthState
        }}>
            {children}
        </AuthContext.Provider>
    );
};