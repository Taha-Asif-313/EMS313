import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-[#0f0f0f] text-white rounded-xl p-5 shadow-xl flex flex-col justify-between">
      <div className="flex flex-col gap-3">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-gray-400 text-sm">{task.description}</p>
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-bold ${
            task.status === "Completed" ? "text-green-400" : "text-yellow-400"
          }`}
        >
          {task.status}
        </span>
        <span className="text-sm text-gray-500">{task.deadline}</span>
      </div>
      </div>
     

      <Link
        to={`/employee/submit-task/${task.id}`}
        className="mt-4 text-sm bg-primary py-2 text-center rounded-lg hover:bg-primary/90"
      >
        Submit Task
      </Link>
    </div>
  );
};

export default TaskCard;
