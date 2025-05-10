import Employee from "../model/Employee.js";
import Tasks from "../model/Tasks.js";
import bcrypt from "bcrypt";
import { employeeGenerateToken } from "../utils/genrateToken.js";
import { employeeTokenRemover } from "../utils/removeToken.js";

// Register
export const signup = async (req, res) => {
  try {
    const { fullname, phone_no, email, password, country, role, CNIC, salary } =
      req.body;

    const [isEmployeePhone, isEmail, isCNIC] = await Promise.all([
      Employee.findOne({ phone_no }),
      Employee.findOne({ email }),
      Employee.findOne({ CNIC }),
    ]);

    if (isEmployeePhone || isEmail || isCNIC) {
      return res.status(400).json({
        success: false,
        message: isEmployeePhone
          ? "Phone exists!"
          : isEmail
          ? "Email exists!"
          : "CNIC exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const employee = new Employee({
      fullname,
      phone_no,
      email,
      password: hashedPassword,
      country,
      CNIC,
      role,
      salary,
      lastPaidDate: null,
    });

    await employee.save();

    return res.status(201).json({
      success: true,
      message: "Registered Successfully!",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Employee.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    const token = employeeGenerateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      phone_no: user.phone_no,
      salary: user.salary,
      country: user.country,
      role: user.role,
      authToken: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Logout
export const logout = (req, res) => {
  try {
    employeeTokenRemover(res);
    return res.json({ success: true, message: "Logout success" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Logout failed", error: error.message });
  }
};

// Employee Dashboard
export const getEmployeeDashboardData = async (req, res) => {
  try {
    const employeeId = req.employee.id;

    const employee = await Employee.findById(employeeId)
      .populate("tasks")
      .populate("completedTasks");

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const totalTasks = employee.tasks.length + employee.completedTasks.length;
    const completedTasks = employee.completedTasks.length;
    const pendingTasks = employee.tasks.length;
    const latestTasks = employee.tasks.slice(-3).reverse();

    const taskRate = 500;
    const paid = !!employee.lastPaidDate;
    const pendingSalary = paid ? 0 : completedTasks * taskRate;

    res.status(200).json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        pendingSalary,
        latestTasks,
        fullname: employee.fullname,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .select("-password")
      .populate("Tasks");

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true, employee });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching profile",
        error: error.message,
      });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const employee = await Employee.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json({ success: true, message: "Profile updated", employee });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Update failed", error: error.message });
  }
};

// Complete Task
export const CompleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { url } = req.body;

    const task = await Tasks.findById(taskId);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    const employee = await Employee.findById(task.EmployeeId);
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });

    task.status = "completed";
    task.submittedUrl = url;
    task.isLate = new Date() > task.dueDate;

    await task.save();

    employee.completedTasks.push(task._id);
    employee.tasks = employee.tasks.filter((id) => id.toString() !== taskId);
    await employee.save();

    res.json({ success: true, message: "Task completed!", task });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

// All Tasks
export const allTasks = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("Tasks");
    res.json({ success: true, tasks: employee.tasks.reverse() });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching tasks",
        error: error.message,
      });
  }
};

// Completed Tasks
export const completedTasks = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "completedTasks"
    );
    res.json({ success: true, completedTasks: employee.completedTasks });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching completed tasks",
        error: error.message,
      });
  }
};

// Mark Salary as Paid
export const markSalaryPaid = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    employee.lastPaidDate = new Date();
    await employee.save();
    res.json({
      success: true,
      message: "Salary marked as paid",
      lastPaidDate: employee.lastPaidDate,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update salary status",
        error: error.message,
      });
  }
};

// Update Task Status
export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required." });
  }

  try {
    const task = await Tasks.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found." });

    if (task.assignedTo.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task." });
    }

    task.status = status;
    await task.save();

    res
      .status(200)
      .json({ message: "Task status updated successfully.", task });
  } catch (error) {
    console.error("Update task status error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get Employee Profile
export const getEmployeeProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id).select("-password");

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true, employee });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update Employee Profile
export const updateEmployeeProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      employee,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const employee = await Employee.findById(id).select("+password");
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, employee.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    employee.password = hashedPassword;
    await employee.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
