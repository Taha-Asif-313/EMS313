import React, { useState } from "react";
import { PencilIcon } from "lucide-react";
import EditAdminProfileModal from "../../components/admin/EditAdminProfileModal";


const AdminProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const adminDetails = {
    name: "Alex Johnson",
    email: "alex.johnson@admin.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    address: "123 Main Street, Cityville, USA",
  };

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <div className="flex-1 p-8 max-h-screen overflow-y-auto max-lg:pt-24 max-lg:px-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold max-lg:text-lg">
          Admin <span className="text-primary">Profile</span>
        </h1>
        <button
          onClick={openEditModal}
          className="bg-primary text-white py-2 px-6 rounded-full flex items-center gap-2"
        >
          <PencilIcon size={18} /> Edit Profile
        </button>
      </div>

      {/* Admin Details */}
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
        <div>
          <label className="text-gray-600 text-sm">Full Name</label>
          <div className="font-medium text-lg">{adminDetails.name}</div>
        </div>
        <div>
          <label className="text-gray-600 text-sm">Email</label>
          <div className="font-medium text-lg">{adminDetails.email}</div>
        </div>
        <div>
          <label className="text-gray-600 text-sm">Phone</label>
          <div className="font-medium text-lg">{adminDetails.phone}</div>
        </div>
        <div>
          <label className="text-gray-600 text-sm">Role</label>
          <div className="font-medium text-lg">{adminDetails.role}</div>
        </div>
        <div>
          <label className="text-gray-600 text-sm">Address</label>
          <div className="font-medium text-lg">{adminDetails.address}</div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditAdminProfileModal admin={adminDetails} onClose={closeEditModal} />
      )}
    </div>
  );
};

export default AdminProfilePage;
