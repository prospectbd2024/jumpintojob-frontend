import React from 'react';
import './ResumeSteps.css'
import { useResumeContext } from '@/Contexts/ResumeContext';

const ResumeSteps = () => {
    const { currentStep, setCurrentStep } = useResumeContext();
    return (
        <div className='resume-steps'>
            <div className="resume-steps-container container">
                <div className="steps">
                    <div className={`step ${currentStep >= 1 ? 'active-step' : ''}`}>
                        <div className='step-title-container'>
                            <h5>1</h5>
                            <p>TEMPLATE</p>
                        </div>
                        <span></span>
                    </div>
                    <div className={`step ${currentStep >= 2 ? 'active-step' : ''}`}>
                        <div className='step-title-container'>
                            <h5>2</h5>
                            <p>HEADER</p>
                        </div>
                        <span ></span>
                    </div>
                    <div className={`step ${currentStep >= 3 ? 'active-step' : ''}`}>
                        <div className='step-title-container'>
                            <h5>3</h5>
                            <p>EDUCATION</p>
                        </div>
                        <span ></span>
                    </div>
                    <div className={`step ${currentStep >= 4 ? 'active-step' : ''}`}>
                        <div className='step-title-container'>
                            <h5>4</h5>
                            <p>EXPERIENCE</p>
                        </div>
                        <span></span>
                    </div>
                    <div className={`step ${currentStep >= 5 ? 'active-step' : ''}`}>
                        <div className='step-title-container'>
                            <h5>5</h5>
                            <p>SKILLS</p>
                        </div>
                        <span ></span>
                    </div>
                    <div className={`step ${currentStep >= 6 ? 'active-step' : ''}`}>
                        <div className='step-title-container'>
                            <h5>6</h5>
                            <p>FINALIZE</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeSteps;
