import React, { useCallback } from 'react';
import './ResumeFinalize.css';
import ResumeOthers from './ResumeOthers';
import { useResumeContext } from '@/Contexts/ResumeContext';
import Language from '@/Components/UserProfile/Qualifications/Language/Language';

const ResumeFinalize = () => {
    const {  languages,setLanguages } = useResumeContext();

    return (
        <div className='resume-finalize'>
            {/* <div className="resume-finalize-container container"> */}
            <div className="resume-form-header">
                <h3>YAY, you are one step away from your final <span>document!</span></h3>
            </div>
            <div className="resume-finalize-content">
                <div>
                <Language props={{languages,setLanguages}}/>
                </div>
                <div>
            
             <ResumeOthers />
                </div>
            </div>

        </div>
    );
};

export default ResumeFinalize;