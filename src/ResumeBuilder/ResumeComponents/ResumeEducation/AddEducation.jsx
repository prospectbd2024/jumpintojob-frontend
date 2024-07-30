"use client";
import React, { useState, useCallback } from 'react';
import './AddEducation.scss';

function AddEducation({ props }) {
    const { education, setEducation, saveChanges, educationErrors } = props;
    const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(false);

    const handleChange = useCallback((key, value) => {
        setEducation(prevState => ({
            ...prevState,
            [key]: value
        }));
    }, [setEducation]);


    const handleCGPAChange = (e) => {
        let value = e.target.value;
        if (value === '' || (parseFloat(value) >= 1 && parseFloat(value) <= 5)) {
            handleChange('cgpa', value);
        }
    };

    return (
        <>
            <div className="add-education__container">
                <div className="add-education__input-field">
                    <label htmlFor="institutionname">INSTITUTION NAME</label>
                    <input
                        type="text"
                        placeholder="University of Dhaka"
                        id="institution_name"
                        value={education?.institution_name || ""}
                        onChange={(e) => handleChange("institution_name", e.target.value)}
                    />
               
                    {educationErrors?.institution_name &&
                        <div className="add-education__required">
                            Institution name is required
                        </div>
                    }
                </div>
                <div className="add-education__input-field">
                    <label htmlFor="institutionloc">INSTITUTION LOCATION</label>
                    <input
                        type="text"
                        placeholder="Dhaka, Bangladesh"
                        id="institution_location"
                        value={education?.institution_location || ""}
                        onChange={(e) => handleChange("institution_location", e.target.value)}

                    />
                
                </div>
                <div className="add-education__input-field">
                    <label htmlFor="degree">QUALIFICATIONS OR DEGREE</label>
                    <input
                        type="text"
                        placeholder="Bachelor of Science"
                        id="degree"
                        value={education?.degree || ""}
                        onChange={(e) => handleChange("degree", e.target.value)}

                    />
               
                    {educationErrors?.degree &&
                        <div className="add-education__required">
                            Qualifications or degree is required
                        </div>
                    }
                </div>
                <div className="add-education__input-field">
                    <label htmlFor="field">FIELD OF STUDY</label>
                    <input
                        type="text"
                        placeholder="Computer Science"
                        id="field"
                        value={education?.field_study || ""}
                        onChange={(e) => handleChange("field_study", e.target.value)}

                    />
              
                    {educationErrors?.field_study &&
                        <div className="add-education__required">
                            Field of study is required
                        </div>
                    }
                </div>
                <div className="add-education__input-field">
                    <label htmlFor="grades">GRADES</label>
                    <input
                        type="text"
                        placeholder="A+"
                        id="grades"
                        value={education?.grades || ""}
                        onChange={(e) => handleChange("grades", e.target.value)}

                    />
            
                    {educationErrors?.grades &&
                        <div className="add-education__required">
                            Grades are required
                        </div>
                    }
                </div>
                <div className="add-education__input-field">
                    <label htmlFor="cgpa">CGPA/GPA</label>
                    <input
                        type="text"
                        step="0.1"
                        min="1"
                        max="5"
                        placeholder="4.0"
                        id="cgpa"
                        value={education?.cgpa || ""}
                        onChange={handleCGPAChange}

                    />
            
                    {educationErrors?.cgpa &&
                        <div className="add-education__required">
                            CGPA/GPA is required and should be between 1 to 5
                        </div>
                    }
                </div>
                <div className="add-education__input-field add-education__input-field--date-container">
                    <label htmlFor="starting">STARTING YEAR</label>
                    <input
                        type="date"
                        placeholder="2018-01-01"
                        id="starting"
                        value={education?.education_starting_year || ""}
                        onChange={(e) => handleChange("education_starting_year", e.target.value)}

                    />
          
                </div>
                <div className="add-education__input-field add-education__input-field--date-container">
                    <label htmlFor="end">YEAR OF GRADUATION</label>
                    <input
                        type="date"
                        placeholder="2022-01-01"
                        id="end"
                        value={education?.education_graduation_year || ""}
                        onChange={(e) => handleChange("education_graduation_year", e.target.value)}

                        disabled={isCurrentlyStudying}
                    />
        
                    <div className="add-education__currently-here">
                        <input
                            type="checkbox"
                            id="currently_here"
                            onChange={(e) => {
                                setIsCurrentlyStudying(e.target.checked);
                                handleChange("education_graduation_year", e.target.checked ? 'present' : '');
                            }}
                        />
                        <label htmlFor="currently_here">I currently study here</label>
                    </div>
                </div>
            </div>
            <div className="add-education__textarea">
                <label htmlFor="achivements">NOTABLE ACHIEVEMENTS</label>
                <textarea
                    name=""
                    id="achivements"
                    cols="30"
                    rows="10"
                    placeholder="Write your career summary"
                    value={education?.education_achievements || ""}
                    onChange={(e) => handleChange("education_achievements", e.target.value)}

                ></textarea>
           
            </div>
        </>
    );
}

export default AddEducation;