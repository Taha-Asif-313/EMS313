import jwt from "jsonwebtoken";

// JWT token generator
export const employeeGenerateToken = (userid, res) => {
  // Sign payload with secret key
  const token = jwt.sign({ id: userid }, process.env.SECRET);

  // Responce
  return res.status(200).cookie("employeeToken", token, {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: "None", // Adjust based on your needs // 1 hour
  });
};

export const adminGenerateToken = (userid, res) => {
  // Sign payload with secret key
  const token = jwt.sign({ id: userid }, process.env.SECRET);

  // Responce
  return res.status(200).cookie("adminToken", token, {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: "None", // Adjust based on your needs // 1 hour
  });
};
