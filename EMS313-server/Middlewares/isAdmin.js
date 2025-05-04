// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const adminAuthMiddleware = (req, res, next) => {
  const adminToken = req.cookies.adminToken;

  if (!adminToken) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(adminToken, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default adminAuthMiddleware;
