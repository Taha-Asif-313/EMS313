import React from "react";

const RejectTaskModal = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-red-600">Reject Task</h2>
        <p className="text-gray-600 mb-4">Reject task <strong>{task?.title}</strong>?</p>

        <textarea
          className="w-full border p-3 rounded mb-4"
          rows="3"
          placeholder="Reason for rejection..."
        />

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectTaskModal;
