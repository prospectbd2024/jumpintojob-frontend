import { useResumeContext } from '@/Contexts/ResumeContext';
import { useUserProfileContext } from '@/Contexts/UserProfileContext';
import React, { useEffect, useState, useRef } from 'react';

function RenderTemplate({ userProfileData, currentStep, className, style = {} }) {
  const { TemplateImg, setTemplateImg, generateTemplate } = useResumeContext();
  const { template } = useUserProfileContext();
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const generateTemplateImg = async () => {
    setIsLoading(true);
    const data = await generateTemplate(template, 'png', {});
    setTemplateImg(data.template);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentStep === 7) {
      var resumeSize = Object.keys(userProfileData).length;
      if (resumeSize > 0) {
        generateTemplateImg();
      }
    }
  }, [currentStep, userProfileData]);

  return (
    <>
      {isLoading || !TemplateImg ? (
        <div className="flex items-center justify-center h-[100vh] bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Loading...</p>
        </div>
      ) : (
        <img className="w-full h-auto object-cover" src={TemplateImg} alt="Generated template" />
      )}
    </>
  );
}

export default RenderTemplate;
