// PersonalInfo.js
import React from "react";
import InputField from "./InputField";

function PersonalInfo({ personalInformation, handleChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <InputField
          id="title"
          label="Title"
          value={personalInformation.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <InputField
          id="firstname"
          label="First Name"
          value={personalInformation.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
        <InputField
          id="lastname"
          label="Last Name"
          value={personalInformation.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
        <InputField
          id="email"
          label="Email"
          value={personalInformation.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div className="space-y-4">
        <InputField
          id="phone"
          label="Phone"
          value={personalInformation.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
        <InputField
          id="dob"
          // label="Date of Birth"
          type="date"
          value={personalInformation.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
        />
       <div className="relative border-2 rounded-md ">
          <select
            id="gender"
            value={personalInformation.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full p-4 pt-5 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
          >
            <option value="" disabled></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <label
            htmlFor="gender"
            className={`absolute text-md duration-500 transform top-4 z-10 origin-[0] left-4
            ${personalInformation.gender ? 'scale-75 -translate-y-4 top-2' : 'scale-100 translate-y-0'}
            text-zinc-400`}
          >
            Gender
          </label>
        </div>
        <InputField
          id="nationality"
          label="Nationality"
          value={personalInformation.nationality}
          onChange={(e) => handleChange('nationality', e.target.value)}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;