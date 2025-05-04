import React from "react";
import { useSelector } from "react-redux";
import LoginPage from "../../pages/auth/LoginPage";

const EmployeeProtected = (props) => {
  const  isEmployeeLogin  = useSelector(
    (state) => state.employee.isEmployeeLogin
  );
  const { Component } = props;
  return isEmployeeLogin ? <Component /> : <LoginPage />;
};

export default EmployeeProtected;
