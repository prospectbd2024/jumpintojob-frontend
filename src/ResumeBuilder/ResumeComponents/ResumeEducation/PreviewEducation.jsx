import React, { useCallback, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const PreviewEducation = ({ props }) => {
    const { userProfileData, state, setState, setUserProfileData } = props;
    
    useEffect(() => {
        if (state.type === 'delete') {
            deleteEducation(state.id);
            setState({ ...state, type: 'list-view' });
        }   
    }, [state]);

    const deleteEducation = useCallback((id) => {
        const educations = userProfileData.educations.filter((item) => item.id !== id);
        setUserProfileData({ ...userProfileData, educations });
        console.log(educations);
    }, [userProfileData, setUserProfileData]);

    return (
        <div>
            {userProfileData && userProfileData.educations.map((education, key) => {
                const { institution_name, institution_location, degree, education_starting_year, education_graduation_year, field_study, id } = education;
                if (id === 0) {
                    return <div key={id}></div>; // if item is in the demo data structure 
                }
                return (
                    <div className="flex justify-between border border-gray-400 p-5 mb-5" key={id}>
                        <div className="w-auto">
                            <h2 className="text-4xl">{key}</h2>
                        </div>
                        <div className="w-3/5">
                            <h4 className="text-lg">{degree} in {field_study}</h4>
                            <p className="text-base font-normal">{institution_name}</p>
                            <div className="flex items-center gap-5 mt-2">
                                <p className="text-sm text-gray-600">{institution_location}</p>
                                <p className="text-sm text-gray-600">{education_starting_year} - {education_graduation_year}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <button className="w-10 h-10 bg-blue-600 flex items-center justify-center text-white" onClick={() => setState({ ...state, type: 'update', id })}>
                                <FaPencilAlt />
                            </button>
                            <button className="w-10 h-10 bg-red-600 flex items-center justify-center text-white" onClick={() => setState({ ...state, type: 'delete', id })}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PreviewEducation;
