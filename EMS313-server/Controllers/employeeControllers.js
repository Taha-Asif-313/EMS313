import Employee from "../Model/Employee.js";
import Tasks from "../Model/Tasks.js";
import bcrypt from "bcrypt";
import { employeeGenerateToken } from "../Utils/genrateToken.js";
import { employeeTokenRemover } from "../Utils/removeToken.js";

// Register Employee
export const signup = async (req, res) => {
  try {
    // Get data from user
    const { fullname, phone_no, email, password, country, role, CNIC, salary } =
      req.body;

    // Check if username exist or not
    const isEmployeePhone = await Employee.findOne({ phone_no: phone_no });
    if (isEmployeePhone) {
      return res.status(400).json({
        success: false,
        message: "Employee Phone already exists!",
      });
    }

    // Check if email exist or not
    const isEmail = await Employee.findOne({ email: email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exist!",
      });
    }

    // Check if email exist or not
    const isCNIC = await Employee.findOne({ CNIC: CNIC });
    if (isCNIC) {
      return res.status(400).json({
        success: false,
        message: "CNIC already exist!",
      });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save Employee
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

    const newEmployee = new EmployeesData({
      total_salaries: employee.salary,
    });
    newEmployee.employees.push(employee);
    await newEmployee.save();

    // Response
    return res.status(201).json({
      success: true,
      message: "Registered Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login Employee
export const login = async (req, res) => {
  try {
    // Get data
    const { email, password } = req.body;

    // Find Employee by email
    const user = await Employee.findOne({ email: email });

    // Email matching
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    // Password Matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    // Set session data
    employeeGenerateToken(user._id, res);

    // Response
    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      userId: user._id,
      phone_no: user.phone_no,
      fullname: user.fullname,
      email: user.email,
      country: user.country,
      salary: user.salary,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    // Remove the cookie
    employeeTokenRemover(res);

    // Response
    return res.json({
      success: true,
      message: "Logout success",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

// Complete Task
export const CompleteTask = async (req, res) => {
  try {
    // take id of employee from params
    const taskId = req.params.taskId;
    const { url } = req.body;

    // Find employee by taskId
    const task = await Tasks.findById(taskId).populate("EmployeeId");
    const employee = await Employee.findById(task.EmployeeId._id);

    // ADD to completed tasks
    if (employee) {
      employee.completedTasks.push({ taskId: taskId, url: url });
      employee.tasks.pop(taskId);
      employee.save();
      return res.json({
        success: true,
        message: "Task Completed!",
      });
    }
    return res.json({
      success: false,
      message: "Employee not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// All Tasks
export const allTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeTasks = await Employee.findById(id).populate("tasks");
    return res.json({
      success: true,
      tasks: employeeTasks.tasks.reverse(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Network error !",
      error: error.message,
    });
  }
};
