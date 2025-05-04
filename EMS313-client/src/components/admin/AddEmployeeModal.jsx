import React from "react";

const AddEmployeeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>

        {/* Form */}
        <div className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Name" />
          <input className="w-full p-2 border rounded" placeholder="Role" />
          <input className="w-full p-2 border rounded" placeholder="Salary" />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded">
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
