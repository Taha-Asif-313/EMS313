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
  markSalaryAsPaid,  // New import for marking salary as paid
  checkPaymentStatus,
  totalPendingTasks,
  dashboardStats,  // New import for checking payment status
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
router.get("/all-employees", adminAuthMiddleware(), AllEmployees); // Requires admin authentication
router.get("/all-pending-tasks/:id", adminAuthMiddleware(), pendingTasks); // Requires admin authentication
router.delete("/fire-employee/:id", adminAuthMiddleware(), fireEmployee); // Requires admin authentication
router.post("/reject-task/:id", adminAuthMiddleware(), rejectTask); // Requires admin authentication
router.post("/accept-task/:id", adminAuthMiddleware(), acceptTask); // Requires admin authentication
router.get("/total-salaries", adminAuthMiddleware(), totalSalaries); // Requires admin authentication
router.get("/total-pending-tasks", adminAuthMiddleware(), totalPendingTasks); // Requires admin authentication

// Add authentication middleware to protect this route
router.get("/dashboard-stats", adminAuthMiddleware(), dashboardStats); // Fixed to use adminAuthMiddleware() correctly

// Salary management routes
router.put("/mark-salary-paid/:id", adminAuthMiddleware(), markSalaryAsPaid); // Requires admin authentication
router.get("/payment-status/:id", adminAuthMiddleware(), checkPaymentStatus); // Requires admin authentication

export default router;
