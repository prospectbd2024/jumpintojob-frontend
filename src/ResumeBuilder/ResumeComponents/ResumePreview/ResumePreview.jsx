import React,{useEffect} from 'react';
import { useResumeContext } from '@/Contexts/ResumeContext';
import RenderTemplate from './RenderTemplate';

const ResumePreview = () => {
    const { userProfileData,template,currentStep } = useResumeContext();
    useEffect(()=>{
        // console.log(userProfileData)
    },[userProfileData])

    return (
        <div>
            <h3>Preview</h3>
            <div>
                <RenderTemplate template={template} userProfileData={userProfileData} currentStep={currentStep} />
            </div>
        </div>
    );
};

export default ResumePreview;
