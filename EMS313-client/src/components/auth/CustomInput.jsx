import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const CustomInput = ({ name, value, onChange, placeholder, type = "text", icon: Icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="text-sm w-full">
      <div className="relative w-full">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pr-10 pl-4 py-2 rounded-md transition duration-300 !text-black ease-in-out outline-none"
          style={{
            border: "1px solid var(--primary)",
            backgroundColor: "transparent",
            color: "#fff",
          }}
        />
        {/* Right Icon (email or eye icon) */}
        {isPassword ? (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <IoEyeOffOutline className="text-lg" /> : <IoEyeOutline className="text-lg" />}
          </span>
        ) : (
          Icon && (
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Icon className="text-lg" />
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default CustomInput;