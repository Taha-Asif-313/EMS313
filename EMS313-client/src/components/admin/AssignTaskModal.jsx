import React from "react";

const AssignTaskModal = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Assign Task</h2>
        <p className="text-gray-600 mb-6">Assigning task to {employee?.name}</p>

        <textarea
          className="w-full border rounded p-3"
          rows="4"
          placeholder="Describe the task..."
        />

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskModal;
