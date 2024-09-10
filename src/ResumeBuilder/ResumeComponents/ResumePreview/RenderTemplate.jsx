import { useResumeContext } from '@/Contexts/ResumeContext';
import { useUserProfileContext } from '@/Contexts/UserProfileContext';
import React,{useEffect,useState,useRef} from 'react'
function RenderTemplate({ userProfileData,currentStep, className , style ={}}) {
const {  TemplateImg,setTemplateImg,generateTemplate } = useResumeContext();
const {template} = useUserProfileContext();
  const iframeRef = useRef(null);

 
  const  generateTemplateImg = async ()=>{
    const data = await  generateTemplate(template,'png',{})
    setTemplateImg(data.template)
 
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