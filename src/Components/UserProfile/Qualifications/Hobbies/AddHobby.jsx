// AddHobby.jsx
import React from "react";
import './AddHobby.css'
const AddHobby = ({ props }) => {
  const { hobby, setHobby, saveChanges, hobbyErrors } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHobby((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-hobby-container">
      <label htmlFor="name" className="add-hobby-label">
        Hobby Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={hobby.name || ""}
        onChange={handleChange}
        className={`add-hobby-input`}
      />
      {hobbyErrors.name && <p className="error-message">Hobby name is required!</p>}
    </div>
  );
};

export default AddHobby;
