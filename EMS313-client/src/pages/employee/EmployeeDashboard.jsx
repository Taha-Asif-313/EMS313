import React from "react";
import { ClipboardList, Clock, Wallet, CheckSquare } from "lucide-react";
import StatCard from "../../components/employee/StatCard"; // import the new component

const EmployeeDashboard = () => {
  return (
    <div className="lg:p-8 max-h-screen overflow-y-auto max-lg:px-5 bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold max-lg:text-xl">
          Hey <span className="text-primary">Taha Asif</span>, Welcome Back!
        </h1>
        <button className="bg-primary hover:bg-green-600 transition text-white py-2 px-6 rounded-full">
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Tasks" value="42" Icon={ClipboardList} />
        <StatCard title="Completed" value="30" Icon={CheckSquare} />
        <StatCard title="Pending Tasks" value="12" Icon={Clock} />
        <StatCard title="Pending Salary" value="$2,500" Icon={Wallet} />
      </div>

      {/* My Tasks Section */}
      <div className="bg-[#121212] p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">My Latest Tasks</h3>
        <div className="space-y-4">
          {/* Task Card */}
          <div className="bg-black p-4 rounded-lg shadow flex flex-col gap-2 hover:bg-white/5 transition">
            <h4 className="text-lg font-bold text-primary">Update Landing Page</h4>
            <p className="text-gray-400 text-sm">Deadline: 28th April 2025</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">In Progress</span>
              <span className="text-xs bg-primary text-white px-2 py-1 rounded">UI Design</span>
            </div>
          </div>

          {/* Another Task */}
          <div className="bg-black p-4 rounded-lg shadow flex flex-col gap-2 hover:bg-white/5 transition">
            <h4 className="text-lg font-bold text-primary">Fix Payment Gateway</h4>
            <p className="text-gray-400 text-sm">Deadline: 30th April 2025</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Pending</span>
              <span className="text-xs bg-primary text-white px-2 py-1 rounded">Backend</span>
            </div>
          </div>
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

export default EmployeeDashboard;
