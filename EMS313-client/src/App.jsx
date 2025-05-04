import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/auth/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminLayout from "./pages/admin/AdminLayout";
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import SupportPage from "./pages/employee/SupportPage";
import EmployeePortalPage from "./pages/employee/EmployeePortalPage";
import EmployeeTasksPage from "./pages/employee/EmployeeTasksPage";
import AdminProtected from "./components/Protected/AdminProtected";
import EmployeeProtected from "./components/Protected/EmployeeProtected";
import AuthLayout from "./pages/auth/AuthLayout";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeSubmitTask from "./pages/employee/EmployeeSubmitTask";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ManageEmployeesPage from "./pages/admin/ManageEmployeesPage";
import ManageTasksPage from "./pages/admin/ManageTasksPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth pages */}
          <Route path="/" element={<AuthLayout />}>
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
              path="manage-employees"
              element={<AdminProtected Component={ManageEmployeesPage} />}
            />
            <Route
              path="manage-employees-tasks"
              element={<AdminProtected Component={ManageTasksPage} />}
            />
            <Route
              path="admin-profile"
              element={<AdminProtected Component={AdminProfilePage} />}
            />
          </Route>

          {/* Employee protected pages */}
          <Route
            path="/employee"
            element={<EmployeeProtected Component={EmployeeLayout} />}
          >
            <Route
              index
              element={<EmployeeProtected Component={EmployeeDashboard} />}
            />

            <Route
              path="profile"
              element={<EmployeeProtected Component={EmployeeProfile} />}
            />
            <Route
              path="employee-tasks"
              element={<EmployeeProtected Component={EmployeeTasksPage} />}
            />
            <Route
              path="employee-submit-task"
              element={<EmployeeProtected Component={EmployeeSubmitTask} />}
            />
            <Route
              path="Contact Admin"
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
