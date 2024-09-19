'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { FaTrashAlt, FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { useUserContext } from "../../Contexts/UserContext";
import { useUserProfileContext } from "@/Contexts/UserProfileContext";
import ProfileImage from '@/ResumeBuilder/ResumeComponents/ResumeHeading/ProfileImage';
import SavedInfo from './SavedInfo';
import { Save } from 'lucide-react';

const AboutMe = () => {
  const { userData } = useUserContext();
  const { personalInformation, SetPersonalInformation } = useUserProfileContext();
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInformation || {});
  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLocalPersonalInfo(personalInformation || {});
  }, [personalInformation]);

  const handleChange = useCallback((field, value) => {
    setLocalPersonalInfo(prevState => ({
      ...prevState,
      [field]: value
    }));
  }, []);

  const handleAddressChange = useCallback((addressType, field, value) => {
    setLocalPersonalInfo(prevState => ({
      ...prevState,
      [addressType]: {
        ...prevState[addressType],
        [field]: value
      }
    }));
  }, []);

  const handleMediaLinkChange = useCallback((index, field, value) => {
    setLocalPersonalInfo(prevState => {
      const updatedMediaLinks = [...(prevState.mediaLinks || [])];
      updatedMediaLinks[index] = { ...updatedMediaLinks[index], [field]: value };
      return { ...prevState, mediaLinks: updatedMediaLinks };
    });
  }, []);

  const handleDeleteMediaLink = useCallback((index) => {
    setLocalPersonalInfo(prevState => {
      const updatedMediaLinks = [...(prevState.mediaLinks || [])];
      updatedMediaLinks.splice(index, 1);
      return { ...prevState, mediaLinks: updatedMediaLinks };
    });
  }, []);

  const handleAddMediaLink = useCallback(() => {
    setLocalPersonalInfo(prevState => ({
      ...prevState,
      mediaLinks: [...(prevState.mediaLinks || []), { name: "", url: "" }]
    }));
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!localPersonalInfo.firstName) newErrors.firstName = "First name is required";
    if (!localPersonalInfo.lastName) newErrors.lastName = "Last name is required";
    if (!localPersonalInfo.email) newErrors.email = "Email is required";
    if (!localPersonalInfo.phone) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      SetPersonalInformation(localPersonalInfo);
      setIsSaved(true);
    }
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  const renderSocialMediaInputs = () => {
    const socialIcons = {
      facebook: FaFacebook,
      twitter: FaTwitter,
      linkedin: FaLinkedin,
      github: FaGithub,
      instagram: FaInstagram,
    };

    return (
      <div className="col-span-2 flex flex-col gap-4 mb-6 ">
        <h3 className="text-lg font-semibold text-gray-700">Media Links</h3>
        {(localPersonalInfo.mediaLinks || []).map((link, index) => (
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg" key={index}>
            <div className="flex-grow">
              <select
                value={link.name}
                onChange={(e) => handleMediaLinkChange(index, "name", e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Platform</option>
                {Object.keys(socialIcons).map((platform) => (
                  <option key={platform} value={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex-grow">
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleMediaLinkChange(index, "url", e.target.value)}
                placeholder="Profile URL"
                className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDeleteMediaLink(index)}
              className="text-red-600 p-2 hover:bg-red-100 rounded-full transition duration-200"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMediaLink}
          className="self-start font-medium rounded-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition duration-200"
        >
          Add New Link
        </button>
      </div>
    );
  };

  if (isSaved) {
    return <SavedInfo personalInfo={localPersonalInfo} onEdit={handleEdit} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Information</h2>
      <div className="mb-6">
        <ProfileImage 
          personalInformation={localPersonalInfo} 
          SetPersonalInformation={setLocalPersonalInfo}
        />
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <InputField
          label="First Name"
          id="first_name"
          name="firstName"
          value={localPersonalInfo.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          id="last_name"
          name="lastName"
          value={localPersonalInfo.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
          error={errors.lastName}
        />
        <InputField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={localPersonalInfo.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
        />
        <InputField
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          value={localPersonalInfo.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          error={errors.phone}
        />
        <SelectField
          label="Gender"
          id="gender"
          value={localPersonalInfo.gender || ""}
          onChange={(e) => handleChange("gender", e.target.value)}
          options={[
            { value: "", label: "Select Gender" },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />
        <SelectField
          label="Marital Status"
          id="maritalStatus"
          value={localPersonalInfo.maritalStatus || ""}
          onChange={(e) => handleChange("maritalStatus", e.target.value)}
          options={[
            { value: "", label: "Select Marital Status" },
            { value: "single", label: "Single" },
            { value: "married", label: "Married" },
            { value: "divorced", label: "Divorced" },
            { value: "widowed", label: "Widowed" },
          ]}
        />
        <InputField
          label="Date of Birth"
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={localPersonalInfo.dateOfBirth || ""}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
        />
        <InputField
          label="Nationality"
          id="nationality"
          name="nationality"
          value={localPersonalInfo.nationality || ""}
          onChange={(e) => handleChange("nationality", e.target.value)}
        />
        <InputField
          label="Religion"
          id="religion"
          name="religion"
          value={localPersonalInfo.religion || ""}
          onChange={(e) => handleChange("religion", e.target.value)}
        />
        {renderSocialMediaInputs()}
        <TextAreaField
          label="Present Address"
          id="present_address"
          value={localPersonalInfo.presentAddress?.address || ""}
          onChange={(e) => handleAddressChange("presentAddress", "address", e.target.value)}
        />
        <TextAreaField
          label="Permanent Address"
          id="permanent_address"
          value={localPersonalInfo.permanentAddress?.address || ""}
          onChange={(e) => handleAddressChange("permanentAddress", "address", e.target.value)}
        />
      </div>
      <button
        onClick={handleSave}
        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
      >
        {/* Save Information */}
        <Save size={20} className="mr-2" /> Save Information
      </button>
    </div>
  );
};

const InputField = ({ label, id, name, type = "text", value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2 font-medium text-gray-700">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

const SelectField = ({ label, id, value, onChange, options }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2 font-medium text-gray-700">{label}</label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, id, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2 font-medium text-gray-700">{label}</label>
    <textarea
      id={id}
      rows="1"
      value={value}
      onChange={onChange}
      className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

export default AboutMe;