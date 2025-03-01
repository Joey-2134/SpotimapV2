import "react";
import {BACKEND_BASE_URL} from "../../utils/constants.js";

export const Login = () => {

    const handleLogin = async () => {
        window.location.href = `${BACKEND_BASE_URL}/login`;
    };

    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://wallpaperaccess.com/download/black-world-map-4k-2911097)",
            }}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">SpotiMap</h1>
                    <p className="mb-5">
                        Discover Where Your Favorite Artists Are From – Log in with Spotify and select a playlist to get started!
                    </p>
                    <button className="btn  bg-[#1ed760] text-black glow-[#1ed760]" onClick={handleLogin}>Login With Spotify</button>
                </div>
            </div>
        </div>
    );
};

