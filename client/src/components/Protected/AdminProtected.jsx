import React from "react";
import { useSelector } from "react-redux";
import LoginPage from "../../pages/auth/LoginPage";

const AdminProtected = (props) => {
  const { isAdminLogin } = useSelector((state) => state.admin.isAdminLogin);
  const { Component } = props;
  return isAdminLogin ? <Component /> : <LoginPage />;
};

export default AdminProtected;
