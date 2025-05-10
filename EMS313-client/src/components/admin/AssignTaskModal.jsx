import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AssignTaskModal = ({ employee, onClose, onSuccess }) => {
  const authToken = useSelector((state) => state.admin.adminInstance.authToken);
  const [form, setForm] = useState({
    title: "",
    task: "",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAssign = async () => {
    if (!form.title || !form.task) {
      toast.error("Title and Task description are required.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/assign-task/${
          employee._id
        }`,
        form,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (res.data.success) {
        toast.success("Task assigned successfully!");
        onSuccess?.(); // optional callback to refresh tasks
        onClose();
      } else {
        toast.error(res.data.message || "Failed to assign task.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while assigning task.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-sm">
        <h2 className="text-2xl font-bold mb-4">Assign Task</h2>
        <p className="text-gray-600 mb-6">
          Assigning task to <strong>{employee?.fullname}</strong>
        </p>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3 text-sm"
          placeholder="Task Title"
        />

        <textarea
          name="task"
          value={form.task}
          onChange={handleChange}
          className="w-full border rounded p-3 text-sm"
          rows="4"
          placeholder="Describe the task..."
        />

        <div className="mt-4">
          <label className="block text-xs mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-xs mb-1">Due Date (optional)</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskModal;
