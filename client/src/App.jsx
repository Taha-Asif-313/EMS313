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
import AdminProtected from "./components/Protected/AdminProtected";
import EmployeeProtected from "./components/Protected/EmployeeProtected";
import AuthLayout from "./pages/auth/AuthLayout";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth pages */}
          <Route path="/" element={<AuthLayout/>}>
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Admin protected pages */}
          <Route
            path="/admin"
            element={<AdminProtected Component={AdminLayout} />}
          >
            <Route
              index
              element={<AdminProtected Component={DashboardPage} />}
            />
            <Route
              path="manage-employee"
              element={<AdminProtected Component={ManageEmployeePage} />}
            />
            <Route
              path="add-employee"
              element={<AdminProtected Component={AddEmployeePage} />}
            />
          </Route>

          {/* Employee protected pages */}
          <Route
            path="/employee"
            element={<EmployeeProtected Component={EmployeeLayout} />}
          >
            <Route
              index
              element={<EmployeeProtected Component={EmployeePortalPage} />}
            />
            <Route
              path="employee-tasks"
              element={<EmployeeProtected Component={EmployeeTasksPage} />}
            />
            <Route
              path="support"
              element={<EmployeeProtected Component={SupportPage} />}
            />
          </Route>

          {/* 404 Page - Must be the last route */}
          <Route path="*" element={<p>No found</p>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
