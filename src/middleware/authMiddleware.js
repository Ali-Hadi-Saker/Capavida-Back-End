import jwt from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: "No token provided" });

    try {
        const token = authorization.split(" ")[1];
        console.log("Token received:", token); // Debugging line
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Auth Error:", err.message);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};