import React, { useState } from 'react';
import { useResumeContext } from '@/Contexts/ResumeContext';
import Skill from '@/Components/UserProfile/Qualifications/Skills/Skill';
// import "../ResumeHeading/ResumeHeading.css";

const ResumeSkills = () => {
    const { skills, setSkills } = useResumeContext();
    const [selectedSkills, setSelectedSkills] = useState([]);

    const addSkill = (skill) => {
        setSkills([...skills, skill]);
        setSelectedSkills([...selectedSkills, skill]);
    };

    const removeSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        const removedSkill = skills[index];
        setSkills(updatedSkills);
        setSelectedSkills(selectedSkills.filter(skill => skill.name !== removedSkill.name));
    };

    return (
        <div className='resume-skills resume-border'>
            <div className="resume-skills-container container">
                <Skill props={{
                    skills,
                    addSkill,
                    removeSkill,
                    selectedSkills,
                }} />   
            </div>
        </div>
    );
};

export default ResumeSkills;