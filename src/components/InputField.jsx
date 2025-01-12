import React from "react";

const InputField = ({
  name,
  value,
  onChange,
  placeholder,
  type,
  className = "",
  ...rest
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input border-gray-300 focus:outline-none focus:ring-1 focus:ring-blued w-full text-base text-[#4B5563] py-3 px-5 rounded-md shadow-sm focus:shadow-md hover:shadow-md ${className} transition-all duration-300`}
      {...rest} // Spreads additional props
    />
  );
};

export default InputField;
