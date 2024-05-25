"use client"
import React, { useContext, createContext, useState, useEffect, useCallback, cache } from 'react'
import { useUserProfileContext } from './UserProfileContext';


export const resumeContext = createContext();
export const useResumeContext = () => useContext(resumeContext);



function ResumeContext({ children }) {



  const { 
    personalInformation, SetPersonalInformation, 
    experiences, setExperiences,
    educations, setEducations, 
    languages, setLanguages, 
    skills, setSkills,
    hobbies, setHobbies, 
    more, manageMore,
    userProfileData, setUserProfileData 
  } = useUserProfileContext();

  const [currentStep, setCurrentStep] = useState(1);
  const [resumeTemplates, setResumeTemplates] = useState([]);
  const [template, setTemplate] = useState({ id: 1 });

  //template settings
  const templateSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 2
  };



  useEffect(() => {
    const fetchResumeTemplates = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResumeTemplates(data.data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchResumeTemplates();
  }, []); // Empty dependency array means this effect runs once after the initial render


  return (
    <resumeContext.Provider value={{
      currentStep,
      setCurrentStep, educations,
      setEducations, experiences,
      setExperiences,
      languages, setLanguages,
      skills, setSkills,
      template, setTemplate,
      personalInformation, SetPersonalInformation,
      hobbies, setHobbies,
      userProfileData, setUserProfileData,
      more, manageMore, templateSettings,
      resumeTemplates
    }} >
      {children}
    </resumeContext.Provider>
  )
}

export default ResumeContext