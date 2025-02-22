import "react";

export const Login = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:3000/login"; // Redirects to backend Spotify OAuth
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to My App</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
        </div>
    );
};

