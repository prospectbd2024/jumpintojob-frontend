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
            </div>
        </div>
    );
};

export default ResumeSkills;