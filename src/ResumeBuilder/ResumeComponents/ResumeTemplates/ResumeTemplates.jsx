// "use client"
// import React, { useEffect } from 'react';
// import './ResumeTemplates.css'
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useResumeContext } from '@/Contexts/ResumeContext'; 
// import { useUserProfileContext } from '@/Contexts/UserProfileContext';

// const ResumeTemplates = () => {
//     const { currentStep, setCurrentStep, templateSettings, resumeTemplates, fetchResumeTemplates } = useResumeContext();
//     const { template, setTemplate } = useUserProfileContext();

//     useEffect(() => {
//         fetchResumeTemplates();
//     }, [fetchResumeTemplates]);

//     return (
//         <>
//             {resumeTemplates && (
//                 <div className='resume-templates'>
//                     <div className="resume-templates-container container">
//                         <div className="resume-form-header">
//                             <h3>Please pick a <span>template</span> below</h3>
//                         </div>
                        
//                         <div className="templates flex items-center justify-between">
//                             <Slider {...templateSettings} style={{ maxWidth: '100%' }} key={resumeTemplates.length}>
//                                 {resumeTemplates.map(tmp => (
//                                     <div key={tmp.id} className="template" onClick={() => setTemplate(tmp)}>
//                                         <img 
//                                             src={tmp.image} 
//                                             alt={`${tmp.name} ${tmp.type}`} 
//                                             className={`${template?.id === tmp.id ? 'selected-template' : ''}`} 
//                                         />
//                                         <p className='hidden md:block'>{tmp.name} {tmp.type}</p>
//                                     </div>
//                                 ))}
//                             </Slider>
//                         </div>
                        
//                         <div className="flex gap-2 items-center justify-center md:justify-start">
//                             <button
//                                 className="w-24 h-9 font-bold text-xs sm:w-28 sm:h-10 sm:text-sm md:text-base cursor-pointer bg-[var(--primary-color)] text-white rounded-md mt-4 md:w-36 md:h-11"
//                                 onClick={() => setCurrentStep(currentStep + 1)}
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default ResumeTemplates;

import React, { useEffect } from 'react';
import { useResumeContext } from '@/Contexts/ResumeContext';
import { useUserProfileContext } from '@/Contexts/UserProfileContext';
import { ArrowRight, Check } from 'lucide-react';

const ResumeTemplates = () => {
  const { currentStep, setCurrentStep, resumeTemplates, fetchResumeTemplates } = useResumeContext();
  const { template, setTemplate } = useUserProfileContext();

  useEffect(() => {
    fetchResumeTemplates();
  }, [fetchResumeTemplates]);

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Resume Template</h1>
      {resumeTemplates && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resumeTemplates.map((tmp) => (
              <div
                key={tmp.id}
                className={`relative p-4 border rounded-lg transition-all duration-300 ${
                  template?.id === tmp.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:shadow-md'
                }`}
                onClick={() => setTemplate(tmp)}
              >
                {tmp.image && ( 
                  <img
                    src={tmp.image} 
                    alt={`${tmp.name} ${tmp.type}`}
                    className="w-full h-48 mb-4 object-cover rounded-md"
                  />
                )}
                <h3 className="text-lg font-semibold">{tmp.name}</h3>
                <p className="text-sm text-gray-600">{tmp.type}</p>
                {template?.id === tmp.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                    <Check size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full flex items-center transition-colors duration-300"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeTemplates;