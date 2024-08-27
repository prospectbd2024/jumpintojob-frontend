"use client"
import React, { useEffect } from 'react';
import './ResumeTemplates.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useResumeContext } from '@/Contexts/ResumeContext'; 
import { useUserProfileContext } from '@/Contexts/UserProfileContext';

const ResumeTemplates = () => {
    const { currentStep, setCurrentStep, templateSettings, resumeTemplates, fetchResumeTemplates } = useResumeContext();
    const { template, setTemplate } = useUserProfileContext();

    useEffect(() => {
        fetchResumeTemplates();
    }, [fetchResumeTemplates]);

    return (
        <>
            {resumeTemplates && (
                <div className='resume-templates'>
                    <div className="resume-templates-container container">
                        <div className="resume-form-header">
                            <h3>Please pick a <span>template</span> below</h3>
                        </div>
                        
                        <div className="templates flex items-center justify-between">
                            <Slider {...templateSettings} style={{ maxWidth: '100%' }} key={resumeTemplates.length}>
                                {resumeTemplates.map(tmp => (
                                    <div key={tmp.id} className="template" onClick={() => setTemplate(tmp)}>
                                        <img 
                                            src={tmp.image} 
                                            alt={`${tmp.name} ${tmp.type}`} 
                                            className={`${template?.id === tmp.id ? 'selected-template' : ''}`} 
                                        />
                                        <p className='hidden md:block'>{tmp.name} {tmp.type}</p>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        
                        <div className="flex gap-2 items-center justify-center md:justify-start">
                            <button
                                className="w-24 h-9 font-bold text-xs sm:w-28 sm:h-10 sm:text-sm md:text-base cursor-pointer bg-[var(--primary-color)] text-white rounded-md mt-4 md:w-36 md:h-11"
                                onClick={() => setCurrentStep(currentStep + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResumeTemplates;
