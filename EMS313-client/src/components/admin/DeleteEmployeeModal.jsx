import React from "react";

const DeleteEmployeeModal = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Employee</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to delete <strong>{employee?.name}</strong>?</p>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
