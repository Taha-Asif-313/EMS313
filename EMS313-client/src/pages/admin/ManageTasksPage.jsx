import React, { useEffect, useState } from "react";
import {
  ClipboardCheckIcon,
  XCircleIcon,
  PaperclipIcon,
  UserPlusIcon,
} from "lucide-react";
import CheckAttachmentModal from "../../components/admin/CheckAttachmentModal";
import AttachEmployeeModal from "../../components/admin/AttachEmployeeModal";
import AcceptTaskModal from "../../components/admin/AcceptTaskModal";
import RejectTaskModal from "../../components/admin/RejectTaskModal";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import axios from "axios";

const ManageTasksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'attachment' | 'attach' | 'accept' | 'reject'
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = useSelector((state) => state.admin.adminInstance.authToken);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/tasks/submitted`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true, // Add this to send cookies with the request
        }
      );
      console.log(res);
      
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (modalType, task = null) => {
    setSelectedTask(task);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setActiveModal(null);
  };

  if (loading) return <Loading />;

  return (
    <div className="flex-1 p-8 max-h-screen overflow-y-auto max-lg:pt-24 max-lg:px-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold max-lg:text-lg">
          Manage <span className="text-primary">Tasks</span>
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-3 rounded-lg bg-white shadow text-sm border focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tasks Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Submitted Tasks</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-green-100 text-green-700">
                <th className="py-3 px-6 text-left font-semibold">Title</th>
                <th className="py-3 px-6 text-left font-semibold">Employee</th>
                <th className="py-3 px-6 text-left font-semibold">
                  Attachment
                </th>
                <th className="py-3 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-100 transition">
                    <td className="py-4 px-6 border-b font-medium">
                      {task.title}
                    </td>
                    <td className="py-4 px-6 border-b">
                      {task.EmployeeId?.fullname || "N/A"}
                    </td>
                    <td className="py-4 px-6 border-b">
                      {task.submittedUrl || "No file"}
                    </td>
                    <td className="py-4 px-6 border-b">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal("attachment", task)}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                        >
                          <PaperclipIcon size={14} />
                        </button>
                        <button
                          onClick={() => openModal("attach", task)}
                          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full"
                        >
                          <UserPlusIcon size={14} />
                        </button>
                        <button
                          onClick={() => openModal("accept", task)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full"
                        >
                          <ClipboardCheckIcon size={14} />
                        </button>
                        <button
                          onClick={() => openModal("reject", task)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                        >
                          <XCircleIcon size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500 font-medium"
                  >
                    {loading ? "Loading tasks..." : "No tasks found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "attachment" && (
        <CheckAttachmentModal task={selectedTask} onClose={closeModal} />
      )}
      {activeModal === "attach" && (
        <AttachEmployeeModal task={selectedTask} onClose={closeModal} />
      )}
      {activeModal === "accept" && (
        <AcceptTaskModal task={selectedTask} onClose={closeModal} />
      )}
      {activeModal === "reject" && (
        <RejectTaskModal task={selectedTask} onClose={closeModal} />
      )}
    </div>
  );
};

export default ManageTasksPage;
