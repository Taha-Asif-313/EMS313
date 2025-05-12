import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AcceptTaskModal = ({ task, onClose }) => {
  const authToken = useSelector(
    (state) => state.admin.adminInstance.authToken
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAccept = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/accept-task/${task._id}`,
        {}, // No body needed
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(res);

      // Optional: refresh task list or show success toast
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Accept Task</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to accept task <strong>{task?.title}</strong>?
        </p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Accepting..." : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptTaskModal;
