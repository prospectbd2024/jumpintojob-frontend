import React from 'react';
import './ResumeSteps.scss'
import { useResumeContext } from '@/Contexts/ResumeContext';

const ResumeSteps = () => {
    const changeStep = (step)=>{
        setCurrentStep(step)
    }

    const { currentStep, setCurrentStep } = useResumeContext();
    return (
        <div className='resume-progress u-margin-top-medium'>
            <div className="resume-progress__container">
                <div className="resume-progress__steps">
                    <div className={`resume-progress__step ${currentStep >= 1 ? 'active-step' : ''}`} onClick={()=>{changeStep(1)}}>
                        <div className='resume-progress__title-container' >
                            <h5 className="resume-progress__step-count">1</h5>
                            <p  className="resume-progress__step-name">TEMPLATE</p>
                        </div>
                        <span className='resume-progress__progressbar'  ></span>
                    </div>
                    <div className={`resume-progress__step ${currentStep >= 2 ? 'active-step' : ''}`} onClick={()=>{changeStep(2)}}>
                        <div className='resume-progress__title-container'>
                            <h5 className="resume-progress__step-count">2</h5>
                            <p  className="resume-progress__step-name">HEADER</p>
                        </div>
                        <span className='resume-progress__progressbar' ></span>
                    </div>
                    <div className={`resume-progress__step ${currentStep >= 3 ? 'active-step' : ''}`} onClick={()=>{changeStep(3)}}>
                        <div className='resume-progress__title-container'>
                            <h5 className="resume-progress__step-count">3</h5>
                            <p  className="resume-progress__step-name">EDUCATION</p>
                        </div>
                        <span  className='resume-progress__progressbar' ></span>
                    </div>
                    <div className={`resume-progress__step ${currentStep >= 4 ? 'active-step' : ''}`} onClick={()=>{changeStep(4)}}>
                        <div className='resume-progress__title-container'>
                            <h5 className="resume-progress__step-count">4</h5>
                            <p  className="resume-progress__step-name">EXPERIENCE</p>
                        </div>
                        <span className='resume-progress__progressbar'  ></span>
                    </div>
                    <div className={`resume-progress__step ${currentStep >= 5 ? 'active-step' : ''}`} onClick={()=>{changeStep(5)}}>
                        <div className='resume-progress__title-container'>
                            <h5 className="resume-progress__step-count">5</h5>
                            <p  className="resume-progress__step-name">SKILLS</p>
                        </div>
                        <span className='resume-progress__progressbar'  ></span>
                    </div>
                    <div className={`resume-progress__step ${currentStep >= 6 ? 'active-step' : ''}`} onClick={()=>{changeStep(6)}}>
                        <div className='resume-progress__title-container'>
                            <h5 className="resume-progress__step-count">6</h5>
                            <p  className="resume-progress__step-name">FINALIZE</p>
                        </div>
                        <span className='resume-progress__progressbar'  ></span>
                    </div>
                    <div className={`resume-progress__step ${currentStep >= 7 ? 'active-step' : ''}`} onClick={()=>{changeStep(7)}}>
                        <div className='resume-progress__title-container'>
                            <h5 className="resume-progress__step-count">7</h5>
                            <p  className="resume-progress__step-name">Preview</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeSteps;
