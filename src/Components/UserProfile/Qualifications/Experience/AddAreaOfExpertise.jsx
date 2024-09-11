import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function AddAreaOfExpertise({ props }) {
  const { experience, setExperience, experienceErrors } = props;
  const [maxError, setMaxError] = useState("");

  const handleChange = (index, field, value) => {
    const newExpertises = [...(experience.expertises || [{ name: "", months: "" }])];
    newExpertises[index] = { ...newExpertises[index], [field]: value };
    setExperience((prevExperience) => ({
      ...prevExperience,
      expertises: newExpertises,
    }));
  };

  const handleDelete = (index) => {
    const newExpertises = [...experience.expertises];
    newExpertises.splice(index, 1);
    setExperience((prevExperience) => ({
      ...prevExperience,
      expertises: newExpertises,
    }));
  };

  const handleAdd = () => {
    if (!experience.expertises || experience.expertises.length < 3) {
      setExperience((prevExperience) => ({
        ...prevExperience,
        expertises: [...(prevExperience.expertises || [{ name: "", months: "" }]), { name: "", months: "" }],
      }));
    } else {
      setMaxError("You can only add a maximum of 3 areas of expertise");
      setTimeout(() => setMaxError(""), 3000);
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-sm font-semibold">
        Area of Expertise
        <abbr title="Required" className="text-red-500 ml-1">*</abbr>
      </label>
      <div className="space-y-4 w-full">
        {/* Expertise fields container */}
        <div className="space-y-4 w-full">
          {/* Mandatory first expertise field */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            <div className="w-full sm:w-auto flex-grow">
              <input
                type="text"
                value={experience?.expertises?.[0]?.name || ""}
                onChange={(e) => handleChange(0, "name", e.target.value)}
                className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full"
                placeholder="Expertise (required)"
              />
            </div>
            <div className="w-full sm:w-24 flex-shrink-0">
              <input
                type="number"
                value={experience?.expertises?.[0]?.months || ""}
                onChange={(e) => handleChange(0, "months", e.target.value)}
                className="w-full p-2 border border-gray-400 outline-none bg-transparent text-gray-700 font-sans rounded-md"
                placeholder="Months"
                min="0"
              />
            </div>
            <div className="hidden sm:block w-8 flex-shrink-0"></div> {/* Placeholder for consistency */}
          </div>

          {/* Additional optional expertise fields */}
          {experience?.expertises?.slice(1).map((element, index) => (
            <div key={index + 1} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
              <div className="w-full sm:w-auto flex-grow">
                <input
                  type="text"
                  value={element.name}
                  onChange={(e) => handleChange(index + 1, "name", e.target.value)}
                  className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full"
                  placeholder="Expertise (optional)"
                />
              </div>
              <div className="w-full sm:w-24 flex-shrink-0">
                <input
                  type="number"
                  value={element.months}
                  onChange={(e) => handleChange(index + 1, "months", e.target.value)}
                  className="w-full p-2 border border-gray-400 outline-none bg-transparent text-gray-700 font-sans rounded-md"
                  placeholder="Months"
                  min="0"
                />
              </div>
              <div className="w-full sm:w-8 flex-shrink-0 flex justify-start sm:justify-center items-center mt-2 sm:mt-0">
                <FaTrashAlt
                  className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
                  onClick={() => handleDelete(index + 1)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Validation error for the first expertise */}
        {experienceErrors.expertises && (
          <div className="text-red-500 text-sm">Please add at least one area of expertise</div>
        )}
      </div>
      <div>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Add Expertise
        </button>
      </div>
      {maxError && <div className="text-red-500 text-sm">{maxError}</div>}
    </div>
  );
}

export default AddAreaOfExpertise;