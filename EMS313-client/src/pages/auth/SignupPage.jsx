import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomInput from "../../components/auth/CustomInput";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { FaIdCard } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { SetAdminLogin, SetAdminInstance } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  IoMdMail,
  IoMdPerson,
  IoMdFlag,
  IoMdPhonePortrait,
} from "react-icons/io";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    phone_no: "",
    country: "",
    CNIC: "",
  });

  // Handle Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const toastId = toast.loading("Signing up...");
    setLoading(true); // optional loading spinner

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/signup`,
        formData
      );

      const data = res.data;

      if (data.success) {
        toast.success("Signup successful!", { id: toastId });

        // Store in Redux and localStorage
        dispatch(SetAdminInstance(data));
        dispatch(SetAdminLogin(true));
        localStorage.setItem("adminInstance", JSON.stringify(data));

        navigate("/admin"); // or "/admin/dashboard"
      } else {
        toast.error(data.message || "Signup failed", { id: toastId });
      }
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.message || "Signup failed", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="w-full max-w-3xl p-8 max-lg:pt-20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="logo" className="w-10 h-10" />
            <span className="text-2xl font-bold text-black">
              EMS<span className="text-primary">313</span>
            </span>
          </Link>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black"
        >
          <div className="flex flex-col text-xs">
            <label htmlFor="fullname" className="mb-1 font-medium">
              Full Name
            </label>
            <CustomInput
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              type="text"
              icon={IoMdPerson}
            />
          </div>

          <div className="flex flex-col text-xs">
            <label htmlFor="phone_no" className="mb-1 font-medium">
              Phone Number
            </label>
            <CustomInput
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              placeholder="Phone Number"
              type="text"
              icon={IoMdPhonePortrait}
            />
          </div>

          <div className="flex flex-col text-xs">
            <label htmlFor="country" className="mb-1 font-medium">
              Country
            </label>
            <CustomInput
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              type="text"
              icon={IoMdFlag}
            />
          </div>

          <div className="flex flex-col text-xs">
            <label htmlFor="CNIC" className="mb-1 font-medium">
              CNIC
            </label>
            <CustomInput
              name="CNIC"
              value={formData.CNIC}
              onChange={handleChange}
              placeholder="CNIC"
              type="text"
              icon={FaIdCard}
            />
          </div>

          <div className="flex flex-col text-xs">
            <label htmlFor="email" className="mb-1 font-medium">
              Email
            </label>
            <CustomInput
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              type="email"
              icon={IoMdMail}
            />
          </div>

          <div className="flex flex-col text-xs">
            <label htmlFor="password" className="mb-1 font-medium">
              Password
            </label>
            <CustomInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              type="password"
              icon={RiLockPasswordLine}
            />
          </div>

          <div className="flex flex-col text-xs">
            <label htmlFor="confirmPassword" className="mb-1 font-medium">
              Confirm Password
            </label>
            <CustomInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              type="password"
              icon={RiLockPasswordLine}
            />
          </div>

          {/* Form footer (full width) */}
          <div className="col-span-1 sm:col-span-2 mt-2">
            <p className="text-xs mb-2">
              Already have an account?{" "}
              <Link to="/login" className="text-primary underline">
                Go to login
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-black transition"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
