import React, { useCallback } from 'react';
import { useUserContext } from '../../../UserContext/UserContext';
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
            <div className="resume-prev-next-buttons">
                <button className='prev-button' onClick={() => setCurrentStep(currentStep - 1)}>Previous</button>
                <button className='next-button' onClick={()=> {sendResume()}}>Save & Preview</button>
            </div>

        </div>
    );
};

export default ResumeFinalize;