import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ReAssignTaskModal = ({ task, onClose }) => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const authToken = useSelector((state) => state.admin.adminInstance.authToken);

  const handleAttach = async () => {
    if (!text || !url) {
      toast.error("Both text and URL are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/reassign-task/${
          task._id
        }`,
        { text, url },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // or wherever your auth token is stored
          },
        }
      );

      toast.success("Task submitted successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-sm">
        <h2 className="text-xl font-bold mb-4">Reassign Task</h2>
        <p className="text-gray-600 mb-4">
          Task: <strong>{task?.title}</strong>
        </p>

        <textarea
          className="w-full p-3 border rounded mb-4"
          placeholder="Enter Message"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded mb-4"
          placeholder="Enter Attachment URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleAttach}
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {loading ? "Submitting..." : "Attach"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReAssignTaskModal;
