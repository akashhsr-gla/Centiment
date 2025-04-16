import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value = "", onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="Input-Box">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange} // No need for `e => onChange(e)`
        />

        {type === "password" && (
          showPassword ? (
            <FaRegEye
              size={22}
              className="bg-transparent text-blue-500 cursor-pointer"
              onClick={togglePassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="cursor-pointer"
              onClick={togglePassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
