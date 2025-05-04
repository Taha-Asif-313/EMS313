import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
