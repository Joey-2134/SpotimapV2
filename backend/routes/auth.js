import { Router } from "express";
import jwt from "jsonwebtoken";
import {generateJWT} from "../utils/JWT.js";

const authRouter = Router();

authRouter.post("/refresh", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ message: "Forbidden: No refresh token provided" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const { accessToken } = generateJWT(decoded.userId);

        return res.json({ accessToken });
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired refresh token" });
    }
});

export default authRouter;
