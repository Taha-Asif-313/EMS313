import React, { useState } from "react";

const EditEmployeeModal = ({ employee, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(employee);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0f0f0f] p-8 rounded-xl w-full max-w-md shadow-2xl text-white">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700"
          />

          <input
            type="text"
            name="paymentInfo"
            placeholder="Payment Info"
            value={formData.paymentInfo}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-6 rounded-lg bg-primary hover:bg-primary/90 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
