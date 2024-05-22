import React,{useEffect,useState} from 'react'
function RenderTemplate({template, resumeData,currentStep}) {

  const [htmlTemplate,setHtmlTemplate] = useState("")

  const  generateTemplateHtml = async ()=>{

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates/generate/html`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          template_id: template.id,
          resume_data : resumeData
        }),
      });
      if (!response.ok) {
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
      var resumeSize = Object.keys(resumeData).length;
      if(resumeSize>0){
        generateTemplateHtml()
      }

      }
  },[currentStep,resumeData])
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlTemplate }}></div>
  )
}

export default RenderTemplate