import React, { useEffect, useState } from "react";
import {
  UsersIcon,
  ClipboardListIcon,
  WalletIcon,
  ClockIcon,
} from "lucide-react";
import StatCard from "../../components/admin/StatCard"; // import the reusable component
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const DashboardPage = () => {
  const authToken = useSelector((state) => state.admin.adminInstance.authToken);
  console.log(authToken);

  // State for storing API responses
  const [dashboardStats, setDashboardStats] = useState({
    totalSalaries: 0,
    totalPendingTasks: 0,
    employees: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Utility function for formatting numbers with K, M, B suffixes
  const formatNumber = (num) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + "B";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + "K";
    }
    return num.toString();
  };

  useEffect(() => {
    if (!authToken) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/dashboard-stats`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true, // Add this to send cookies with the request
          }
        );

        const data = response.data;

        console.log("Dashboard API response:", data);

        setDashboardStats({
          totalSalaries: data.totalSalaries,
          totalPendingTasks: data.totalPendingTasks,
          employees: data.employees,
          recentTasks: data.recentTasks,
        });
        setError(null);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [authToken]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-8 max-h-screen overflow-y-auto max-lg:pt-24 max-lg:px-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black max-lg:text-lg">
          Hey <span className="text-primary">Taha Asif</span>, Welcome to EMS
          313 Dashboard!
        </h1>
        <button className="bg-primary text-white py-2 px-6 rounded-full">
          Logout
        </button>
   
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Employees"
          value={dashboardStats.employees.length}
          Icon={UsersIcon}
        />
        <StatCard
          title="Salaries Paid"
          value={`$${formatNumber(dashboardStats.totalSalaries)}`}
          Icon={WalletIcon}
        />
        <StatCard
          title="Pending Tasks"
          value={dashboardStats.totalPendingTasks}
          Icon={ClipboardListIcon}
        />
        <StatCard title="Pending Salaries" value="$15,000" Icon={ClockIcon} />
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 mt-8">
        <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
        <div className="h-64 bg-gray-200 rounded-lg flex justify-center items-center">
          <p className="text-gray-500">Chart placeholder</p>
        </div>
      </div>

      {/* Recent Submitted Tasks */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Recent Submitted Tasks</h3>
        <div className="space-y-4">
          {/* Single Task Card */}
          <div className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition flex justify-between items-center">
            <div>
              <h4 className="text-md font-bold text-primary">
                Fix Bug in Login Page
              </h4>
              <p className="text-gray-600 text-sm">
                Submitted on: 26th April 2025
              </p>
            </div>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
              Completed
            </span>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition flex justify-between items-center">
            <div>
              <h4 className="text-md font-bold text-primary">
                Update Profile UI
              </h4>
              <p className="text-gray-600 text-sm">
                Submitted on: 25th April 2025
              </p>
            </div>
            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
              Pending Review
            </span>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition flex justify-between items-center">
            <div>
              <h4 className="text-md font-bold text-primary">
                Implement Payment Gateway
              </h4>
              <p className="text-gray-600 text-sm">
                Submitted on: 24th April 2025
              </p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              In Progress
            </span>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Employee List
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-green-100 text-green-700">
                <th className="py-3 px-6 text-left font-semibold">Name</th>
                <th className="py-3 px-6 text-left font-semibold">Role</th>
                <th className="py-3 px-6 text-left font-semibold">Salary</th>
              </tr>
            </thead>
            <tbody>
              {dashboardStats.employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-100 transition">
                  <td className="py-4 px-6 border-b font-medium">{emp.name}</td>
                  <td className="py-4 px-6 border-b">{emp.role}</td>
                  <td className="py-4 px-6 border-b">${emp.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
