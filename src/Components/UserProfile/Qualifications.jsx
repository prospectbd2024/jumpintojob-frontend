"use client"
import React, { useState,useEffect } from 'react';

import Education from './Qualifications/Education/Education';
import Skill from './Qualifications/Skills/Skill';
import Language from './Qualifications/Language/Language';
import Experiences from './Qualifications/Experience/Experiences';
import Hobbies from './Qualifications/Hobbies/Hobbies';
import { useUserProfileContext } from '@/Contexts/UserProfileContext';


const Qualifications = () => {


    const { 
        educations,setEducations,
        skills, setSkills,
        languages, setLanguages,
        experiences, setExperiences,
        hobbies, setHobbies } = useUserProfileContext();

    

    return (
        <div className='user-profile-qualifications user-profile-about-me'>
            <h2>Qualifications</h2>
            <div className="qualifications-content">

                {/* Education */}
                <Education props={{educations,setEducations}}/>


                {/* Skills */}

                <Skill props={{skills,setSkills}}/>   

                {/* Languages */}

                <Language props={{languages,setLanguages}}/>

                {/* Experience*/}
                <Experiences props={{experiences, setExperiences}} />

                {/* Hobbies  */}
                 <Hobbies props={{hobbies, setHobbies}} />
            </div>
        </div>
    );
};

export default Qualifications;