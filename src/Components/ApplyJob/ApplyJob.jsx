import React, { useState, useEffect } from "react";
import "./ApplyJob.css";
import { useUserProfileContext } from "@/Contexts/UserProfileContext";
import { useApplicationContext } from "@/Contexts/ApplicationContext";
import { useUserContext } from "@/Contexts/UserContext";
import router from 'next/router';
import MessageBox from "../warnings/Message";
import JobHeader from "./JobHeader";
import CreateCvWarning from "./CreateCvWarning";
import ContactInformation from "./ContactInformation";
import ResumeSection from "./ResumeSection";
import CoverLetterSection from "./CoverLetterSection";
import ApplyButton from "./ApplyButton";
import ApplyJobSkeleton from "@/Skeletons/ApplyJobSkeleton";
import Availability from "../UserProfile/Availability";

const ApplyJob = ({ job }) => {
  const { personalInformation } = useUserProfileContext();
  const [CV, setCV] = useState(false);
  const { userData } = useUserContext();
  const { apply, message, forwardingLetter, setForwardingLetter } = useApplicationContext();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  const handleCoverLetter = (e) => {
    setForwardingLetter({ type: e, value: null });
  };

  const handleClick = () => {
    if (userData) {
      CV && apply(job, CV);
    } else {
      Swal.fire({
        title: "User must login before applying!",
        text: "Do you want to login?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/signin");
        }
      });
    }
  };

  const handleTextChange = (e) => {
    setForwardingLetter({ type: "text", value: e.target.value });
  };

  useEffect(() => {
    // Simulate fetching personalInformation
    setTimeout(() => {
      setPhone(personalInformation.phone);
      setLoading(false);
    }, 3000); // Simulating data loading delay

  }, [personalInformation]);

  const handleFileChange = (e) => {
    setForwardingLetter({ type: "file", value: e.target.files[0] });
  };

  if (loading) {
    return <ApplyJobSkeleton />;
  }

  return (
    <div className="job-application-form">
      <div className="job-application-form-content container">
        <JobHeader job={job} />
        <MessageBox message={message.message} type={message.type} />
        <div className="job-application-main">
          <CreateCvWarning CV={CV} />
          <form>
            <ContactInformation personalInformation={personalInformation} phone={phone} />
            <ResumeSection loading={loading} setCV={setCV} />
            <CoverLetterSection
              forwardingLetter={forwardingLetter}
              handleFileChange={handleFileChange}
              handleTextChange={handleTextChange}
              handleCoverLetter={handleCoverLetter}
              loading={loading}
            />
            <Availability />
            <ApplyButton CV={CV} handleClick={handleClick} userData={userData} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
