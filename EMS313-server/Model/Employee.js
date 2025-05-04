import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  CNIC: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  completedTasks: [{ type: Object, required: true, default: [] }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
