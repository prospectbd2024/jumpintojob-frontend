import React from 'react';
import { useUserContext } from '../../../Contexts/UserContext';
import './ResumeHeading.css'
import HeadingFields from './HeadingFields';

const ResumeHeading = ({ templateType }) => {
    const { currentStep, setCurrentStep, resumeData, setResumeData } = useUserContext();
    // console.log(currentStep)
    return (
        <div className='resume-heading'>
            <div className="resume-heading-container container">
                <div className="resume-form-header">
                    <h3>Let's start with <span>header</span></h3>
                </div>
                <HeadingFields props={{resumeData, setResumeData,templateType}} />
            </div>
        </div>
    );
};

export default ResumeHeading;