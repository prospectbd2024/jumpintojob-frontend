import React from 'react';
import './ResumeFinalize.scss';
import ResumeOthers from './ResumeOthers';
import { useResumeContext } from '@/Contexts/ResumeContext';
import Language from '@/Components/UserProfile/Qualifications/Language/Language';
import Hobbies from '@/Components/UserProfile/Qualifications/Hobbies/Hobbies';

const ResumeFinalize = () => {
    const { languages, setLanguages, hobbies, setHobbies } = useResumeContext();

    return (
        <div className='resume-finalize'>
            <div className="heading-info">
                <h3 >YAY, you are one step away from your final <span>document!</span></h3>
            </div>
            <div className="resume-finalize__content">
                <div>
                    <Language props={{languages, setLanguages}} />
                </div>
                <div>
                    <Hobbies props={{hobbies, setHobbies}} />
                </div>
                <div>
                    <ResumeOthers />
                </div>
            </div>
        </div>
    );
};

export default ResumeFinalize;