import React,{useEffect,useState,useRef} from 'react'
function RenderTemplate({template, userProfileData,currentStep, className , style ={}}) {

  const [htmlTemplate,setHtmlTemplate] = useState("")
  const iframeRef = useRef(null);

  console.log(className , style);
  const  generateTemplateHtml = async ()=>{
    try {
      console.log(userProfileData);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates/generate/html`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          template_id: template.id,
          resume_data : userProfileData
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
      setHtmlTemplate(data.data.template)
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
    
  }
  useEffect(()=>{

    if(currentStep==7){
      var resumeSize = Object.keys(userProfileData).length;
      if(resumeSize>0){
        generateTemplateHtml()
      }

      }
  },[currentStep,userProfileData])


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

export default RenderTemplate