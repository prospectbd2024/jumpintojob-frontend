// CreateCvWarning.jsx
import React from "react";
import { FaFileUpload } from "react-icons/fa";

const CreateCvWarning = ({ CV }) => (
  <div className="create-cv-warning" hidden={CV}>
    Please create your resume/cv with{" "}
    <a target="_blank" href={"/resumebuilder"}>
      Resume Builder
    </a>
  </div>
);

export default CreateCvWarning;
