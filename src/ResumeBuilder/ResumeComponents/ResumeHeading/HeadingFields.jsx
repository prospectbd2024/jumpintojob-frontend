import { useResumeContext } from "@/Contexts/ResumeContext";
import React, { useState, useEffect, useCallback } from "react";
import ProfileImage from "./ProfileImage";
import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import Summary from "./Summary";
import MediaLinks from "./MediaLinks";

function HeadingFields({ props }) {
  const { personalInformation, SetPersonalInformation } = props;
  const { selectedImage, setSelectedImage, imagePreview, setImagePreview } = useResumeContext();

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

  useEffect(() => {
    if (selectedImage) {
      SetPersonalInformation(prev => ({ ...prev, cv_profile_image: selectedImage }))
    }
  }, [selectedImage])

  return (
    <div className="border border-gray-300 p-5 rounded-lg bg-white mb-5">
      <div className="space-y-6">
        <ProfileImage
          personalInformation={personalInformation}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          setSelectedImage={setSelectedImage}
        />
        <PersonalInfo
          personalInformation={personalInformation}
          handleChange={handleChange}
        />
        <AddressInfo
          personalInformation={personalInformation}
          handleAddressChange={handleAddressChange}
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