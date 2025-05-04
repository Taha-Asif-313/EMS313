import React from "react";

const StatCard = ({ title, value, Icon }) => {
  return (
    <div className="bg-gradient-to-t from-green-500/10 to-green-500/20 rounded-lg p-6 shadow-lg flex items-center justify-between gap-4">
      <div>
        <h3 className="text-sm font-bold text-green-600">{title}</h3>
        <h2 className="text-3xl font-semibold text-gray-900">{value}</h2>
      </div>
      <Icon className="text-green-600 w-6 h-6" />
    </div>
  );
};

export default StatCard;
