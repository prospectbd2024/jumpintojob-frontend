"use client"
import React, { useState } from 'react';

import Education from './Qualifications/Education';
import Skill from './Qualifications/Skill';
import Language from './Qualifications/Language';
import ModalBox from './Qualifications/ModalBox';
import SkillContextProvider, { SkillContext } from '@/Contexts/SkillContext';


const Qualifications = () => {
    const [educationModalIsOpen, setEducationModalIsOpen] = useState(false);
    const [skillsModalIsOpen, setSkillsModalIsOpen] = useState(false)
    const [languageModalIsOpen, setLanguageModalIsOpen] = useState(false)
    const [modalIsClosed, setModalIsClosed] = useState(false)
    const [modal, manageModal] = useState({display : 'none', modal : null,title : 'education' })
    const handleModalIsOpen = (event) => {
        setEducationModalIsOpen(event);
        setSkillsModalIsOpen(event);
        setLanguageModalIsOpen(event);
    }
    const handleModalIsClosed = (event) => {
        setModalIsClosed(event)

    }

    // Skills Select
    const optionList = [
        { value: "digital_marketing", label: "Digital Marketing" },
        { value: "web_development", label: "Web Development" },
        { value: "javascript", label: "Javascript" },
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" },
        { value: "react", label: "ReactJS" },
        { value: "node", label: "NodeJS" },
        { value: "mongo", label: "MongoDB" },
        { value: "python", label: "Python" },
        { value: "graphic", label: "Graphic Design" },
    ];


    // Education
    const education = {
        "degree": "Bachelor Degree",
        "field": "Computer Science",
    }
    console.log(education)

    // Skills
    const skills = [
        { "id": 1, "skill": "Javascript" },
        { "id": 2, "skill": "ReactJS" },
        { "id": 3, "skill": "NodeJS" },
        { "id": 4, "skill": "ExpressJS" },
        { "id": 5, "skill": "MongoDB" },
    ]

    //   Languages
    const languages = [
        { "id": 1, "name": "Bengali", "proficiency": "Native" },
        { "id": 2, "name": "English", "proficiency": "Fluent" },
        { "id": 3, "name": "Spanish", "proficiency": "Beginner" }
    ]

    return (
        <div className='user-profile-qualifications user-profile-about-me'>
            <h2>Qualifications</h2>
            <div className="qualifications-content">
                {/* Modal  */}
                <ModalBox props={{title: 'education', body: '' ,modal, manageModal}} />
                {/* Education */}
                <Education props={{manageModal }}/>


                {/* Skills */}
           
                <Skill props={{skills,manageModal }}/>
      
          

                {/* Languages */}

                <Language props={{languages,manageModal}}/>
                

            </div>
        </div>
    );
};

export default Qualifications;