"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../../Contexts/UserContext";
import UserImage from "@/assets/default-user.jpg";
import { FaTrashAlt } from "react-icons/fa";
import { useUserProfileContext } from "@/Contexts/UserProfileContext";
import SaveProfileButton from "../Buttons/SaveProfileButton";

const AboutMe = () => {
  const { userData } = useUserContext();
  const {
    personalInformation,
    SetPersonalInformation,
    avatar,
    setAvatar,
    selectedAvatar,
    selectAvatar,
  } = useUserProfileContext();

  useEffect(() => {
    if (selectedAvatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(selectedAvatar);
    }
  }, [selectedAvatar]);

  const handleFileChange = (event) => {
    selectAvatar(event.target.files[0]);
  };

  const handleChange = (field, value) => {
    SetPersonalInformation((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMediaLinkChange = (index, field, value) => {
    const updatedMediaLinks = [...personalInformation.mediaLinks];
    updatedMediaLinks[index][field] = value;
    SetPersonalInformation({
      ...personalInformation,
      mediaLinks: updatedMediaLinks,
    });
  };

  const handleDeleteMediaLink = (index) => {
    const updatedMediaLinks = [...personalInformation.mediaLinks];
    updatedMediaLinks.splice(index, 1);
    SetPersonalInformation({
      ...personalInformation,
      mediaLinks: updatedMediaLinks,
    });
  };

  const handleAddMediaLink = () => {
    SetPersonalInformation({
      ...personalInformation,
      mediaLinks: [...personalInformation.mediaLinks, { name: "", url: "" }],
    });
  };

  const handleAddressChange = (addressType, field, value) => {
    SetPersonalInformation((prevData) => ({
      ...prevData,
      [addressType]: {
        ...prevData[addressType],
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl mb-4">Personal Information</h2>
      <div className="grid gap-5 grid-cols-2">
        <div className="flex gap-5 mb-8 items-center col-span-2">
          <div className="relative inline-block">
            <img
              src={personalInformation.avatar ?? UserImage.src}
              alt="Avatar"
              className="w-36 h-36 rounded-full"
            />
            <div className="absolute w-28 text-center right-3 bg-black bg-opacity-50 text-white py-1.5 px-2 rounded cursor-pointer">
              <label htmlFor="avatar-upload">
                <span className="no-underline">Upload</span>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                value={undefined}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="first_name" className="block mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="Your First Name"
            id="first_name"
            name="firstName"
            value={personalInformation.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="h-11 w-4/5 px-2.5 text-lg border border-gray-400 rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="last_name" className="block mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Your Last Name"
            id="last_name"
            name="lastName"
            value={personalInformation.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="h-11 w-4/5 px-2.5 text-lg border border-gray-400 rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            value={personalInformation.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="h-11 w-4/5 px-2.5 text-lg border border-gray-400 rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="block mb-2">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Your Phone Number"
            id="phone"
            name="phone"
            value={personalInformation.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="h-11 w-4/5 px-2.5 text-lg border border-gray-400 rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="gender" className="block mb-2">
            Gender
          </label>
          <select
            id="gender"
            value={personalInformation.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="h-11 w-4/5 px-2.5 text-lg border border-gray-400 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="maritalStatus" className="block mb-2">
            Marital Status
          </label>
          <select
            id="maritalStatus"
            value={personalInformation.maritalStatus || ""}
            onChange={(e) => handleChange("maritalStatus", e.target.value)}
            className="h-11 w-4/5 px-2.5 text-lg border border-gray-400 rounded"
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="dateOfBirth" className="block mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            value={personalInformation.dateOfBirth || ""}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className="h-11 w-4/5 px-2.5 text-lg border border-gray-400 rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="nationality" className="block mb-2">
            Nationality
          </label>
          <input
            type="text"
            placeholder="Nationality"
            id="nationality"
            value={personalInformation.nationality || ""}
            onChange={(e) => handleChange("nationality", e.target.value)}
            className="h-11 w-4/5 px-2.5 text-lg border border-gray-400 rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="religion" className="block mb-2">
            Religion
          </label>
          <input
            type="text"
            placeholder="Religion"
            id="religion"
            value={personalInformation.religion || ""}
            onChange={(e) => handleChange("religion", e.target.value)}
            className="h-11 w-4/5 px-2.5 text-lg border border-gray-400 rounded"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-2 mb-5">
          <h3 className="text-lg font-bold mb-2">Media Links</h3>
          {personalInformation?.mediaLinks.map((link, index) => (
            <div
              className="grid grid-cols-3"
              key={index}
            >
              <div className="mb-2">
                <label className="block pb-1.5">Name</label>
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => handleMediaLinkChange(index, "name", e.target.value)}
                  placeholder="LinkedIn"
                  className="p-3 outline-none text-base font-normal rounded border border-gray-400 bg-transparent text-gray-800"
                />
              </div>
              <div className="mb-2">
                <label className="block pb-1.5">URL</label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => handleMediaLinkChange(index, "url", e.target.value)}
                  placeholder="LinkedIn URL"
                  className="p-3 outline-none text-base font-normal rounded border border-gray-400 bg-transparent text-gray-800"
                />
              </div>
              <div className="self-center">
                <button
                  type="button"
                  onClick={() => handleDeleteMediaLink(index)}
                  className="text-red-600"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMediaLink}
            className="inline-block text-left w-fit font-medium rounded bg-blue-500 text-white py-1.5 px-3 hover:bg-blue-600"
          >
            Add New
          </button>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-6 mb-2">
          <div className="mb-2">
            <label className="block mb-2" htmlFor="present_address">
              Present Address
            </label>
            <textarea
              id="present_address"
              rows="3"
              value={personalInformation?.presentAddress?.address || ""}
              onChange={(e) => handleAddressChange("presentAddress", "address", e.target.value)}
              placeholder="Present Address"
              className="h-full w-full px-2.5 text-lg border border-gray-400 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2" htmlFor="permanent_address">
              Permanent Address
            </label>
            <textarea
              id="permanent_address"
              rows="3"
              value={personalInformation?.permanentAddress?.address || ""}
              onChange={(e) => handleAddressChange("permanentAddress", "address", e.target.value)}
              placeholder="Permanent Address"
              className="h-full w-full px-2.5 text-lg border border-gray-400 rounded"
            />
          </div>
        </div>
        <SaveProfileButton
          personalInformation={personalInformation}
          className="mt-5"
        />
      </div>
    </div>
  );
};

export default AboutMe;
