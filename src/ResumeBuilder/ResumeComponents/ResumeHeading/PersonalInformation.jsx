import React, { useCallback, useState } from "react";
import { HiUser } from "react-icons/hi";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import AddPersonalInfo from "./AddPersonalInfo";
import ModalBoxx from "@/Components/UserProfile/Qualifications/ModelBoxx";
import AddButton from "@/Components/Buttons/AddButton";
import Visibility from "@/Components/Buttons/Visibility";
import ProfileImage from "./ProfileImage";

const PersonalInformation = ({ props }) => {
  const { personalInfo, setPersonalInfo } = props;
  const [modal, setModal] = useState({ display: "none", title: "Loading", state: "new" });
  const [errors, setErrors] = useState({});

  const showModal = useCallback(
    (title, state) => {
      setModal({ title, display: "block", state });
    },
    []
  );

  const closeModal = useCallback(() => {
    setErrors({});
    setModal({ display: "none" });
  }, []);

  const saveChanges = useCallback(
    (newInfo) => {
      setPersonalInfo(newInfo);
      closeModal();
    },
    [setPersonalInfo, closeModal]
  );

  const manageVisibility = () => {
    setPersonalInfo((prev) => ({ ...prev, visible_on_cv: !prev.visible_on_cv }));
  };

  const removePersonalInfo = useCallback(() => {
    setPersonalInfo({});
  }, [setPersonalInfo]);

  // Check if personal information has valid data
  const hasValidData = personalInfo && Object.values(personalInfo).some((val) => val);

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-primary-color p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-center text-lg sm:text-xl md:text-2xl font-bold mt-3 sm:mt-4 md:mt-5 mb-3 sm:mb-4 md:mb-5">
        <HiUser className="mr-2 text-xl sm:text-2xl md:text-3xl" /> Personal Information
      </div>
      <ProfileImage personalInformation={personalInfo} SetPersonalInformation={setPersonalInfo} />
      {hasValidData ? (
        <div className="relative p-3 pb-7 sm:p-4 md:p-5 border border-secondary rounded-md mb-3 flex flex-col gap-2 sm:gap-3">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Title:</label>
              <p className="text-xs sm:text-sm md:text-base">
                {personalInfo.title}
              </p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">First Name:</label>
                <p className="text-xs sm:text-sm md:text-base">
                {personalInfo.firstName} 
              </p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Last Name:</label>
                <p className="text-xs sm:text-sm md:text-base">
                {personalInfo.lastName}
              </p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Email:</label>
                <p className="text-sm sm:text-base md:text-lg">{personalInfo.email}</p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Phone:</label>
                <p className="text-xs sm:text-sm md:text-base">{personalInfo.phone}</p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Date of Birth:</label>
                <p className="text-xs sm:text-sm md:text-base">{personalInfo.dateOfBirth}</p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Gender:</label>
                <p className="text-xs sm:text-sm md:text-base">{personalInfo.gender}</p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Nationality:</label>
                <p className="text-xs sm:text-sm md:text-base">{personalInfo.nationality}</p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Current Address: </label>
                <p className="text-xs sm:text-sm md:text-base">
                {personalInfo.currentAddress?.city}, {personalInfo.currentAddress?.state}, {personalInfo.currentAddress?.country}
              </p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Permanent Address:</label>
                <p className="text-xs sm:text-sm md:text-base">
                {personalInfo.permanentAddress?.city}, {personalInfo.permanentAddress?.state}, {personalInfo.permanentAddress?.country}
              </p>
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Summary:</label>
                {personalInfo.summary && (
                <p className="text-xs sm:text-sm md:text-base">{personalInfo.summary}</p>
              )}
              </div>
              <div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Media Links:</label>
                {personalInfo.mediaLinks && personalInfo.mediaLinks.length > 0 && (
                <div className="text-xs sm:text-sm md:text-base">
                  {personalInfo.mediaLinks.map((link, index) => (
                    <p key={index}>
                      {link.name}: {link.url}
                    </p>
                  ))}
                </div>
              )}
              </div>
            </div>
            <div className="flex justify-between gap-2 sm:gap-3 mt-2 sm:mt-0 mb-4">
              <Visibility
                visibility={personalInfo.visible_on_cv}
                handleVisibility={manageVisibility}
              />
              <FaTrashAlt
                className="text-red-600 cursor-pointer text-base sm:text-lg md:text-xl"
                onClick={removePersonalInfo}
              />
            </div>
          </div>
          <FaPencilAlt
            className="absolute bottom-2 right-2 text-white cursor-pointer text-base sm:text-lg md:text-xl mr-2 mb-3"
            onClick={() => showModal("Edit Personal Information", "update")}
          />
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">You haven't added personal information yet.</p>
          <p className="text-sm text-gray-500 mt-2">Click the button below to get started!</p>
        </div>
      )}
      <AddButton onClick={() => showModal("Add Personal Information", "add")} />
      <ModalBoxx props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddPersonalInfo
          props={{ personalInfo, setPersonalInfo, saveChanges, errors, onClose: closeModal }}
        />
      </ModalBoxx>
    </div>
  );
};

export default PersonalInformation;
