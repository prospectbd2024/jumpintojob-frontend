import React, { useCallback } from 'react';
import { useUserContext } from '../../../Contexts/UserContext';
import AddLanguages from './AddLanguages';
import './ResumeFinalize.css';
import ResumeOthers from './ResumeOthers';

const ResumeFinalize = () => {
    const { currentStep, setCurrentStep,resumeData } = useUserContext();


    const sendResume = useCallback(()=>{

        console.log(resumeData)
    });
    return (
        <div className='resume-finalize'>
            {/* <div className="resume-finalize-container container"> */}
            <div className="resume-form-header">
                <h3>YAY, you are one step away from your final <span>document!</span></h3>
            </div>
            <div className="resume-finalize-content">
                <div>
                    <AddLanguages />
                </div>
                <div>
            
             <ResumeOthers />
                </div>
            </div>

        </div>
    );
};

export default ResumeFinalize;