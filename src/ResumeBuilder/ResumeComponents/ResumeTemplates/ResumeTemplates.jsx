"use client"
import React, { useState,useEffect } from 'react';
import './ResumeTemplates.scss'
import 'bear-react-carousel/dist/index.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useResumeContext } from '@/Contexts/ResumeContext'; 
import  { useUserProfileContext } from '@/Contexts/UserProfileContext';
import NavButtons from '@/ResumeBuilder/Layout/Button/NavButtons';


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
            
            <div className="resume-templates__container">
                <div className="heading-info">
                    <h3 className='heading-info__title'>Please pick a <span className='heading-info__span'>template</span> below</h3>
                </div>
                
                <div className="template-slider">
                    <Slider {...templateSettings} style={{maxWidth: '100%'}} key={resumeTemplates.length}>
                    {resumeTemplates.map(tmp => <div key={tmp.id} className={`template-slider__element`} onClick={() => 
                        setTemplate(tmp)
                        
                        }>
                        <img src={tmp.image} alt=""  className={ `template-slider__element-img ${template?.id === tmp.id ? 'template-slider__element-img--selected' : ''}`} />
                        <p className='template-slider__element-name'>{tmp.name} {tmp.type}</p>
                    </div>)}
                    </Slider>
                </div>
                
                <NavButtons props={{setCurrentStep }}  hidePrev={true} />
            </div>
        </div>
    }
    </>
    );
};

export default ResumeTemplates;