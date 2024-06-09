import { useUserContext } from '@/Contexts/UserContext';
import React,{useState,useRef,useEffect} from 'react'


function ResumePreview({className , style}) {
    const [htmlTemplate,setHtmlTemplate] = useState("")
    const {userData} = useUserContext();
    const iframeRef = useRef(null);
    const  generateTemplateHtml = async ()=>{
      try {
 
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/${userData?.data.user.user_id}/resume`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization" : `Bearer ${userData.data.access_token}`,
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setHtmlTemplate(data.data)
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
      
    }
    useEffect(()=>{
     generateTemplateHtml()
    },[])
  
  
    const updateTemplateView =(htmlContent)=>{
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.open();
      iframeDocument.write(htmlContent);
      iframeDocument.close();
      iframeRef.current.style.height = iframeRef.current.contentWindow.document.documentElement.scrollHeight + 'px';
    }
  
  
  useEffect(()=>{
   
    updateTemplateView(htmlTemplate)
  },[htmlTemplate])
  
    return (
          <iframe
          ref={iframeRef}
          width="100%"
          height="1000"
          className ={className}
          style={{ border: 'none' ,...style}}
          title="Embedded Document"
        ></iframe>
  
    )
  }
  
  export default ResumePreview