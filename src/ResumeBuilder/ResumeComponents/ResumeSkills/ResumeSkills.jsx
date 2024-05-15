import React,{useEffect,useState} from 'react';
import { useUserContext } from '../../../Contexts/UserContext';
import PrevNextButton from '@/ResumeBuilder/Layout/Button/PrevNextButton';
import Skill from '@/Components/UserProfile/Qualifications/Skills/Skill';

const ResumeSkills = () => {
    const [skills, setSkills] = useState([]);
    useEffect(()=>{
        setSkills([
            { "id": 1, "name": "Javascript","rating" : 4 , "learnedFrom" : ["self"] },
            { "id": 2, "name": "ReactJS","rating" : 4.2 , "learnedFrom" : ["self"] },
            { "id": 3, "name": "NodeJS" ,"rating" : 2.5 , "learnedFrom" : ["self"]},
            { "id": 4, "name": "ExpressJS" ,"rating" : 2.5 , "learnedFrom" : ["self"]},
            { "id": 5, "name": "MongoDB" ,"rating" : 3 , "learnedFrom" : ["self"]},
        ]);
    },[])
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