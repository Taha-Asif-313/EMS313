import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    EmployeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;
