import React from "react";

const StatCard = ({ title, value, Icon }) => {
  return (
    <div className="bg-primary p-6 rounded-xl flex justify-between items-center shadow-md">
      <div>
        <p className="text-sm font-medium ">{title}</p>
        <h2 className="text-3xl font-semibold">{value}</h2>
      </div>
      <Icon className="w-8 h-8" />
    </div>
  );
};

export default StatCard;
