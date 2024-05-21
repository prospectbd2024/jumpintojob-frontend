import React from 'react';
import { useUserContext } from '../../../Contexts/UserContext';
import { useResumeContext } from '@/Contexts/ResumeContext';
import RenderTemplate from './RenderTemplate';

const ResumePreview = () => {
    const { resumeData,template } = useResumeContext();
    return (
        <div>
            <h3>Preview</h3>
            <div>
                <RenderTemplate template={template} resumeData={resumeData} />
            </div>
        </div>
    );
};

export default ResumePreview;
