import { useResumeContext } from '@/Contexts/ResumeContext';
import { useUserProfileContext } from '@/Contexts/UserProfileContext';
import React,{useEffect,useState,useRef} from 'react'
function RenderTemplate({ userProfileData,currentStep, className , style ={}}) {
const {  TemplateImg,setTemplateImg } = useResumeContext();
const {template} = useUserProfileContext();
  const iframeRef = useRef(null);

  console.log(className , style);
  const  generateTemplateImg = async ()=>{
    try {
 
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates/generate/img`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          template_id: template.id,
          resume_data : userProfileData,
          //optional payload
          settings : {
            'width' : '1024px',
            'height' : '768px',
             'dpi' : '240dpi'
          }
        }),
      });
      if (!response.ok) {
        console.log("Request", {
          template_id: template.id,
          resume_data : userProfileData
        });
        console.log(response);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data);
      setTemplateImg(data.data.template_img)
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
    
  }
  useEffect(()=>{

    if(currentStep==7){
      var resumeSize = Object.keys(userProfileData).length;
      if(resumeSize>0){
        generateTemplateImg()
      }

      }
  },[currentStep,userProfileData])


  return (
        <img  src={TemplateImg} alt='show loding screen or something' />
 
  )
}

export default RenderTemplate