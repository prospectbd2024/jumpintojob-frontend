import React, { useState ,useEffect} from "react";
import { FaTrashAlt } from "react-icons/fa";

function AddAreaOfExpertise({ props }) {
  const { experience, setExperience,experienceErrors } = props;
  const [expertises, setExpertises] = useState([]);
  const [maxError, setMaxError] = useState("");

  const handleChange = (index, field, value) => {
    const newExpertises = [...expertises];
    newExpertises[index] = { ...newExpertises[index], [field]: value };
    setExpertises(newExpertises);
  };

  const handleDelete = (index) => {
    const newExpertises = [...expertises];
    newExpertises.splice(index, 1);
    setExpertises(newExpertises);
  };
  useEffect(()=>{
    if(expertises.length>0){
        setExperience(prev=>({...prev, expertises : expertises }))
    }
  },[expertises])

  const handleAdd = () => {
    // Check if any expertise entry has empty name or months
    const hasEmptyFields = expertises.some((element) => !element.name || !element.months);
  
    if (expertises.length < 3 && !hasEmptyFields) {
      setExpertises([...expertises, { name: "", months: "" }]);
    } else {
      
        if (hasEmptyFields){
            setMaxError("Name or months is missing");
        }
        else{
            setMaxError("You can only add a maximum of 3 areas of expertise");
        }
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
        {expertises.map((element, index) => (
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
            style={{ width: "60px" , outline : 'none'}}
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
        <button
          className="add-experience-experties-add-btn"
          onClick={handleAdd}
        >
          <i className=" "></i>Add New
        </button>
      </div>
      <div className="max-error">{maxError}</div>
     {experienceErrors.expertises && <div className='max-error'>
        Please add Experties
     </div> }
      <input type="hidden" name="userType" id="userType" value="" />
    </div>
  );
}

export default AddAreaOfExpertise;
