import Admin from "../Model/Admin.js";
import Employee from "../Model/Employee.js";
import bcrypt from "bcrypt";
import Tasks from "../Model/Tasks.js";
import { adminGenerateToken } from "../Utils/genrateToken.js";
import { adminTokenRemover } from "../Utils/removeToken.js";

// Register Admin
export const signup = async (req, res) => {
  try {
    // Get data from user
    const { fullname, phone_no, email, password, country, CNIC, secret_key } =
      req.body;

    // Check if admin able to register or not
    if (secret_key === process.env.ADMIN_SECRET) {
      // Check if username exist or not
      const isAdminPhone = await Admin.findOne({ phone_no: phone_no });
      if (isAdminPhone) {
        return res.status(400).json({
          success: false,
          message: "Admin Phone already exists!",
        });
      }

      // Check if email exist or not
      const isEmail = await Admin.findOne({ email: email });
      if (isEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exist!",
        });
      }

      // Check if email exist or not
      const isCNIC = await Admin.findOne({ CNIC: CNIC });
      if (isCNIC) {
        return res.status(400).json({
          success: false,
          message: "CNIC already exist!",
        });
      }

      // Password Hashing
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save Admin
      const newAdmin = new Admin({
        fullname,
        phone_no,
        email,
        password: hashedPassword,
        country,
        CNIC,
      });
      await newAdmin.save();

      // Response
      return res.status(201).json({
        success: true,
        message: "Registered Successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "You are not able to register as Admin!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login Admin
export const login = async (req, res) => {
  try {
    // Get data
    const { email, password } = req.body;

    // Find Admin by email
    const user = await Admin.findOne({ email: email });

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
    adminGenerateToken(user._id, res);

    // Response
    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      userId: user._id,
      phon_no: user.phone_no,
      fullname: user.fullname,
      email: user.email,
      country: user.country,
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
    adminTokenRemover(res);

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

// Assign Task
export const AssignTask = async (req, res) => {
  try {
    // Get data from user
    const id = req.params.id;
    const { title, task } = req.body;

    // Find employee by ID
    const employee = await Employee.findById(id);

    // Verify employee exists
    if (!employee) {
      return res.status(400).json({
        success: false,
        message: "Employee not found!",
      });
    }

    // Assign the task to the employee
    const newTask = new Tasks({
      title,
      task,
      EmployeeId: employee._id,
    });
    await newTask.save();

    // Add the new task to the employee's tasks array
    employee.tasks.push(newTask._id);

    // Save the employee data
    await employee.save();

    // Response
    return res.status(200).json({
      success: true,
      message: "Task assigned!",
      tasks: employee.tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// All employees
export const AllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    res.json(allEmployees);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add new Employee
export const addEmployee = async (req, res) => {
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

    // Response
    return res.status(201).json({
      success: true,
      message: "Employee hired Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// FireEmployee
export const fireEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id).populate(
      "tasks",
      "completedTasks"
    );
    if (!employee) {
      return res.json({
        success: false,
        message: "Employee not found!",
      });
    }
    await Tasks.deleteMany({ EmployeeId: employee._id });
    await Employee.deleteOne(employee._id);
    return res.json({
      success: true,
      message: "Employee Fired!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Edit employee
export const editEmployee = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Pending Tasks
export const pendingTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);

    return res.status(200).json(employee.completedTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Reject Task
export const rejectTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    // Find employee by taskId
    const task = await Tasks.findById(taskId).populate("EmployeeId");
    const employee = await Employee.findById(task.EmployeeId._id);

    // ADD to completed tasks
    if (employee) {
      employee.completedTasks.pop(employee.completedTasks.taskId);
      employee.tasks.push(taskId);
      employee.save();
      return res.json({
        success: true,
        message: "Task Rejected!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Accept Task
export const acceptTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    // Find employee by taskId
    const task = await Tasks.findById(taskId).populate("EmployeeId");
    const employee = await Employee.findById(task.EmployeeId._id);

    // ADD to completed tasks
    if (employee) {
      employee.completedTasks.pop(employee.completedTasks.taskId);
      employee.save();
      return res.json({
        success: true,
        message: "Task Accepted!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// All Employees Salaries
export const totalSalaries = async (req, res) => {
  const allEmployees = await Employee.find({});

  let totalSalaries = allEmployees.map((employee) => {
    let total = employee.salary;

    return total;
  });

  let total_sal = totalSalaries.reduce((num1, num2) => {
    return num1 + num2;
  });

  return res.json(total_sal);
};

// All pending Tasks
export const totalPendinTasks = async (req, res) => {
  const totalEmployees = await Employee.find({});
  let totalCompletedTasks = totalEmployees.map((employee) => {
    let totalTasks = employee.completedTasks;

    return totalTasks;
  });

  const allPendingTasks = totalCompletedTasks.flat();

  return res.json(allPendingTasks.length);
};
