import React from "react";
import InputField from "./InputField";

function PersonalInfo({ personalInformation, handleChange, isFormValid }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
      <div className="space-y-2 sm:space-y-4">
        <InputField
          id="title"
          label="Title"
          value={personalInformation.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
          isFormValid={isFormValid}
        />
        <InputField
          id="firstname"
          label="First Name"
          value={personalInformation.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          required
          isFormValid={isFormValid}
        />
        <InputField
          id="lastname"
          label="Last Name"
          value={personalInformation.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          required
          isFormValid={isFormValid}
        />
        <InputField
          id="email"
          label="Email"
          value={personalInformation.email}
          onChange={(e) => handleChange('email', e.target.value)}
          type="email"
          required
          isFormValid={isFormValid}
        />
      </div>
      <div className="space-y-2 sm:space-y-4">
        <InputField
          id="phone"
          label="Phone"
          value={personalInformation.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          required
          isFormValid={isFormValid}
        />
        <InputField
          id="dob"
          label="Date of Birth"
          type="date"
          value={personalInformation.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          required
          isFormValid={isFormValid}
        />
        <InputField
          id="gender"
          label="Gender"
          value={personalInformation.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          type="select"
          options={[
            { value: "", label: " ", disabled: true },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "others", label: "Others" }
          ]}
          required
          isFormValid={isFormValid}
          className="border rounded-md p-2 w-full"
        />
        <InputField
          id="nationality"
          label="Nationality"
          value={personalInformation.nationality}
          onChange={(e) => handleChange('nationality', e.target.value)}
          isFormValid={isFormValid}
          required
        />
      </div>
    </div>
  );
}

export default PersonalInfo;