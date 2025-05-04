import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../../components/employee/EmployeeSidebar";

const EmployeeLayout = () => {
  return (
    <div className="flex bg-[#0a0a0a] text-white">
      <EmployeeSidebar />
      <main className="flex-1 max-lg:pt-24">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
