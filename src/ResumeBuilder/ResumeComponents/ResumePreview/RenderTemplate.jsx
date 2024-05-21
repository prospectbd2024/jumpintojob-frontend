import React from 'react'
import parse from 'html-react-parser';
function RenderTemplate({template, resumeData}) {
  return (
    <div dangerouslySetInnerHTML={{ __html: template.template }}></div>
  )
}

export default RenderTemplate