import { Router } from "express";
import {
  allTasks,
  CompleteTask,
  login,
  logout,
  signup,
} from "../Controllers/employeeControllers.js";
import employeeAuthMiddleware from "../Middlewares/isEmployee.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.get("/all-tasks/:id", allTasks);

router.post("/complete-task/:taskId", CompleteTask);

export default router;
