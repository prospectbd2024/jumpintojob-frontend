import React from 'react';
import { useResumeContext } from '@/Contexts/ResumeContext';

const ResumeSteps = () => {
 
    const { currentStep, setCurrentStep } = useResumeContext();
    return (
        <div className='mt-16'>
            <div className="">
                <div className="grid grid-cols-7 text-center">
                    {["TEMPLATE", "HEADER", "EDUCATION", "EXPERIENCE", "SKILLS", "FINALIZE", "Preview"].map((stepName, index) => (
                        <div
                            key={index}
                            className={`relative ${currentStep >= index + 1 ? 'active-step' : ''}`} >
                            <div className='flex flex-col items-center'>
                                <h5 className={`cursor-pointer text-xs w-6 h-6 rounded-full flex items-center justify-center mb-2 ${currentStep >= index + 1 ? 'bg-primary-color text-white' : 'border border-primary-color text-primary-color bg-white'}`}>
                                    {index + 1}
                                </h5>
                                <p className='text-xs text-darker-secondary-color hidden md:block'>{stepName}</p>
                            </div>
                            {index < 6 && <span className="absolute top-3 w-full h-0.5 bg-gray-300 -z-10"></span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResumeSteps;
