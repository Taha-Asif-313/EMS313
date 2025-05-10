import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../../components/employee/TaskCard";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const EmployeeTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = useSelector(
    (state) => state.employee.employeeInstance.authToken
  );

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/employee/all-tasks`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if(loading) return <Loading/>

  return (
    <div className="lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  );
};

export default EmployeeTasksPage;
