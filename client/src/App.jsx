import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/auth/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import ManageEmployeePage from "./pages/admin/ManageEmployeePage";
import AddEmployeePage from "./pages/admin/AddEmployeePage";
import AdminLayout from "./pages/admin/AdminLayout";
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import SupportPage from "./pages/employee/SupportPage";
import EmployeePortalPage from "./pages/employee/EmployeePortalPage";
import EmployeeTasksPage from "./pages/employee/EmployeeTasksPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="manage-employee" element={<ManageEmployeePage />} />
            <Route path="add-employee" element={<AddEmployeePage />} />
          </Route>
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<EmployeePortalPage />} />
            <Route path="employee-tasks" element={<EmployeeTasksPage />} />
            <Route path="support" element={<SupportPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
