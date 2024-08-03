"use client";
import React, { useEffect } from 'react';
import './ResumeTemplates.css';
import 'bear-react-carousel/dist/index.css';
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
    }, []);

    return (
        <>
            {resumeTemplates && (
                <div className='mt-11'>
                    <div className="container mx-auto">
                        <div className="text-center mt-10 mb-5 text-lg">
                            <h3>
                                Please pick a <span className="text-primary-color">template</span> below
                            </h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <Slider {...templateSettings} style={{ maxWidth: '100%' }} key={resumeTemplates.length}>
                                {resumeTemplates.map(tmp => (
                                    <div key={tmp.id} className="text-center cursor-pointer">
                                        <img
                                            src={tmp.image}
                                            alt=""
                                            className={`w-72 h-96 mb-4 border-3 transition-all duration-150 ${template?.id === tmp.id ? 'border-primary-color' : 'border-gray-200 hover:border-primary-color'}`}
                                            onClick={() => setTemplate(tmp)}
                                        />
                                        <p className="text-darker-secondary-color">{tmp.name} {tmp.type}</p>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className="flex gap-4 items-center mt-4">
                            <button className="w-36 h-11 font-bold text-sm bg-primary-color text-white rounded-md" onClick={() => setCurrentStep(currentStep + 1)}>
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
