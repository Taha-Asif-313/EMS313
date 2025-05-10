import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-[#0f0f0f] text-white rounded-xl p-5 shadow-xl flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <p className="text-gray-200 text-sm">{task.task}</p>

        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-bold ${
              task.status === "completed" ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {task.status}
          </span>
          <span className="text-sm text-gray-500">
            Deadline: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
        <span
          className={`inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
            task.priority
          )} text-white`}
        >
          Priority: {task.priority}
        </span>
      </div>

      <Link
        to={`/employee/submit-task/${task._id}`}
        className="mt-4 text-sm bg-primary py-2 text-center rounded-lg hover:bg-primary/90"
      >
        Submit Task
      </Link>
    </div>
  );
};

export default TaskCard;
