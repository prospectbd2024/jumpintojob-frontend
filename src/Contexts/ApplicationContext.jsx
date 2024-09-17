"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContext, useUserContext } from "./UserContext";
const applicationContext = createContext();
import Swal from "sweetalert2";
import UserProfileContext, { useUserProfileContext } from "./UserProfileContext";
export const useApplicationContext = () => useContext(applicationContext);

function ApplicationContext({ children }) {
  const [message, setMessage] = useState(false);
  const [forwardingLetter, setForwardingLetter] = useState({ type: 'text', value: null });
  const [appliedJobs, setAppliedJobs] = useState([]);
  const {availability} = useUserProfileContext();

  const { userData } = useUserContext();
  const apply = async (job, cv) => {
    try {
      const formData = new FormData();
      formData.append('job_id', job.id);
      formData.append('cv_id', cv.cv_id);
      formData.append('forwarding_letter_type', forwardingLetter.type);
      formData.append('forwarding_letter', forwardingLetter.value);
      formData.append('applicant_status', availability);

      const bearerToken = userData.data.access_token;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications/apply-for-job`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessage({
        type: "success",
        message: "Applied successfully!",
      });
      getAppliedJobs()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Applied successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      setMessage({
        type: "error",
        message: "Failed to apply.",
      });
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to apply.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getAppliedJobs = async( )=>{
    try {
 
      const bearerToken = userData?.data?.access_token;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications/${userData?.data?.user.user_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAppliedJobs(data.data);
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };
 
  useEffect(()=>{
    if( userData){

      getAppliedJobs();
    }
  },[])
  const isApplied =(job_id)=>{
    let flag = false;
    appliedJobs.map(el=>{
      if(el.job_id==job_id){
        flag = true
      }
    })
    return flag
  }

  return (
    <applicationContext.Provider
      value={{ apply, message, setMessage, forwardingLetter, setForwardingLetter,appliedJobs,isApplied }}>
      {children}
    </applicationContext.Provider>
  );
}

export default ApplicationContext;
