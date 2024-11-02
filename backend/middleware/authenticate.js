// middleware/authenticate.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "Access denied. No token provided." });

  const token = authHeader.split(" ")[1]; // Extract the token after 'Bearer '
  if (!token)
    return res.status(401).json({ error: "Access denied. Token missing." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(400).json({ error: "Invalid token." });
  }
};

export default authMiddleware;
