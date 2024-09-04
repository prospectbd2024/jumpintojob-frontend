import React, { useState, useEffect } from 'react';
import { useResumeContext } from '@/Contexts/ResumeContext';
import PersonalInformation from './PersonalInformation';

const ResumeHeading = () => {
    const { personalInformation, SetPersonalInformation, setCurrentStep } = useResumeContext();
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const requiredFields = [
            'title', 'firstName', 'lastName', 'email',
            'currentAddress.city', 'currentAddress.state', 'currentAddress.country',
            'permanentAddress.city', 'permanentAddress.state', 'permanentAddress.country'
        ];

        const isValid = requiredFields.every(field => {
            const value = field.includes('.') 
                ? personalInformation[field.split('.')[0]][field.split('.')[1]]
                : personalInformation[field];
            return value && value.trim() !== '';
        });

        setIsFormValid(isValid);
    }, [personalInformation]);

    const handleNext = () => {
        if (isFormValid) {
            setCurrentStep(currentStep => currentStep + 1);
        }
    };

    return (
        <div className='resume-heading'>
            <div className="container">
                <div className="resume-form-header">
                    <h3>Let's start with <span>header</span></h3>
                </div>
                <PersonalInformation 
                    props={{
                        personalInfo: personalInformation, 
                        setPersonalInfo: SetPersonalInformation,
                    }} 
                />
                {/* {isFormValid && (
                    <div className="mt-4">
                        <button 
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                        >
                            Next
                        </button>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default ResumeHeading;