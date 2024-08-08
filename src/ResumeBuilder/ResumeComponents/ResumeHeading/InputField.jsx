// InputField.js
import React from 'react';

function InputField({ id, label, value, onChange, type = "text" }) {
  return (
    <div className="w-full relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`peer w-full p-4 pt-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        pl-4 border-neutral-300 focus:border-black`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute text-md duration-500 transform top-4 z-10 origin-[0] 
        left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:top-4 ${value ? 'scale-75 -translate-y-4 top-2' : ''} text-zinc-400`}
      >
        {label}
      </label>
    </div>
  );
}

export default InputField;
