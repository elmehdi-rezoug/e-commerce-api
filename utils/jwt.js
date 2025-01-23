// JWT utilities for token generation and verification
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Get JWT secret from env vars
const SECRET_KEY = process.env.SECRET_KEY;

// Generate JWT token with 1 hour expiry
export function generateToken(payload) {
  console.log(SECRET_KEY);
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

// Verify JWT token and return decoded payload
export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}