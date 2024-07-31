import React,{useEffect} from 'react';
import { useResumeContext } from '@/Contexts/ResumeContext';
import RenderTemplate from './RenderTemplate';
import "../ResumeHeading/ResumeHeading.css";

const ResumePreview = () => {
    const { userProfileData,template,currentStep } = useResumeContext();
    useEffect(()=>{
        // console.log(userProfileData)
    },[userProfileData])

    return (
            <div>
            {/* <h3>Preview</h3> */}
                <RenderTemplate template={template} userProfileData={userProfileData} currentStep={currentStep} />
            </div>
    );
};

export default ResumePreview;
