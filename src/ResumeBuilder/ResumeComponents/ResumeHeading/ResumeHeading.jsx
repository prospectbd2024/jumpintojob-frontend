import React from 'react';
import { useUserContext } from '../../../Contexts/UserContext';
import HeadingFields from './HeadingFields';
import { useResumeContext } from '@/Contexts/ResumeContext';

const ResumeHeading = ({  }) => {
    const {personalInformation,SetPersonalInformation } = useResumeContext();

    return (
        <div className='resume-heading'>
            <div className="container">
                <div className="resume-form-header">
                    <h3>Let's start with <span>header</span></h3>
                </div>
                <HeadingFields props={{personalInformation,SetPersonalInformation}} />
            </div>
        </div>
    );
};

export default ResumeHeading;