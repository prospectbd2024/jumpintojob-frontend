"use client";
import { useThrottle } from "@uidotdev/usehooks";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const isClient = typeof window !== "undefined";
  const storedUserData = isClient ? localStorage.getItem("userData") : null;
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;

  const [userData, setUserData] = useState(initialUserData);
  const [clickedFeaturedJob, setClickedFeaturedJob] = useState(null);

  const [bearerToken, setBearerToken] = useState(null);

  useEffect(() => {
    if (userData === null) {
      localStorage.removeItem("userData");
    } else {
      localStorage.setItem("userData", JSON.stringify(userData));

      // console.log(userData);
    }
  }, [userData]);

  // For Resume
  const [currentStep, setCurrentStep] = useState(1);
  const [userProfileData, setUserProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    linkedinurl: "",
    portfoliourl: "",
    city: "",
    state: "",
    country: "",
    summary: "",
    educations: [
      {
        id: 0,
        institution_name: "",
        institution_location: "",
        degree: "",
        field_study: "",
        education_starting_year: "",
        education_graduation_year: "",
        education_achivements: "",
      },
    ],
    experiences: [
      {
        id: 0,
        job_title: "",
        company: "",
        job_city: "",
        job_country: "",
        job_starting_year: "",
        job_ending_year: "",
        job_description: "",
      },
    ],
    skills: [], //new  skills : [{name : '',id: '', rating : 0}]
    languages: [], //new languages : [{name : '',id: '', rating : 0}]
  });

  useEffect(() => {
    //    console.log(typeof userData)
    if (userData) {
      setBearerToken(userData.data.access_token);
    }
  }, [userData]);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    if (userData) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userData?.data?.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.data);
          // console.log(profile);
        });
    }
  }, [userData]);

  const handleSubmitResume = () => {
    useEffect(() => {
      localStorage.setItem("userResume", JSON.stringify(userProfileData));
    }, [userProfileData]);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        clickedFeaturedJob,
        setClickedFeaturedJob,
        currentStep,
        setCurrentStep,
        userProfileData,
        setUserProfileData,
        handleSubmitResume,
        bearerToken,
        profile,
        setProfile,
        
      }}>
      {children}
    </UserContext.Provider>
  );
};
