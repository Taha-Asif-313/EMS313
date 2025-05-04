import { Router } from "express";
import {
  acceptTask,
  addEmployee,
  AllEmployees,
  AssignTask,
  fireEmployee,
  login,
  logout,
  pendingTasks,
  rejectTask,
  signup,
  totalPendinTasks,
  totalSalaries,
} from "../Controllers/adminControllers.js";
import adminAuthMiddleware from "../Middlewares/isAdmin.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.post("/add-employee", addEmployee);

router.post("/assign-task/:id", AssignTask);

router.get("/all-employees", AllEmployees);

router.get("/all-pending-tasks/:id", pendingTasks);

router.delete("/fire-employee/:id", fireEmployee);

router.post("/reject-task/:id", rejectTask);

router.post("/accept-task/:id", acceptTask);

router.get("/total-salaries", totalSalaries);

router.get("/total-pending-tasks", totalPendinTasks);


export default router;
