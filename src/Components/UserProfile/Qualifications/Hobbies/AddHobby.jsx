import React from "react";

const AddHobby = ({ props }) => {
  const { hobby, setHobby, hobbyErrors } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHobby((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-5 w-full sm:w-[400px] max-w-md mx-auto">
      <p className="text-xl mb-4">Add a hobby to your profile</p>
      <div className="mb-5">
        <label htmlFor="name" className="block font-bold text-lg mb-2">
          Hobby
          <abbr title="Required" className="text-red-500">*</abbr>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={hobby.name || ""}
          onChange={handleChange}
          // className={`block w-full p-2 border rounded-md outline-none ${hobbyErrors.name ? 'border-red-500' : 'border-gray-300'}`}
          className="w-full p-2 mt-1 border border-secondary-color rounded-md box-border outline-none"
          aria-required="true"
        />
        {hobbyErrors.name && <p className="text-red-500 text-sm mt-1">Hobby name is required!</p>}
      </div>
    </div>
  );
};

export default AddHobby;