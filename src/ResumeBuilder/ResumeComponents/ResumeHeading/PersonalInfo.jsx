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
          label="Date of Birth"
          type="date"
          value={personalInformation.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
        />
        <select
          id="gender"
          value={personalInformation.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
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