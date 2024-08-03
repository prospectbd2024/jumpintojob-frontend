import React from "react";

const CreateCvWarning = ({ CV }) => (
  <div
    className={`text-gray-700 mb-5 ${CV ? 'hidden' : 'block'} text-center`}
  >
    Please create your resume/cv with{" "}
    <a 
      className="text-blue-500 underline" 
      target="_blank" 
      rel="noopener noreferrer" 
      href="/resumebuilder"
    >
      Resume Builder
    </a>
  </div>
);

export default CreateCvWarning;
