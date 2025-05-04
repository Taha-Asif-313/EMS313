// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const employeeAuthMiddleware = (req, res, next) => {
  const employeeToken = req.cookies.employeeToken;

  if (!employeeToken) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(employeeToken, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default employeeAuthMiddleware;
