import React, { useState, useEffect } from "react";
import { useUserProfileContext } from "@/Contexts/UserProfileContext";
import { useApplicationContext } from "@/Contexts/ApplicationContext";
import { useUserContext } from "@/Contexts/UserContext";
import router from 'next/router';
import Swal from 'sweetalert2';  // Make sure you have this installed for SweetAlert
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
    <div className="max-w-2xl mx-auto p-8">
      <div className="space-y-8">
        <JobHeader job={job} loading={loading} />
        <MessageBox message={message.message} type={message.type} />
        <div className="border border-gray-300 rounded-lg p-6 mt-8">
          <CreateCvWarning CV={CV} />
          <form className="space-y-8">
            <ContactInformation personalInformation={personalInformation} phone={phone} />
            <ResumeSection loading={loading} setCV={setCV} CV={CV} />
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
