import { fetchUserExpiresAt, fetchUserAccessToken } from "../utils/AWS.js";
import { refreshAccessToken } from "../utils/SpotifyUtils.js";

export const verifySpotifyAccessToken = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const expiresAt = await fetchUserExpiresAt(userId);
        let accessToken = await fetchUserAccessToken(userId);

        if (!expiresAt || !accessToken) {
            return res.status(401).json({ message: "No access token found." });
        }

        if (Date.now() >= expiresAt) {
            console.log("🔄 Access token expired, refreshing...");
            accessToken = await refreshAccessToken(userId);
        }

        req.spotifyAccessToken = accessToken;
        next();
    } catch (error) {
        console.error("Error verifying Spotify token:", error);
        return res.status(500).json({ message: "+Error verifying access token." });
    }
};
