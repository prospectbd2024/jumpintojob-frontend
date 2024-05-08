import React, { useState } from 'react';

function HowSkillLearned({props}) {
  const {learnedFrom, setLearnedFrom} = props;
 

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setLearnedFrom([...learnedFrom, value]);
    } else {
      setLearnedFrom(learnedFrom.filter(item => item !== value));
    }
  };

  return (
    <>
      <legend className="legend-title">
        <p className="title">How did you learn the skill?<span style={{ color: 'red' }}>*</span></p>
      </legend>
      <div className="work-know-by">
        <input type="checkbox" className='skillLearnFrom-checkbox' value="self" id="self" name="skillLearnFrom" aria-describedby="txtLearnFromErrorMsg" onChange={handleCheckboxChange} />
        <label className="checkbox-inline" htmlFor="self">Self</label>
        <input type="checkbox" value="service" className='skillLearnFrom-checkbox' id="service" name="skillLearnFrom" onChange={handleCheckboxChange} />
        <label className="checkbox-inline" htmlFor="service">Job</label>
        <input type="checkbox" value="education" className='skillLearnFrom-checkbox' id="education" name="skillLearnFrom" onChange={handleCheckboxChange} />
        <label className="checkbox-inline" htmlFor="education">Educational</label>
        <input type="checkbox" value="training" className='skillLearnFrom-checkbox' id="training" name="skillLearnFrom" onChange={handleCheckboxChange} />
        <label className="checkbox-inline" htmlFor="training">Professional Training</label>
      </div>
    </>
  );
}

export default HowSkillLearned;
