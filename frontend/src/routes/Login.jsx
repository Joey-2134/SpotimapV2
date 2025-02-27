import "react";
import {BACKEND_BASE_URL} from "../../utils/constants.js";

export const Login = () => {

    const handleLogin = async () => {
        window.location.href = `${BACKEND_BASE_URL}/login`;
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
        </div>
    );
};

