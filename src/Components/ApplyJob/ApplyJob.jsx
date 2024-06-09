"use client"
import { FaFileUpload } from "react-icons/fa"; 
import { FaCloudUploadAlt } from "react-icons/fa"; 
import React from 'react';
import './ApplyJob.css'
import { useEffect } from 'react';
import { useState } from 'react';
// import { useLoaderData, useParams } from 'react-router-dom';
import {useParams} from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { HiDocument, HiOutlineUpload } from "react-icons/hi";
import { useUserProfileContext } from '@/Contexts/UserProfileContext';
import RenderTemplate from "@/ResumeBuilder/ResumeComponents/ResumePreview/RenderTemplate";
import { useResumeContext } from "@/Contexts/ResumeContext";
import ResumePreview from "@/ResumeBuilder/ResumeComponents/ResumeTemplates/ResumePreview";
const ApplyJob = ({job}) => {

  const {personalInformation,userProfileData} = useUserProfileContext();
  const [coverLetterOption, setCoverLetterOption] = useState('text')
  const [phone, setPhone] = useState('');
  const handleCoverLetter = (e) => {
    setCoverLetterOption(e);
  }
 
  useEffect(()=>{
    setPhone(personalInformation.phone)
    console.log(userProfileData);
  },[personalInformation])
  return (
    <div className='job-application-form'>
      <div className="job-application-form-content container">
        <div className="job-application-header">
          <div>
            <img src={job.image} alt="" />
          </div>
          <div>
            <h5>{job.job_title}</h5>
            <p>{job.address}</p>
          </div>
        </div>
        <div className="job-application-main">
          <form action="">
            <div className="step-applicant-account-info">
              <h4>Add your contact information</h4>
              <div className='application-input'>
                <label htmlFor="first_name">First Name</label>
                <input type="text" placeholder='First Name' id="first_name" disabled value={personalInformation.firstName} />
              </div>
              <div className='application-input'>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" placeholder='Last Name' id="last_name" disabled value={personalInformation.lastName}  />
              </div>
              <div className='application-input'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Email' id="email"  disabled value={personalInformation.email}/>
              </div>
              <div className='application-input'>
                <label htmlFor="citystate">City, State <span> </span></label>
                <input type="text" placeholder='City and State' id="citystate" disabled value={personalInformation.currentAddress.city+ (personalInformation.currentAddress.state?", "+ personalInformation.currentAddress.state:"")}   />
              </div>
              <div className='application-input'>
                <label htmlFor="country">Country <span> </span></label>
                <input type="text" placeholder='Country' id="country" disabled value={personalInformation.currentAddress.country}  />
              </div>
              <div className='phone'>
                <label htmlFor="phone">Phone</label>
                <PhoneInput
              className="phone-input"
              country={'bd'}
              value={phone}

              inputProps={{
                name: 'phone',
                required: true,
                placeholder: 'Enter your phone number with country code',
              }}
               />
              </div>
            </div>
            <div className="step-applicant-resume-info">
 
              <div className='resume-preview'>
                <div className='header'>
                <h4>Preview Resume</h4>
                <div>Complete your resume/cv with <a  target="_blank" href={'/resumebuilder'}>Resume Builder</a></div>
                </div>
                
                <div className='resume-preview-container'> 
                <ResumePreview className={'resume-iframe'} />
                </div>
              </div>

              <div className="upload-coverletter upload-resume">
                <div className='cover-letter-options'>
                  <div className="cover-letter-radio">
                    <input type="radio" id="text-letter" name="text" defaultChecked onClick={() => handleCoverLetter('text')} />
                    <label htmlFor="text-letter">Text</label>
                  </div>
                  <div className="cover-letter-radio">
                    <input type="radio" id="upload-letter" name="text" onClick={() => handleCoverLetter('upload')} />
                    <label htmlFor="upload-letter" >Upload</label>
                  </div>
                </div>
                {coverLetterOption !== 'text' ?

                  <div className='upload-input-container'>
                      <div >
                        <FaFileUpload  className='file-upload'  />
                        {/* <FaCloudUploadAlt/> */}
                        <p>Use files like pdf, doc, docx, rtf or text</p>
                        <button type="button" className='file-upload-button'>Upload Forwarding Letter</button>
                      </div>
                    <input type="file" className='file' />
                  </div>
                  :
                  <textarea name="" id="" cols="30" rows="10" placeholder='Type forwarding letter'></textarea>
                }
              </div>

            </div>
            <div className='available-joining'>
            <input type="checkbox" id="available" />
            <label htmlFor="available">I'm available to join immediately</label>
            </div>
            <button className='apply-job-button' type="button">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;