// JWT token generator
export const employeeTokenRemover = (res) => {
  // Responce
  return res.status(200).clearCookie("employeeToken");
};

// JWT token generator
export const adminTokenRemover = (res) => {
  // Responce
  return res.status(200).clearCookie("adminToken");
};
