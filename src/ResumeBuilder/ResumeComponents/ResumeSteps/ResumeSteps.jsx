import React from 'react';
import './ResumeSteps.css'
import { useResumeContext } from '@/Contexts/ResumeContext';

const ResumeSteps = () => {
    const changeStep = (step)=>{
        setCurrentStep(step)
    }

    const { currentStep, setCurrentStep } = useResumeContext();
    return (
        <div className='resume-steps'>
            <div className="resume-steps-container container">
                <div className="steps">
                    <div className={`step ${currentStep >= 1 ? 'active-step' : ''}`} onClick={()=>{changeStep(1)}}>
                        <div className='step-title-container' >
                            <h5>1</h5>
                            <p>TEMPLATE</p>
                        </div>
                        <span></span>
                    </div>
                    <div className={`step ${currentStep >= 2 ? 'active-step' : ''}`} onClick={()=>{changeStep(2)}}>
                        <div className='step-title-container'>
                            <h5>2</h5>
                            <p>HEADER</p>
                        </div>
                        <span ></span>
                    </div>
                    <div className={`step ${currentStep >= 3 ? 'active-step' : ''}`} onClick={()=>{changeStep(3)}}>
                        <div className='step-title-container'>
                            <h5>3</h5>
                            <p>EDUCATION</p>
                        </div>
                        <span ></span>
                    </div>
                    <div className={`step ${currentStep >= 4 ? 'active-step' : ''}`} onClick={()=>{changeStep(4)}}>
                        <div className='step-title-container'>
                            <h5>4</h5>
                            <p>EXPERIENCE</p>
                        </div>
                        <span></span>
                    </div>
                    <div className={`step ${currentStep >= 5 ? 'active-step' : ''}`} onClick={()=>{changeStep(5)}}>
                        <div className='step-title-container'>
                            <h5>5</h5>
                            <p>SKILLS</p>
                        </div>
                        <span ></span>
                    </div>
                    <div className={`step ${currentStep >= 6 ? 'active-step' : ''}`} onClick={()=>{changeStep(6)}}>
                        <div className='step-title-container'>
                            <h5>6</h5>
                            <p>FINALIZE</p>
                        </div>
                        <span></span>
                    </div>
                    <div className={`step ${currentStep >= 7 ? 'active-step' : ''}`} onClick={()=>{changeStep(7)}}>
                        <div className='step-title-container'>
                            <h5>7</h5>
                            <p>Preview</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeSteps;
