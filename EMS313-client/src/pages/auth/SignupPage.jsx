import React, { useState } from "react";
import { FaMailBulk } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomInput from "../../components/auth/CustomInput"; // update path based on your project
import { IoMdMail } from "react-icons/io";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add signup logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-black">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 mb-8">
        <img src="/logo.svg" alt="logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-black">
          EMS
          <span className="text-primary">313</span>
        </span>
      </Link>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-[300px] flex flex-col gap-2 !text-black">
        <CustomInput
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          type="text"
          icon={IoMdMail}
        />
        <CustomInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          type="password"
        />
        <CustomInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          type="password"
        />

        {/* Link to Login */}
        <p className="text-xs">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Go to login
          </Link>
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-black transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
