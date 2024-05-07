"use client"
import React, { useState,useEffect } from 'react';

import Education from './Qualifications/Education';
import Skill from './Qualifications/Skill';
import Language from './Qualifications/Language';
import ModalBox from './Qualifications/ModalBox';
import SkillContextProvider, { SkillContext } from '@/Contexts/SkillContext';
import ModalContext from '@/Contexts/ModalContext';


const Qualifications = () => {



    const [educations,setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);



    // Education
    useEffect(() => {
       
    setEducations([
        {
          institution_name: "University of XYZ",
          institution_location: "City, Country",
          degree: "Bachelor of Science",
          field_study: "Computer Science",
          education_starting_year: "2018",
          education_graduation_year: "2022",
          education_achievements: "Dean's List, Outstanding Student Award",
        },
        {
          institution_name: "University of ABC",
          institution_location: "City, Country",
          degree: "Bachelor of Science",
          field_study: "Computer Science",
          education_starting_year: "2020",
          education_graduation_year: "2024",
          education_achievements: "Dean's List, Outstanding Student Award",
        },
      ])

    }, [])
    
    useEffect(()=>{
        setSkills([
            { "id": 1, "skill": "Javascript" },
            { "id": 2, "skill": "ReactJS" },
            { "id": 3, "skill": "NodeJS" },
            { "id": 4, "skill": "ExpressJS" },
            { "id": 5, "skill": "MongoDB" },
        ]);
    },[])

    useEffect(() => {
      setLanguages( [
        { "id": 1, "name": "Bengali", "proficiency": "Native" },
        { "id": 2, "name": "English", "proficiency": "Fluent" },
        { "id": 3, "name": "Spanish", "proficiency": "Beginner" }
    ]);
    }, [ ])
    

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

            </div>
        </div>
    );
};

export default Qualifications;