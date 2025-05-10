import { Router } from "express";
import {
  signup,
  login,
  logout,
  allTasks,
  CompleteTask,
  getEmployeeProfile,
  updateEmployeeProfile,
  updatePassword,
  updateTaskStatus,
  completedTasks,
  getEmployeeDashboardData,
} from "../controllers/employeeControllers.js";

import employeeAuthMiddleware from "../middlewares/isEmployee.js";

const router = Router();

// 🛡️ Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

// Get Dashboard Stats
router.get("/employee-dashboard", employeeAuthMiddleware ,getEmployeeDashboardData);

// ✅ Task Routes
router.get("/all-tasks/:id", employeeAuthMiddleware, allTasks);
router.post("/complete-task/:taskId", employeeAuthMiddleware, CompleteTask);
router.get("/completed-tasks/:id", employeeAuthMiddleware, completedTasks);
router.patch("/task-status/:taskId", employeeAuthMiddleware, updateTaskStatus);

// 👤 Profile Routes
router.get("/profile/:id", employeeAuthMiddleware, getEmployeeProfile);
router.put("/profile/:id", employeeAuthMiddleware, updateEmployeeProfile);
router.put("/update-password/:id", employeeAuthMiddleware, updatePassword);

export default router;
