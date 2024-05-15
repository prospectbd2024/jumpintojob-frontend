import React,{useEffect,useState} from 'react';
import { useUserContext } from '../../../Contexts/UserContext';
import PrevNextButton from '@/ResumeBuilder/Layout/Button/PrevNextButton';
import Skill from '@/Components/UserProfile/Qualifications/Skills/Skill';
import { useResumeContext } from '@/Contexts/ResumeContext';

const ResumeSkills = () => {
    const {skills, setSkills} = useResumeContext();

    return (
        <div className='resume-skills'>
            <div className="resume-skills-container container">
            <Skill props={{skills,setSkills}}/>   
                {/* <div className="resume-form-header">
                    <h3>Add your top <span>skills</span></h3>
                </div>
                <div className="resume-skills-container">
                    <AddSkills />
                </div> */}
            </div>
        </div>
    );
};

export default ResumeSkills;