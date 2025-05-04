import React from "react";

const EmployeeCard = ({ employee, onEdit }) => {
  return (
    <div className="bg-[#0f0f0f] text-white rounded-xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
      <p className="mb-1">📧 Email: {employee.email}</p>
      <p className="mb-1">🏡 Address: {employee.address}</p>
      <p className="mb-4">💳 Payment Info: {employee.paymentInfo}</p>

      <button
        onClick={onEdit}
        className="bg-primary py-2 px-6 rounded-lg hover:bg-primary/90"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default EmployeeCard;
