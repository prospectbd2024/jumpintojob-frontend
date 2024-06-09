"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContext, useUserContext } from "./UserContext";
const applicationContext = createContext();
import Swal from "sweetalert2";
export const useApplicationConetext = () => useContext(applicationContext);

function ApplicationContext({ children }) {
  const [message, setMessage] = useState(false);
  const [forwardingLetter, setForwardingLetter] = useState({type: 'text' , value : null});
 
  const { userData } = useUserContext();
  const apply = async (job, cv) => {
    try {
      const bearerToken = userData.data.access_token;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/apply-for-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          job_id: job.id,
          cv_id: cv.cv_id,
          forwarding_letter_type :  forwardingLetter.type,
          forwarding_letter : forwardingLetter.value
        }),
      });
 
      console.log( {
        job_id: job.id,
        cv_id: cv.cv_id,
        forwarding_letter_type :  forwardingLetter.type,
        forwarding_letter : forwardingLetter.value
      } );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessage({
        type: "success",
        message: "Applied successfully!",
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Applied successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };
  return (
    <applicationContext.Provider
      value={{ apply, message, setMessage, forwardingLetter, setForwardingLetter }}>
      {children}
    </applicationContext.Provider>
  );
}

export default ApplicationContext;
