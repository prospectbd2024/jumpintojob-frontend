import React, { useCallback, useState } from "react";
import { HiUser } from "react-icons/hi";
import { FaPencilAlt, FaTrashAlt, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import AddPersonalInfo from "./AddPersonalInfo";
import ModalBox from "@/Components/UserProfile/Qualifications/ModalBox";
import AddButton from "@/Components/Buttons/AddButton";
import Visibility from "@/Components/Buttons/Visibility";
import ProfileImage from "./ProfileImage";
import ModalBoxx from "@/Components/UserProfile/Qualifications/ModelBoxx";

const PersonalInformation = ({ props }) => {
  const { personalInfo, setPersonalInfo } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSavePersonalInfo = useCallback((newInfo) => {
    setPersonalInfo(newInfo);
    closeModal();
  }, [setPersonalInfo, closeModal]);

  const manageVisibility = () => {
    setPersonalInfo((prev) => ({ ...prev, visible_on_cv: !prev.visible_on_cv }));
  };

  const removePersonalInfo = useCallback(() => {
    setPersonalInfo({});
  }, [setPersonalInfo]);

  const renderField = (label, value) => {
    if (!value) return null;
    return (
      <div className="flex items-center justify-start">
        <label className="text-base font-bold mr-2">{label}:</label>
        <p className="text-sm">{value}</p>
      </div>
    );
  };

  const renderAddress = (addressType) => {
    const address = personalInfo[addressType];
    if (!address || !address.houseNo || !address.city || !address.country) return null;
    return (
      <div className="flex flex-col">
        <label className="text-base font-bold">{addressType === 'currentAddress' ? 'Current Address' : 'Permanent Address'}:</label>
        <p className="text-sm">{`${address.houseNo}, ${address.city}, ${address.country}`}</p>
      </div>
    );
  };

  const renderSocialMedia = () => {
    if (!personalInfo.socialMedia) return null;

    const socialIcons = {
      facebook: FaFacebook,
      twitter: FaTwitter,
      linkedin: FaLinkedin,
      github: FaGithub,
    };

    const socialLinks = Object.entries(personalInfo.socialMedia).filter(([_, link]) => link);
    if (socialLinks.length === 0) return null;

    return (
      <div className="flex flex-col">
        <label className="text-base font-bold">Social Media:</label>
        {socialLinks.map(([platform, link]) => {
          const Icon = socialIcons[platform];
          return (
            <div
              key={platform}
              className="flex items-center gap-2 mt-2 sm:flex-row flex-col sm:items-center"
            >
              <Icon
                className={`text-${platform === 'github' ? 'gray-800' : 'blue-600'} text-lg sm:text-xl`}
              />
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-black hover:underline break-words sm:break-normal"
              >
                {link}
              </a>
            </div>
          );
        })}
      </div>
    );
  };

  const renderContent = () => {
    const fields = [
      renderField("First Name", personalInfo.firstName),
      renderField("Last Name", personalInfo.lastName),
      renderField("Email", personalInfo.email),
      renderField("Phone Number", personalInfo.phoneNumber),
      renderField("Gender", personalInfo.gender),
      renderField("Nationality", personalInfo.nationality),
      renderField("Marital Status", personalInfo.maritalStatus),
      renderAddress("currentAddress"),
      !personalInfo.permanentAddressSameAsCurrent && renderAddress("permanentAddress"),
      renderField("Career Summary", personalInfo.careerSummary),
      renderSocialMedia()
    ].filter(Boolean);

    if (fields.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">You haven't added personal information yet.</p>
          <p className="text-sm text-gray-500 mt-2">Click the button below to get started!</p>
        </div>
      );
    }

    return (
      <div className="relative p-4 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-secondary-color rounded-md p-4">
          {fields}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-primary-color p-0 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-center text-xl font-bold m-4 p-4">
        <HiUser className="mr-2 text-2xl" /> Personal Information
      </div>
      <ProfileImage personalInformation={personalInfo} SetPersonalInformation={setPersonalInfo} />
      {renderContent()}
      <AddButton onClick={showModal} />
      {isModalOpen && (
        <ModalBoxx props={{ title: Object.keys(personalInfo).length > 0 ? "Edit Personal Information" : "Add Personal Information", onClose: closeModal }}>
          <AddPersonalInfo
            props={{
              personalInfo,
              setPersonalInfo: handleSavePersonalInfo,
              onClose: closeModal
            }}
          />
        </ModalBoxx>
      )}
    </div>
  );
};

export default PersonalInformation;
