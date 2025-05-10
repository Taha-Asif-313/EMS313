import jwt from "jsonwebtoken";

const employeeAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure your .env uses JWT_SECRET or update accordingly

    req.employee = decoded; // You can change this key if you want, e.g., `req.user = decoded` for consistency
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default employeeAuthMiddleware;
