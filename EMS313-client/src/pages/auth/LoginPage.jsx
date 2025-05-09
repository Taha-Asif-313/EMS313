import React, { useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetAdminInstance, SetAdminLogin } from "../../redux/adminSlice";
import {
  SetEmployeeInstance,
  SetEmployeeLogin,
} from "../../redux/employeeSlice";
import CustomInput from "../../components/auth/CustomInput";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState("Admin");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUrl =
      role === "Admin"
        ? `${import.meta.env.VITE_SERVER_URL}/api/admin/login`
        : `${import.meta.env.VITE_SERVER_URL}/api/employee/login`;

    const toastId = toast.loading("Logging in...");
    setLoading(true);

    try {
      const response = await axios.post(loginUrl, formData, {
        withCredentials: true,
      });
      const data = response.data;

      if (data.success) {
        toast.success("Login successful!", { id: toastId });

        // Store in localStorage and Redux
        if (role === "Admin") {
          localStorage.setItem("adminInstance", JSON.stringify(data));
          dispatch(SetAdminInstance(data));
          dispatch(SetAdminLogin(true));
        } else {
          localStorage.setItem("employeeInstance", JSON.stringify(data));
          dispatch(SetEmployeeInstance(data));
          dispatch(SetEmployeeLogin(true));
        }

        navigate(`/${role.toLowerCase()}`);
      } else {
        toast.error(data.message || "Invalid credentials", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error occurred!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-black">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 mb-8">
        <img src="/logo.svg" alt="logo" className="w-8 h-8" />
        <span className="text-xl font-bold">
          EMS<span className="text-primary">313</span>
        </span>
      </Link>

      {/* Role Toggle */}
      <div className="relative flex mb-3 w-full max-w-[300px] border border-primary rounded-md overflow-hidden bg-white">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-primary transition-transform duration-300 ${
            role === "Employee" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        <button
          type="button"
          onClick={() => setRole("Admin")}
          className={`relative z-10 flex-1 py-2 flex items-center justify-center gap-2 text-xs font-medium transition-colors duration-300 ${
            role === "Admin" ? "text-white" : "text-black"
          }`}
        >
          <RiAdminFill />
          Admin
        </button>
        <button
          type="button"
          onClick={() => setRole("Employee")}
          className={`relative z-10 flex-1 py-2 flex items-center justify-center gap-2 text-xs font-medium transition-colors duration-300 ${
            role === "Employee" ? "text-white" : "text-black"
          }`}
        >
          <FaUser />
          Employee
        </button>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[300px] flex flex-col gap-2"
      >
        <CustomInput
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          type="email"
          icon={IoMdMail}
        />
        <CustomInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          type="password"
        />

        <p className="text-xs">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary underline">
            Go to signup
          </Link>
        </p>

        <button
          type="submit"
          className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-black transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
