import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
