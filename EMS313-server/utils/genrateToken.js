import jwt from "jsonwebtoken";

// JWT token generator
export const employeeGenerateToken = (userid, res) => {
  // Sign payload with secret key
  const token = jwt.sign({ id: userid, role: 'employee' }, process.env.JWT_SECRET);

  // Responce
  return token;
};

export const adminGenerateToken = (userid, res) => {
  // Sign payload with secret key
  const token = jwt.sign({ id: userid, role: 'admin' }, process.env.JWT_SECRET);

  // Responce
  return token;
};
