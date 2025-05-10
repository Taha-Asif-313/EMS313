import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipboardList, Clock, Wallet, CheckSquare } from "lucide-react";
import StatCard from "../../components/employee/StatCard";
import { useSelector } from "react-redux";

const EmployeeDashboard = ({ employeeId }) => {
  const authToken = useSelector(
    (state) => state.employee.employeeInstance.authToken
  );
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    salary: "$0",
    fullname: "",
    latestTasks: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/employee/employee-dashboard`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true, // Add this to send cookies with the request
          }
        );
        if (data.success) {
          setStats({
            total: data.data.totalTasks,
            completed: data.data.completedTasks,
            pending: data.data.pendingTasks,
            salary: `$${data.data.pendingSalary}`,
            fullname: data.data.fullname,
            latestTasks: data.data.latestTasks,
          });
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, [employeeId]);

  return (
    <div className="lg:p-8 max-h-screen overflow-y-auto max-lg:px-5 bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold max-lg:text-xl">
          Hey <span className="text-primary">{stats.fullname}</span>, Welcome
          Back!
        </h1>
        <button className="bg-primary hover:bg-green-600 transition text-white py-2 px-6 rounded-full">
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          Icon={ClipboardList}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          Icon={CheckSquare}
        />
        <StatCard title="Pending Tasks" value={stats.pending} Icon={Clock} />
        <StatCard title="Pending Salary" value={stats.salary} Icon={Wallet} />
      </div>

      {/* My Tasks Section */}
      <div className="bg-[#121212] p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">
          My Latest Tasks
        </h3>
        <div className="space-y-4">
          {stats.latestTasks.length > 0 ? (
            stats.latestTasks.map((task, index) => (
              <div
                key={index}
                className="bg-black p-4 rounded-lg shadow flex flex-col gap-2 hover:bg-white/5 transition"
              >
                <h4 className="text-lg font-bold text-primary">{task.title}</h4>
                <p className="text-gray-400 text-sm">
                Deadline: {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${getStatusStyles(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                    {task.priority}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No recent tasks found.</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#121212] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
        <div className="flex flex-col gap-4">
          <button className="bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition">
            Submit New Task
          </button>
          <button className="bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition">
            Request Salary Update
          </button>
        </div>
      </div>
    </div>
  );
};

// Utility function to style task status
const getStatusStyles = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-500/20 text-green-300";
    case "pending":
      return "bg-yellow-500/20 text-yellow-400";
    case "in progress":
      return "bg-blue-500/20 text-blue-300";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
};

export default EmployeeDashboard;
