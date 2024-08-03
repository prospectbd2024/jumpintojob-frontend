import React,{useEffect} from 'react';
import { useResumeContext } from '@/Contexts/ResumeContext';
import RenderTemplate from './RenderTemplate'; 

const ResumePreview = () => {
    const { userProfileData,template,currentStep } = useResumeContext();
    useEffect(()=>{
        // console.log(userProfileData)
    },[userProfileData])

    return (
            <div className='border border-gray-300 p-5 rounded-lg bg-white mb-5'>
            {/* <h3>Preview</h3> */}
                <RenderTemplate template={template} userProfileData={userProfileData} currentStep={currentStep} />
            </div>
    );
};

export default ResumePreview;
