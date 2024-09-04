import React from 'react';

function InputField({ id, label, value, onChange, type = "text", required = false, isFormValid, options = [] }) {
  const showError = required && !value && !isFormValid;

  const renderInput = () => {
    if (type === "select") {
      return (
        <div className="relative">
          <select
            id={id}
            value={value}
            onChange={onChange}
            className={`peer w-full p-4 pt-5 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 appearance-none ${showError ? 'border-red-500' : 'border-neutral-300'} focus:border-black`}
            required={required}
            style={{ WebkitAppearance: "none", MozAppearance: "none" }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Add a custom arrow for better UI control */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 12a.75.75 0 01-.53-.22l-5-5a.75.75 0 111.06-1.06L10 10.44l4.47-4.47a.75.75 0 111.06 1.06l-5 5A.75.75 0 0110 12z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`peer w-full p-4 pt-5 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 ${showError ? 'border-red-500' : 'border-neutral-300'} focus:border-black`}
        placeholder=" "
        required={required}
      />
    );
  };

  return (
    <div className="w-full relative">
      {renderInput()}
      <label
        htmlFor={id}
        className={`absolute text-md duration-500 transform -translate-y-4 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${value ? 'scale-75 -translate-y-4' : ''} ${showError ? 'text-red-500' : 'text-zinc-400'}`}
      >
        {label}
      </label>
      {showError && (
        <p className="text-red-500 text-xs mt-1">This field is required.</p>
      )}
    </div>
  );
}

export default InputField;
