// Import JWT verification utility
import { verifyToken } from "../utils/jwt.js";

// Authentication middleware to verify JWT tokens
export function authMiddleware(req, res, next) {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json("Access denied");
    }

    try {
        const payload = verifyToken(token);
        
        // Add user data to request
        req.userId = payload.userId;
        req.role = payload.role;
        
        next();
    } catch (error) {
        res.status(403).json("Invalid token");
    }
}

// Middleware for admin-only routes
export function adminMiddleware(req, res, next) {
    authMiddleware(req, res, () => {
        if (req.role !== "admin") {
            return res.status(403).json("Access forbidden: Admins only");
        }
        next();
    });
}

// Middleware for user-only routes
export function userMiddleware(req, res, next) {
    authMiddleware(req, res, () => {
        if (req.role !== "user") {
            return res.status(403).json("Access forbidden: Users only");
        }
        next();
    });
}

// Middleware for routes accessible by both users and admins
export function allowBothMiddleware(req, res, next) {
    authMiddleware(req, res, () => {
        if (req.role !== "user" && req.role !== "admin") {
            return res.status(403).json("Access forbidden");
        }
        next();
    });
}