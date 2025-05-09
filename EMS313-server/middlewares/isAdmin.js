import jwt from 'jsonwebtoken';

const adminAuthMiddleware = () => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization header missing or malformed' });
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ success: false, message: 'Access token missing' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Optionally check for admin role if your payload has `role`
      // if (decoded.role !== 'admin') {
      //   return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
      // }

      req.user = decoded; // Attach entire decoded payload for flexibility

      next(); // Proceed to controller
    } catch (err) {
      console.error('Auth Error:', err.message);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token has expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      return res.status(500).json({ success: false, message: 'Internal server error during token verification' });
    }
  };
};

export default adminAuthMiddleware;
