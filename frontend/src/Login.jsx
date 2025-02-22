import "react";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../utils/AuthContext.jsx";
import {BACKEND_BASE_URL} from "../utils/constants.js";

export const Login = () => {
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        const response = await axios.get(
            `${BACKEND_BASE_URL}/login`,
            { withCredentials: false }
        );
        login(response);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
        </div>
    );
};

