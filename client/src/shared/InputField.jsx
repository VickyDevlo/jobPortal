import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export const InputField = ({
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
  className = "",
  showPass,
  showPassHandler,
}) => (
  <div className="flex items-center gap-2 border px-3 py-2 rounded-md mt-4">
    <img src={icon} alt={`${type}_icon`} />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`outline-none text-sm flex-1 w-full ${className}`}
    />
    {name === "password" && (
      <label className="cursor-pointer text-gray-400" onClick={showPassHandler}>
        {showPass ? <IoEyeOff /> : <IoEye />}
      </label>
    )}
  </div>
);
