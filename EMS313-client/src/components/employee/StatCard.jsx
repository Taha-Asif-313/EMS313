import React from "react";

const StatCard = ({ title, value, Icon }) => {
  return (
    <div className="bg-gradient-to-t from-green-500/10 to-primary/30 p-6 rounded-xl flex justify-between items-center shadow-md">
      <div>
        <p className="text-sm font-medium text-green-400">{title}</p>
        <h2 className="text-3xl font-semibold">{value}</h2>
      </div>
      <Icon className="text-green-400 w-8 h-8" />
    </div>
  );
};

export default StatCard;
