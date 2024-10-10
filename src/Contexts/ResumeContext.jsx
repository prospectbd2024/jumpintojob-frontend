"use client"
import React, { useContext, createContext, useState, useEffect, useCallback, cache } from 'react'
import { useUserProfileContext } from './UserProfileContext';
import { useUserContext } from './UserContext';
import Swal from 'sweetalert2'

export const resumeContext = createContext();
export const useResumeContext = () => useContext(resumeContext);



function ResumeContext({ children }) {

  const { template } = useUserProfileContext();

  const { 
    personalInformation, SetPersonalInformation, 
    experiences, setExperiences,
    educations, setEducations, 
    languages, setLanguages, 
    skills, setSkills,
    hobbies, setHobbies, 
    more, manageMore,
    userProfileData, setUserProfileData ,
    availability, setAvailability
  } = useUserProfileContext();
  const [TemplateImg,setTemplateImg] = useState(null)
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeTemplates, setResumeTemplates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {userData} = useUserContext();
  //template settings
  const templateSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 2.5,
    slidesToScroll: 2
  };

  const { saveProfile } = useUserProfileContext();
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
  useEffect(() => {
    fetchResumeTemplates();
  }, []); // Empty dependency array means this effect runs once after the initial render
  const saveCV = async () => {
    saveProfile() 
    let html =await generateTemplate(template,'html',{})
    
    console.log(
      JSON.stringify({
        cv_html: html.template,
        profile_data : userProfileData,
        applicant_status : availability
      })
    );
    

    try {
      let bearerToken = userData.data.access_token;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cv/store`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            "Authorization": `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            cv_html: html,
            profile_data : userProfileData,
            applicant_status : availability
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // You can also handle the response data here if needed
      const data = await response.json();
      // console.log('Success:', data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "CV updated successfull!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  const generateTemplate =  async (template,output_type,options={})=>{
    try {
      // console.log("getting tempalates");
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates/generator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          template_id: template.id,
          resume_data : userProfileData,
          output_type : output_type, 
          options : {
            'width' : 1024 ,
            "args": { "fullPage": true },
            // "format" : "A4"  //for pdf
            ...options
          }
        }),
      });
      if (!response.ok) {
       
        console.log(response);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
     
      return data.data;
      
      
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  return (
    <resumeContext.Provider value={{
      currentStep,
      setCurrentStep, educations,
      setEducations, experiences,
      setExperiences,
      languages, setLanguages,
      skills, setSkills,
      personalInformation, SetPersonalInformation,
      hobbies, setHobbies,
      userProfileData, setUserProfileData,
      more, manageMore, templateSettings,
      resumeTemplates,
      fetchResumeTemplates,
      TemplateImg,setTemplateImg,
      saveCV,
      selectedImage, setSelectedImage,
      imagePreview, setImagePreview
      ,generateTemplate
    }} >
      {children}
    </resumeContext.Provider>
  )
}

export default ResumeContext