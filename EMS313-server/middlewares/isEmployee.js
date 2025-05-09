import jwt from "jsonwebtoken";

const employeeAuthMiddleware = (req, res, next) => {
  // Get the token from the Authorization header (Bearer <token>)
  const token = req.headers["authorization"]?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default employeeAuthMiddleware;
