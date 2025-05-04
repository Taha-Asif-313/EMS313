import TaskCard from "../../components/employee/TaskCard";

const EmployeeTasksPage = () => {
  const tasks = [
    { id: 1, title: "Finish Report", description: "Complete Q1 report", status: "Pending", deadline: "2025-05-01" },
    { id: 2, title: "Team Meeting", description: "Would you like me to also show you a Dashboard page design (with employee stats cards) and Tasks page design (with beautiful task cards)? 🚀 I can build those super quick for you too if you want! 🎯 Should I? ✅", status: "Completed", deadline: "2025-04-20" },
  ];

  return (
    <div className="lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default EmployeeTasksPage;
