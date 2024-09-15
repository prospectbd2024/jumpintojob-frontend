"use client";
import React, { useState, useCallback } from 'react';

function AddEducation({ props }) {
    const { education, setEducation, saveChanges, educationErrors } = props;
    const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(false);

    const handleChange = useCallback((key, value) => {
        setEducation(prevState => ({
            ...prevState,
            [key]: value
        }));
    }, [setEducation]);

    const handleFocus = (event) => {
        let element = event.target;
        element.classList.add('focused');
        let parentNode = element.parentNode;
        let hr = parentNode.querySelector('hr');
        hr.classList.add('focused');
    };

    const handleBlur = (event) => {
        let element = event.target;
        element.classList.remove('focused');
        let parentNode = element.parentNode;
        let hr = parentNode.querySelector('hr');
        hr.classList.remove('focused');
    };

    const handleCGPAChange = (e) => {
        let value = e.target.value;
        if (value === '' || (parseFloat(value) >= 1 && parseFloat(value) <= 5)) {
            handleChange('cgpa', value);
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-x-5 max-w-[600px]">
                <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
                    <label htmlFor="institutionname" className="text-xs">INSTITUTION NAME</label>
                    <input
                        type="text"
                        placeholder="University of Dhaka"
                        id="institution_name"
                        value={education?.institution_name || ""}
                        onChange={(e) => handleChange("institution_name", e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
                    />
                    <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
                    {educationErrors?.institution_name &&
                        <div className="text-red-500 text-xs mt-1">
                            Institution name is required
                        </div>
                    }
                </div>
                <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
                    <label htmlFor="institutionloc" className="text-xs">INSTITUTION LOCATION</label>
                    <input
                        type="text"
                        placeholder="Dhaka, Bangladesh"
                        id="institution_location"
                        value={education?.institution_location || ""}
                        onChange={(e) => handleChange("institution_location", e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
                    />
                    <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
                </div>
                <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
                    <label htmlFor="degree" className="text-xs">QUALIFICATIONS OR DEGREE</label>
                    <input
                        type="text"
                        placeholder="Bachelor of Science"
                        id="degree"
                        value={education?.degree || ""}
                        onChange={(e) => handleChange("degree", e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
                    />
                    <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
                    {educationErrors?.degree &&
                        <div className="text-red-500 text-xs mt-1">
                            Qualifications or degree is required
                        </div>
                    }
                </div>
                <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
                    <label htmlFor="field" className="text-xs">FIELD OF STUDY</label>
                    <input
                        type="text"
                        placeholder="Computer Science"
                        id="field"
                        value={education?.field_study || ""}
                        onChange={(e) => handleChange("field_study", e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
                    />
                    <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
                    {educationErrors?.field_study &&
                        <div className="text-red-500 text-xs mt-1">
                            Field of study is required
                        </div>
                    }
                </div>
                <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
                    <label htmlFor="starting" className="text-xs">STARTING YEAR</label>
                    <input
                        type="date"
                        placeholder="2018-01-01"
                        id="starting"
                        value={education?.education_starting_year || ""}
                        onChange={(e) => handleChange("education_starting_year", e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
                    />
                    <hr className="absolute bottom-[31px] left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
                </div>
                <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
                <label htmlFor="end" className="text-xs">YEAR OF GRADUATION</label>
                <input
                    type="date"
                    id="end"
                    value={education?.education_graduation_year === 'present' ? '' : education?.education_graduation_year || ""}
                    onChange={(e) => handleChange("education_graduation_year", e.target.value)}
                    disabled={isCurrentlyStudying}
                    className={`border border-gray-400 p-2 outline-none text-gray-700 font-sans rounded-md ${
                        isCurrentlyStudying ? 'bg-gray-200' : 'bg-transparent'
                    }`}
                />
                <hr className="absolute bottom-[31px] left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
                <div className="flex flex-row gap-x-2 mt-2">
                    <input
                        type="checkbox"
                        id="currently_here"
                        checked={isCurrentlyStudying}
                        onChange={(e) => {
                            setIsCurrentlyStudying(e.target.checked);
                            handleChange("education_graduation_year", e.target.checked ? 'present' : '');
                            if (e.target.checked) {
                                handleChange("cgpa", ''); // Clear CGPA when checkbox is checked
                            }
                        }}
                        className="w-[15px]"
                    />
                    <label htmlFor="currently_here" className="text-sm">I currently study here</label>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
                <label htmlFor="grades" className="text-xs">GRADES</label>
                <input
                    type="text"
                    required
                    placeholder="A+"
                    id="grades"
                    value={education?.grades || ""}
                    onChange={(e) => handleChange("grades", e.target.value)}
                    disabled={isCurrentlyStudying}
                    className={`border border-gray-400 p-2 outline-none text-gray-700 font-sans rounded-md ${
                        isCurrentlyStudying ? 'bg-gray-200' : 'bg-transparent'
                    }`}
                />
                {educationErrors?.grades && !isCurrentlyStudying &&
                    <div className="text-red-500 text-xs mt-1">
                        Grades are required
                    </div>
                }
            </div>
            <div className="flex flex-col gap-y-2 mb-5 flex-[1_1_48%] relative">
                <label htmlFor="cgpa" className="text-xs">CGPA/GPA</label>
                <input
                    type="text"
                    step="0.1"
                    min="1"
                    max="5"
                    placeholder="4.0"
                    id="cgpa"
                    value={education?.cgpa || ""}
                    onChange={handleCGPAChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isCurrentlyStudying}
                    className={`border border-gray-400 p-2 outline-none text-gray-700 font-sans rounded-md ${
                        isCurrentlyStudying ? 'bg-gray-200' : 'bg-transparent'
                    }`}
                />
                <hr className="absolute bottom-0 left-0 w-full h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
                {educationErrors?.cgpa &&
                    <div className="text-red-500 text-xs mt-1">
                        CGPA/GPA is required and should be between 1 to 5
                    </div>
                }
            </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-5">
                <label htmlFor="achivements" className="text-xs">NOTABLE ACHIEVEMENTS</label>
                <textarea
                    name=""
                    id="achivements"
                    cols="30"
                    rows="10"
                    placeholder="Write your career summary"
                    value={education?.education_achievements || ""}
                    onChange={(e) => handleChange("education_achievements", e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="h-[170px] w-full resize-none border border-gray-400 p-2 outline-none bg-transparent text-gray-700 font-sans rounded-md"
                ></textarea>
                <hr className="absolute bottom-[106px] left-0 w-[93%] h-px bg-[var(--primary-color)] opacity-0 transform transition-opacity duration-300" />
            </div>
        </>
    );
}

export default AddEducation;
