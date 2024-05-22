import React,{useEffect} from 'react';
import { useResumeContext } from '@/Contexts/ResumeContext';
import RenderTemplate from './RenderTemplate';

const ResumePreview = () => {
    const { resumeData,template,currentStep } = useResumeContext();
    useEffect(()=>{
        console.log(resumeData)
    },[resumeData])

    return (
        <div>
            <h3>Preview</h3>
            <div>
                <RenderTemplate template={template} resumeData={resumeData} currentStep={currentStep} />
            </div>
        </div>
    );
};

export default ResumePreview;
