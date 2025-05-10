import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const DeleteEmployeeModal = ({ employee, onClose }) => {
  const authToken = useSelector((state) => state.admin.adminInstance.authToken);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/admin/fire-employee/${employee._id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // or wherever your auth token is stored
        },
      });
console.log(res);

      if (res.data.success) {
        toast.success("Employee deleted successfully!");
        onDeleted?.(); // refresh list or update state
        onClose();
      } else {
        toast.error(res.data.message || "Failed to delete employee.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while deleting employee.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Employee</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>{employee?.fullname}</strong>?
        </p>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
