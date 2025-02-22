import jwt from 'jsonwebtoken';

export const generateJWT = (userId) => {
    const accessToken =  jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const refreshToken =  jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
}

export const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        console.error("JWT Verification Error:", error.message);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};