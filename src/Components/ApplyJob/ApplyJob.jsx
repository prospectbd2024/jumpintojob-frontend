"use client";
import { FaFileUpload } from "react-icons/fa";
import React from "react";
import "./ApplyJob.css";
import { useEffect } from "react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useUserProfileContext } from "@/Contexts/UserProfileContext";
import ResumePreview from "@/ResumeBuilder/ResumeComponents/ResumeTemplates/ResumePreview";
import { useApplicationContext } from "@/Contexts/ApplicationContext";
import Availability from "../UserProfile/Availability";
import MessageBox from "../warnings/Message";
import { useUserContext } from "@/Contexts/UserContext";
const ApplyJob = ({ job }) => {
  const { personalInformation, userProfileData } = useUserProfileContext();
  const [CV, setCV] = useState(false);
  const {userData} = useUserContext();
  const { apply, message, setMessage, forwardingLetter, setForwardingLetter ,isApplied} = useApplicationContext();

  const [phone, setPhone] = useState("");
  const handleCoverLetter = (e) => {
    setForwardingLetter({type : e , value: null})
     
  };
  const handleClick = () => {
    if (userData) {
  
        CV && apply(job, CV)
        
        
    } else {
        Swal.fire({
            title: 'User must login before applying!',
            text: "Do you want to login?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
              router.push("/signin");
            }
        })
    }

}
 
  const handleTextChange =(e)=>{
     
      setForwardingLetter({type : 'text' ,value : e.target.value})
 
  }

  useEffect(() => {
    setPhone(personalInformation.phone);
  }, [personalInformation]);

  const handleFileChange = (e) => {
 
    setForwardingLetter({type : 'file' ,value :e.target.files[0]} );
    
  };
  return (
    <div className="job-application-form">
      <div className="job-application-form-content container">
        <div className="job-application-header">
          <div>
            <img src={job?.image} alt="" />
          </div>
          <div>
            <h5>{job?.job_title}</h5>
            <p>{job?.address}</p>
          </div>
        </div>
        <MessageBox message={message.message} type={message.type} />
        <div className="job-application-main">
          <div className="create-cv-warning" hidden={CV}>
            Please create your resume/cv with{" "}
            <a target="_blank" href={"/resumebuilder"}>
              Resume Builder
            </a>
          </div>
          <form action="" hidden={!CV}>
            <div className="step-applicant-account-info">
              <h4>Review your contact information</h4>
              <div className="application-input">
                <label htmlFor="first_name">First Name</label>
                <input type="text" placeholder="First Name" id="first_name" disabled value={personalInformation?.firstName} />
              </div>
              <div className="application-input">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" placeholder="Last Name" id="last_name" disabled value={personalInformation?.lastName} />
              </div>
              <div className="application-input">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email" disabled value={personalInformation?.email} />
              </div>
              <div className="application-input">
                <label htmlFor="citystate">
                  City, State <span> </span>
                </label>
                <input
                  type="text"
                  placeholder="City and State"
                  id="citystate"
                  disabled
                  value={
                    personalInformation.currentAddress.city +
                    (personalInformation.currentAddress.state ? ", " + personalInformation.currentAddress.state : "")
                  }
                />
              </div>
              <div className="application-input">
                <label htmlFor="country">
                  Country <span> </span>
                </label>
                <input type="text" placeholder="Country" id="country" disabled value={personalInformation?.currentAddress?.country} />
              </div>
              <div className="phone">
                <label htmlFor="phone">Phone</label>
                <PhoneInput
                  className="phone-input"
                  country={"bd"}
                  value={phone}
                  inputProps={{
                    name: "phone",
                    required: true,
                    placeholder: "Enter your phone number with country code",
                  }}
                />
              </div>
            </div>
            <div className="step-applicant-resume-info">
              {true ? (
                <div className="resume-preview">
                  <div className="header">
                    <h4>Preview Resume</h4>
                    <div>
                      Complete your resume/cv with{" "}
                      <a target="_blank" href={"/resumebuilder"}>
                        Resume Builder
                      </a>
                    </div>
                  </div>

                  <div className="resume-preview-container">
                    <ResumePreview setCV={setCV} className={"resume-iframe"} />
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="upload-coverletter upload-resume">
                <div className="cover-letter-options">
                  <div className="cover-letter-radio">
                    <input type="radio" id="text-letter" name="text" defaultChecked onClick={() => handleCoverLetter("text")} />
                    <label htmlFor="text-letter">Text</label>
                  </div>
                  <div className="cover-letter-radio">
                    <input type="radio" id="upload-letter" name="text" onClick={() => handleCoverLetter("file")} />
                    <label htmlFor="upload-letter">Upload</label>
                  </div>
                </div>
                { forwardingLetter.type !== "text" ? (
                  <div className="upload-input-container">
                    <div>
                      {!forwardingLetter?.value?.name ? <FaFileUpload className="file-upload" /> : <div>{forwardingLetter?.value?.name}</div>}

                      <p>Use files like pdf, doc, docx, rtf or text</p>
                      <button type="button" className="file-upload-button">
                        Upload Forwarding Letter
                      </button>
                    </div>

                    <input type="file" className="file" onChange={handleFileChange} />
                  </div>
                ) : (
                  <textarea name="" id="" cols="30" rows="10" placeholder="Type forwarding letter" value={forwardingLetter.value??""} onChange={handleTextChange}></textarea>
                )}
              </div>
            </div>
            <Availability />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className={` ${!CV ? "apply-restriction" : "apply-job-button"}`} type="button" onClick={handleClick} >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
