"use client"
import React, { useState } from 'react';
import './ResumeTemplates.css'
import 'bear-react-carousel/dist/index.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useResumeContext } from '@/Contexts/ResumeContext';


const ResumeTemplates = ({ }) => {
    const { currentStep, setCurrentStep,template , setTemplate,templateSettings,resumeTemplates } = useResumeContext();
    




    return (
        <div className='resume-templates'>
            
            <div className="resume-templates-container container">
                <div className="resume-form-header">
                    <h3>Please pick a <span>template</span> below</h3>
                </div>
                
                <div className="templates">
                    <Slider {...templateSettings} style={{maxWidth: '100%'}}>
                    {resumeTemplates.map(tmp => <div key={tmp.id} className={`template`} onClick={() => 
                        setTemplate(tmp)
                        
                        }>
                        <img src={tmp.image} alt=""  className={`${template.id === tmp.id ? 'selected-template' : ''}`} />
                        <p>{tmp.name} {tmp.type}</p>
                    </div>)}
                    </Slider>
                </div>
                
                <div className="resume-prev-next-buttons">
                    <button className='next-button' onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplates;