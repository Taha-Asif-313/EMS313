import React, { useState } from "react";
import EmployeeCard from "../../components/employee/EmployeeCard";
import EditEmployeeModal from "../../components/employee/EditEmployeeModal";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({
    name: "John Doe",
    email: "john@example.com",
    address: "123 Green Street",
    paymentInfo: "Bank Transfer",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleSave = (updatedData) => {
    setEmployee(updatedData);
    console.log("Updated employee:", updatedData);
  };

  return (
    <div className="p-8">
      <EmployeeCard employee={employee} onEdit={handleEdit} />

      {/* Edit Modal */}
      <EditEmployeeModal
        employee={employee}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default EmployeeProfile;
