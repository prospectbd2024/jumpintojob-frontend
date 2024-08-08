"use client"
import React, { useState,useEffect } from 'react';
import './ResumeTemplates.css'
import 'bear-react-carousel/dist/index.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useResumeContext } from '@/Contexts/ResumeContext'; 
import  { useUserProfileContext } from '@/Contexts/UserProfileContext';


const ResumeTemplates = ({ }) => {
    const { currentStep, setCurrentStep,templateSettings,resumeTemplates,fetchResumeTemplates } = useResumeContext();
    const {template , setTemplate} = useUserProfileContext();
    useEffect(() => {
        fetchResumeTemplates();
    }, [])
 


    return (<>
    {
        resumeTemplates &&
        <div className='resume-templates'>
            
            <div className="resume-templates-container container">
                <div className="resume-form-header">
                    <h3>Please pick a <span>template</span> below</h3>
                </div>
                
                <div className="templates flex items-center justify-between">
                    <Slider {...templateSettings} style={{maxWidth: '100%'}} key={resumeTemplates.length}>
                    {resumeTemplates.map(tmp => <div key={tmp.id} className={`template`} onClick={() => 
                        setTemplate(tmp)
                        
                        }>
                        <img src={tmp.image} alt=""  className={`${template?.id === tmp.id ? 'selected-template' : ''}`} />
                        <p>{tmp.name} {tmp.type}</p>
                    </div>)}
                    </Slider>
                </div>
                
                <div className="flex gap-2.5 items-center">
                    <button className='bg-[var(--primary-color)] text-white rounded-sm mt-3.75 w-[140px] h-[45px] leading-[45px] font-bold border-none text-base cursor-pointer mt-4' onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                </div>
            </div>
        </div>
    }
    </>
    );
};

export default ResumeTemplates;