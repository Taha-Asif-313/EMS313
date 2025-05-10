import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    phone_no: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      enum: ["Pakistan", "USA", "UK", "Other"],
    },
    CNIC: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["developer", "designer", "manager", "qa", "other"], // customize as needed
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
      },
    ],
    completedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    // New fields to track payment status
    paymentStatus: {
      type: Boolean,
      default: false, // False means unpaid, True means paid
    },
    lastPaidDate: {
      type: Date,
      default: null, // Will store the date of the last payment
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
