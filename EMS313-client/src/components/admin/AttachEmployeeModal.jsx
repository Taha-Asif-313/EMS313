import React from "react";

const AttachEmployeeModal = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Attach/Reassign Employee</h2>
        <p className="text-gray-600 mb-4">Task: <strong>{task?.title}</strong></p>

        <input
          className="w-full p-3 border rounded mb-4"
          placeholder="Enter Employee Name"
        />

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            Attach
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttachEmployeeModal;
