import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function AddAreaOfExpertise({ props }) {
  const { experience, setExperience, experienceErrors } = props;
  const [maxError, setMaxError] = useState("");

  const handleChange = (index, field, value) => {
    const newExpertises = [...(experience.expertises || [])];
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
        expertises: [...(prevExperience.expertises || []), { name: "", months: "" }],
      }));
    } else {
      setMaxError("You can only add a maximum of 3 areas of expertise");
      setTimeout(() => setMaxError(""), 3000);
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full"> {/* Ensure full width */}
      <label className="text-sm font-semibold">
        Area of Expertise
        <abbr title="Required" className="text-red-500 ml-1">*</abbr>
      </label>
      <div className="space-y-2 w-full"> {/* Ensure full width */}
        {experience?.expertises?.map((element, index) => (
          <div key={index} className="flex items-center space-x-4 w-full"> {/* Ensure full width */}
            <input
              type="text"
              value={element.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md w-full" 
              placeholder="Expertise"
            />
            <input
              type="number"
              value={element.months}
              onChange={(e) => handleChange(index, "months", e.target.value)}
              className="w-20 p-2 border border-gray-400 outline-none bg-transparent text-gray-700 font-sans rounded-md"
              placeholder="Months"
              min="0"
            />
            <FaTrashAlt
              className="text-red-500 cursor-pointer hover:text-red-700 text-[35px]"
              onClick={() => handleDelete(index)}
            />
          </div>
        ))}
      </div>
      <div>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Add New
        </button>
      </div>
      {maxError && <div className="text-red-500 text-sm">{maxError}</div>}
      {experienceErrors.expertises && (
        <div className="text-red-500 text-sm">Please add Expertises</div>
      )}
    </div>
  );
}

export default AddAreaOfExpertise;
