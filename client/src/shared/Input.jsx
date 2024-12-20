import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    { img, type, name, placeholder, value, onChange, className, ...rest },
    ref
  ) => {
    return (
      <div className="flex items-center">
        <img src={img} alt="icon" className="h-4 sm:h-5" />
        <input
          ref={ref}
          type={type || "text"}
          name={name || ""}
          placeholder={placeholder || "Search Something..."}
          value={value}
          onChange={onChange}
          className={`${className} focus:outline-none`}
          {...rest}
        />
      </div>
    );
  }
);

export { Input };
