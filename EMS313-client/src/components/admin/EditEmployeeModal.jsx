import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "../../redux/adminSlice";
import CustomDropdown from "./CustomDropDown";

const EditEmployeeModal = ({ employee, onClose }) => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.admin.adminInstance.authToken);

  const [form, setForm] = useState({
    fullname: employee.fullname,
    email: employee.email,
    salary: employee.salary,
    phone_no: employee.phone_no,
    country: employee.country,
    CNIC: employee.CNIC,
    role: employee.role,
    isActive: employee.isActive,
    paymentStatus: employee.paymentStatus,
    lastPaidDate: employee.lastPaidDate
      ? employee.lastPaidDate.slice(0, 10)
      : "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/edit-employee/${
          employee._id
        }`,
        form,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.data.success) {
        const allRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/all-employees`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        dispatch(setEmployees(allRes.data.allEmployees));
        onClose();
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="text-xs block mb-1">Full Name</label>
            <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="text-xs block mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="text-xs block mb-1">Salary</label>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="text-xs block mb-1">Phone No</label>
            <input
              name="phone_no"
              value={form.phone_no}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="text-xs block mb-1">CNIC</label>
            <input
              name="CNIC"
              value={form.CNIC}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
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
         
          <div>
            <label className="text-xs block mb-1">Last Paid Date</label>
            <input
              name="lastPaidDate"
              type="date"
              value={form.lastPaidDate}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <label className="text-xs">Active</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="paymentStatus"
              checked={form.paymentStatus}
              onChange={handleChange}
            />
            <label className="text-xs">Payment Status Paid</label>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6 text-sm">
          <button onClick={onClose} className="px-4 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-1 bg-primary text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
