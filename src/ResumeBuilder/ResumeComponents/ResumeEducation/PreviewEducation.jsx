import React, { useCallback, useEffect } from 'react';
import './PreviewEducation.scss'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const PreviewEducation = ({ props }) => {
    const {userProfileData, state, setState, setUserProfileData} = props;
    
    useEffect(() => {
        if(state.type === 'delete') {
            deleteEducation(state.id)
            setState({ ...state, type: 'list-view'})
        }   
    }, [state])

    const deleteEducation = useCallback((id) => {
        const educations = userProfileData.educations.filter((item) => item.id !== id);
        setUserProfileData({...userProfileData, educations: educations})
        console.log(educations)
    }, [userProfileData, setUserProfileData]);

    return (
        <div className="preview-education">
            {userProfileData && userProfileData.educations.map((education, key) => {
                const { institution_name, institution_location, degree, education_starting_year, education_graduation_year, field_study, id } = education;
                if (id === 0) {
                    return <div key={id}></div>  //if item is in the demo data structure 
                }
                return (
                    <div className="preview-education__item" key={id}>
                        <div className="preview-education__number">
                            <h2 className="preview-education__number-text">{key}</h2>
                        </div>
                        <div className="preview-education__content">
                            <h4 className="preview-education__title">{degree} in {field_study}</h4>
                            <p className="preview-education__institution">{institution_name}</p>
                            <div className="preview-education__details"> 
                                <p className="preview-education__location">{institution_location}</p>
                                <p className="preview-education__duration">{education_starting_year} - {education_graduation_year}</p>
                            </div>
                        </div>
                        <div className="preview-education__actions">
                            <button className="preview-education__button preview-education__button--edit" onClick={() => setState({...state, type: 'update', id: id})}>
                                <FaPencilAlt />
                            </button>
                            <button className="preview-education__button preview-education__button--delete" onClick={() => setState({...state, type: 'delete', id: id})}>
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