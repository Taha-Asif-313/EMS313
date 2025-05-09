import Admin from "../model/Admin.js";
import Employee from "../model/Employee.js";
import bcrypt from "bcrypt";
import Tasks from "../model/Tasks.js";
import { adminGenerateToken } from "../utils/genrateToken.js";
import { adminTokenRemover } from "../utils/removeToken.js";

// Register Admin
export const signup = async (req, res) => {
  try {
    const { fullname, phone_no, email, password, country, CNIC } = req.body;

    const isAdminPhone = await Admin.findOne({ phone_no });
    if (isAdminPhone) {
      return res
        .status(400)
        .json({ success: false, message: "Admin Phone already exists!" });
    }

    const isEmail = await Admin.findOne({ email });
    if (isEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }

    const isCNIC = await Admin.findOne({ CNIC });
    if (isCNIC) {
      return res
        .status(400)
        .json({ success: false, message: "CNIC already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new Admin({
      fullname,
      phone_no,
      email,
      password: hashedPassword,
      country,
      CNIC,
    });

    await newAdmin.save();

    return res
      .status(201)
      .json({ success: true, message: "Registered Successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Login Admin
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for empty fields before anything else
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    if (!user.password) {
      return res
        .status(500)
        .json({ success: false, message: "User password is not set!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    const token = adminGenerateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      userId: user._id,
      phone_no: user.phone_no,
      fullname: user.fullname,
      email: user.email,
      country: user.country,
      role: user.role,
      authToken: token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    adminTokenRemover(res);
    return res.json({ success: true, message: "Logout success" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Logout failed", error: error.message });
  }
};

// Get Dashboard Stats
export const dashboardStats = async (req, res) => {
  try {
    const adminId = req.user._id; // assuming adminAuthMiddleware attaches full payload as `req.user`

    // Get only employees that belong to the logged-in admin
    const employees = await Employee.find({ admin: adminId });

    // Calculate total salaries
    const totalSalaries = employees.reduce((sum, emp) => sum + emp.salary, 0);

    // Get tasks for only those employees
    const employeeIds = employees.map((emp) => emp._id);

    // Count only pending tasks assigned to this admin's employees
    const totalPendingTasks = await Tasks.countDocuments({
      status: "pending",
      EmployeeId: { $in: employeeIds },
    });

    // Get 3 most recent tasks for these employees
    const recentTasks = await Tasks.find({
      EmployeeId: { $in: employeeIds },
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("EmployeeId", "fullname");

    res.status(200).json({
      success: true,
      totalSalaries,
      totalPendingTasks,
      employees,
      recentTasks,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to load dashboard stats." });
  }
};


// Assign Task
export const AssignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, task, priority, dueDate } = req.body;

    // Validate if the employee exists
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(400)
        .json({ success: false, message: "Employee not found!" });
    }

    // Create a new task
    const newTask = new Tasks({
      title,
      task,
      priority: priority || "medium", // Default to 'medium' if not provided
      dueDate: dueDate || null, // Optional dueDate
      EmployeeId: employee._id, // Assign the task to the employee
    });

    // Save the new task
    await newTask.save();

    // Push the task's ID to the employee's task list
    employee.tasks.push(newTask._id);
    await employee.save();

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Task assigned!",
      tasks: employee.tasks,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// All Employees
export const AllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    return res.json(allEmployees);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add New Employee
export const addEmployee = async (req, res) => {
  try {
    const { fullname, phone_no, email, password, country, role, CNIC, salary } =
      req.body;

    const isPhone = await Employee.findOne({ phone_no });
    if (isPhone)
      return res
        .status(400)
        .json({ success: false, message: "Employee Phone already exists!" });

    const isEmail = await Employee.findOne({ email });
    if (isEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });

    const isCNIC = await Employee.findOne({ CNIC });
    if (isCNIC)
      return res
        .status(400)
        .json({ success: false, message: "CNIC already exists!" });

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
    });

    await employee.save();
    return res
      .status(201)
      .json({ success: true, message: "Employee hired Successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Fire Employee
export const fireEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.json({ success: false, message: "Employee not found!" });
    }

    await Tasks.deleteMany({ EmployeeId: employee._id });
    await Employee.deleteOne({ _id: employee._id });

    return res.json({ success: true, message: "Employee Fired!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Edit Employee (currently not implemented)
export const editEmployee = async (req, res) => {
  try {
    // TODO: Add logic for editing employee
    return res
      .status(200)
      .json({ success: true, message: "Edit endpoint under development" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Pending Tasks (simply returns completedTasks array)
export const pendingTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    return res.status(200).json(employee.completedTasks || []);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Reject Task
export const rejectTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findById(taskId).populate("EmployeeId");

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    const employee = await Employee.findById(task.EmployeeId._id);

    if (employee) {
      employee.completedTasks = employee.completedTasks.filter(
        (id) => id.toString() !== taskId
      );
      employee.tasks.push(taskId);
      await employee.save();

      return res.json({ success: true, message: "Task Rejected!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Accept Task
export const acceptTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findById(taskId).populate("EmployeeId");

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    const employee = await Employee.findById(task.EmployeeId._id);

    if (employee) {
      employee.completedTasks = employee.completedTasks.filter(
        (id) => id.toString() !== taskId
      );
      await employee.save();

      return res.json({ success: true, message: "Task Accepted!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Total Salaries
export const totalSalaries = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    const total_sal = allEmployees.reduce(
      (sum, emp) => sum + (emp.salary || 0),
      0
    );
    return res.json({ totalSalaries: total_sal });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Total Pending Tasks
export const totalPendingTasks = async (req, res) => {
  try {
    const employees = await Employee.find({});
    const totalTasks = employees.reduce(
      (count, emp) => count + (emp.tasks?.length || 0),
      0
    );
    return res.json({ totalPendingTasks: totalTasks });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller to mark salary as paid
export const markSalaryAsPaid = async (req, res) => {
  try {
    const { id } = req.params;

    // Find employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Update payment status and last paid date
    employee.paymentStatus = true;
    employee.lastPaidDate = new Date();

    await employee.save();

    return res
      .status(200)
      .json({ success: true, message: "Salary marked as paid", employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller to check if salary is paid
export const checkPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json({
      paymentStatus: employee.paymentStatus,
      lastPaidDate: employee.lastPaidDate,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
