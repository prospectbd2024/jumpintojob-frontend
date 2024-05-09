import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

function AddAreaOfExpertise({ props }) {
  const { experience, setExperience, experienceErrors } = props;
  const [maxError, setMaxError] = useState("");

  const handleChange = (index, field, value) => {
    const newExpertises = [...experience.expertises];
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
    if (experience?.expertises?.length < 3) {
      setExperience((prevExperience) => ({
        ...prevExperience,
        expertises: [...prevExperience.expertises, { name: "", months: "" }],
      }));
    }
    else if (!experience.expertises){
      setExperience((prevExperience) => ({
        ...prevExperience,
        expertises: [ { name: "", months: "" }],
      }));
    }
     else {
      setMaxError("You can only add a maximum of 3 areas of expertise");
      setTimeout(() => {
        setMaxError("");
      }, 3000); // Remove error message after 3 seconds
    }
  };

  return (
    <div className="add-experience-input-field area-expertise-input-container">
      <label>
        Area of Expertise
        <abbr title="Required" className="required"></abbr>
      </label>
      <div>
        <span className="hidden">
          Add your area of expertise with duration (max 3)
        </span>
      </div>
      <div>
        {experience?.expertises?.map((element, index) => (
          <div className="add-experience-experties" key={index}>
            <div className="">
              <input
                type="text"
                value={element.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <div className="">
              <input
                type="number"
                className=""
                placeholder="Months"
                style={{ width: "60px", outline: "none" }}
                min="0"
                value={element.months}
                onChange={(e) => handleChange(index, "months", e.target.value)}
              />
            </div>
            <div className="delete-btn-container">
              <FaTrashAlt
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDelete(index)}
              />
            </div>
          </div>
        ))}
      </div>

      <div id="addButton" className="" style={{ display: "block" }}>
        <button className="add-experience-experties-add-btn" onClick={handleAdd}>
          <i className=" "></i>Add New
        </button>
      </div>
      <div className="max-error">{maxError}</div>
      {experienceErrors.expertises && (
        <div className="max-error">Please add Expertises</div>
      )}
      <input type="hidden" name="userType" id="userType" value="" />
    </div>
  );
}

export default AddAreaOfExpertise;
