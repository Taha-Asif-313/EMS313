import React, { useState } from "react";

const EditAdminProfileModal = ({ admin, onClose }) => {
  const [formData, setFormData] = useState(admin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // You can connect API here to save
    console.log("Updated Admin Details:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

        <div className="space-y-4">
          <input
            className="w-full border p-3 rounded"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            className="w-full border p-3 rounded"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="w-full border p-3 rounded"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            className="w-full border p-3 rounded"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdminProfileModal;
