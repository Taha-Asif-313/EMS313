import React from "react";
import { useSelector } from "react-redux";
import LoginPage from "../../pages/auth/LoginPage";

const AdminProtected = ({ Component }) => {
  const isAdminLogin = useSelector((state) => state.admin.isAdminLogin);
  
  return isAdminLogin ? <Component /> : <LoginPage />;
};

export default AdminProtected;
