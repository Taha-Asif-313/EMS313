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
  totalSalaries,
  markSalaryAsPaid, 
  checkPaymentStatus,
  totalPendingTasks,
  dashboardStats,
  editEmployee,
  getSubmittedTasks,
  updateTaskStatus,
  reAssignTask,  // New import for checking payment status
} from "../controllers/adminControllers.js";
import adminAuthMiddleware from "../middlewares/isAdmin.js";

const router = Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Admin authenticated routes
router.get("/logout", adminAuthMiddleware(), logout); // Requires admin authentication
router.post("/add-employee", adminAuthMiddleware(), addEmployee); // Requires admin authentication
router.post("/assign-task/:id", adminAuthMiddleware(), AssignTask); // Requires admin authentication
router.post("/reassign-task/:taskId", adminAuthMiddleware(), reAssignTask); // Requires admin authentication
router.get("/all-employees", adminAuthMiddleware(), AllEmployees); // Requires admin authentication
router.get("/all-pending-tasks/:id", adminAuthMiddleware(), pendingTasks); // Requires admin authentication
router.delete("/fire-employee/:id", adminAuthMiddleware(), fireEmployee); // Requires admin authentication
router.get("/tasks/submitted", adminAuthMiddleware(), getSubmittedTasks);
router.post("/reject-task/:id", adminAuthMiddleware(), rejectTask); // Requires admin authentication
router.post("/accept-task/:id", adminAuthMiddleware(), acceptTask); // Requires admin authentication
router.get("/total-salaries", adminAuthMiddleware(), totalSalaries); // Requires admin authentication
router.get("/total-pending-tasks", adminAuthMiddleware(), totalPendingTasks); // Requires admin authentication
router.put("/edit-employee/:id", adminAuthMiddleware(), editEmployee); // Edit Employee Details
router.get("/dashboard-stats", adminAuthMiddleware(), dashboardStats); // Get Dashboard Stats
router.patch("/task-status/:taskId",adminAuthMiddleware(), updateTaskStatus);

// Salary management routes
router.put("/mark-salary-paid/:id", adminAuthMiddleware(), markSalaryAsPaid); // Requires admin authentication
router.get("/payment-status/:id", adminAuthMiddleware(), checkPaymentStatus); // Requires admin authentication

export default router;
