"use client"
import React, { useState,useEffect } from 'react';

import Education from './Qualifications/Education/Education';
import Skill from './Qualifications/Skills/Skill';
import Language from './Qualifications/Language/Language';
import ModalBox from './Qualifications/ModalBox';
import SkillContextProvider, { SkillContext } from '@/Contexts/SkillContext';
import ModalContext from '@/Contexts/ModalContext';
import Experience from './Qualifications/Experience/Experiences';
import Experiences from './Qualifications/Experience/Experiences';
import Hobbies from './Qualifications/Hobbies/Hobbies';


const Qualifications = () => {



    const [educations,setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [hobbies, setHobbies] = useState([])


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
            { "id": 1, "name": "Javascript","rating" : 4 , "learnedFrom" : ["self"] },
            { "id": 2, "name": "ReactJS","rating" : 4.2 , "learnedFrom" : ["self"] },
            { "id": 3, "name": "NodeJS" ,"rating" : 2.5 , "learnedFrom" : ["self"]},
            { "id": 4, "name": "ExpressJS" ,"rating" : 2.5 , "learnedFrom" : ["self"]},
            { "id": 5, "name": "MongoDB" ,"rating" : 3 , "learnedFrom" : ["self"]},
        ]);
    },[])

    useEffect(() => {
      setLanguages( [
        { "id": 1, "language": "Bengali", "proficiency": "Native" },
        { "id": 2, "language": "English", "proficiency": "Fluent" },
        { "id": 3, "language": "Spanish", "proficiency": "Beginner" }
    ]);
    }, [ ])

    useEffect(()=>{
      setExperiences([
        {
          "id": 1,
          "job_title": "Senior Software Engineer",
          "company_name": "Tech Innovators Inc.",
          "company_business": "Technology Solutions",
          "designation": "Lead Developer",
          "department": "Engineering",
          "start_date": "2015-07-20",
          "to_date": "2022-12-31",
          "currently_working": false,
          "company_location": "Silicon Valley, USA",
          "responsibilities": "Led the development of various web applications using React.js and Node.js. Collaborated with product managers and designers to define product features and timelines. Mentored junior developers and conducted code reviews.",
          "expertises": [
            { "name": "JavaScript", "months": 72 },
            { "name": "React.js", "months": 60 },
            { "name": "Node.js", "months": 48 },
            { "name": "Software Architecture", "months": 48 }
          ]
        },
        {
          "id": 2,
          "job_title": "Product Manager",
          "company_name": "GlobalTech Solutions",
          "company_business": "Technology Services",
          "designation": "Senior Product Manager",
          "department": "Product Management",
          "start_date": "2017-03-15",
          "to_date": "2023-06-30",
          "currently_working": false,
          "company_location": "New York City, USA",
          "responsibilities": "Led product development lifecycle from concept to launch. Conducted market research, defined product requirements, and collaborated with engineering and design teams to deliver high-quality software products.",
          "expertises": [
            { "name": "Product Management", "months": 72 },
            { "name": "Market Research", "months": 60 },
            { "name": "Agile Methodology", "months": 48 },
            { "name": "User Experience (UX) Design", "months": 36 }
          ]
        },
        {
          "id": 3,
          "job_title": "Data Scientist",
          "company_name": "Data Insights Co.",
          "company_business": "Data Analytics",
          "designation": "Lead Data Scientist",
          "department": "Data Science",
          "start_date": "2016-10-10",
          "to_date": "2024-04-15",
          "currently_working": false,
          "company_location": "San Francisco, USA",
          "responsibilities": "Developed machine learning models to analyze large datasets and extract actionable insights. Collaborated with cross-functional teams to identify business opportunities and drive data-driven decision-making processes.",
          "expertises": [
            { "name": "Machine Learning", "months": 60 },
            { "name": "Python", "months": 72 },
            { "name": "Data Visualization", "months": 48 },
            { "name": "Statistical Analysis", "months": 60 }
          ]
        }
        
      ]
      )
    },[])

    useEffect(()=>{
      setHobbies([{ name : "traveling"},{name : "Singing"}])
    },[])
    

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