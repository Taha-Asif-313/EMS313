import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomDropdown from "./CustomDropDown";
import { useSelector } from "react-redux";

const defaultForm = {
  fullname: "",
  email: "",
  password: "",
  salary: "",
  phone_no: "",
  country: "Pakistan",
  CNIC: "",
  role: "developer",
};

const AddEmployeeModal = ({ onClose, onSuccess }) => {
    const authToken = useSelector((state) => state.admin.adminInstance.authToken);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
  
    const toastId = toast.loading("Adding employee...");
  
    try {
      const token = localStorage.getItem("token");
  
      const res = await axios.post(
       `${import.meta.env.VITE_SERVER_URL}/api/admin/add-employee`,
        form,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      if (res.data.success) {
        toast.success("Employee added successfully!", { id: toastId });
        onSuccess?.(); // Callback
        onClose();     // Close modal
      } else {
        toast.error(res.data.message || "Failed to add employee", { id: toastId });
        setError(res.data.message || "Failed to add employee");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      toast.error(errorMsg, { id: toastId });
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Add New Employee
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <input
            name="fullname"
            className="p-2 border rounded"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
          />
          <input
            name="email"
            className="p-2 border rounded"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="phone_no"
            className="p-2 border rounded"
            placeholder="Phone Number"
            value={form.phone_no}
            onChange={handleChange}
          />
          <input
            name="CNIC"
            className="p-2 border rounded"
            placeholder="CNIC"
            value={form.CNIC}
            onChange={handleChange}
          />
          <input
            name="salary"
            className="p-2 border rounded"
            placeholder="Salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
          />
          <input
            name="password"
            className="p-2 border rounded"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <CustomDropdown
            label="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
            options={["Pakistan", "USA", "UK", "Other"]}
          />

          <CustomDropdown
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={["developer", "designer", "manager", "qa", "other"]}
          />
        </div>

        {error && (
          <p className="text-red-600 mt-2 text-sm text-center">{error}</p>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-1 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-1 bg-primary text-sm text-white rounded hover:bg-green-700"
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
