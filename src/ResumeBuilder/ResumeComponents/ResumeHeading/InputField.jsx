// InputField.js
import React from 'react';

function InputField({ id, label, value, onChange, type = "text" }) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute left-2 top-2 text-gray-500 transition-all duration-300 transform -translate-y-4 scale-75 opacity-0 peer-placeholder-shown:opacity-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:opacity-100 peer-focus:-translate-y-4 peer-focus:scale-75"
      >
        {label}
      </label>
    </div>
  );
}

export default InputField;