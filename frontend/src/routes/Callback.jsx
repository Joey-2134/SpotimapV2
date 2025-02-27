import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export const Callback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);

    useEffect(() => {
        const token = searchParams.get('token');
        const displayName = searchParams.get('displayName');
        const pfpUrl = searchParams.get('pfpUrl');

        if (token && displayName) {
            localStorage.setItem("jwt", token);
            sessionStorage.setItem("displayName", displayName);
            sessionStorage.setItem("pfpUrl", pfpUrl);

            setAuthState({
                isAuthenticated: true,
                jwt: token,
                displayName,
                pfpUrl: pfpUrl || ""
            });

            navigate("/");
        } else {
            console.error("Authentication failed - missing token or user data");
            navigate("/login");
        }
    }, [searchParams, navigate, setAuthState]);

    return (
        <div>
            <h2>Logging you in...</h2>
        </div>
    );
};