import React from "react";
import ProfileImage from "./ProfileImage";
import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import Summary from "./Summary";
import MediaLinks from "./MediaLinks";
import PrevNextButton from "@/ResumeBuilder/Layout/Button/PrevNextButton";

function HeadingFields({ props }) {
  const { 
    personalInformation, 
    SetPersonalInformation, 
    setCurrentStep, 
    isFormValid, 
    handleNext 
  } = props;

  const handleChange = (field, value) => {
    SetPersonalInformation((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddressChange = (addressType, field, value) => {
    SetPersonalInformation((prevData) => ({
      ...prevData,
      [addressType]: {
        ...prevData[addressType],
        [field]: value
      }
    }));
  };

  return (
    <div className="border border-gray-300 p-8 rounded-lg bg-gradient-to-br from-blue-50 to-primary-color mb-5">
      <div className="space-y-6">
      <ProfileImage
  personalInformation={personalInformation}
  SetPersonalInformation={SetPersonalInformation}
/>
        <PersonalInfo
          personalInformation={personalInformation}
          handleChange={handleChange}
          isFormValid={isFormValid}
        />
        <AddressInfo
          personalInformation={personalInformation}
          handleAddressChange={handleAddressChange}
          isFormValid={isFormValid}
        />
        <Summary
          summary={personalInformation.summary}
          handleChange={handleChange}
        />
        <MediaLinks
          mediaLinks={personalInformation.mediaLinks}
          SetPersonalInformation={SetPersonalInformation}
        />
      </div>
    </div>
  );
}

export default HeadingFields;