import React, { useState, useCallback } from 'react';
import PersonalInfo from './PersonalInfo';
import AddressInfo from './AddressInfo';
import Summary from './Summary';
import MediaLinks from './MediaLinks';

function AddPersonalInfo({ props }) {
  const { personalInfo, setPersonalInfo, saveChanges, errors, onClose } = props;
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo || {});

  const handleChange = useCallback((field, value) => {
    setLocalPersonalInfo((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const handleAddressChange = useCallback((addressType, field, value) => {
    setLocalPersonalInfo((prevData) => ({
      ...prevData,
      [addressType]: {
        ...prevData[addressType],
        [field]: value,
      },
    }));
  }, []);

  const handleSave = useCallback(() => {
    // Log the data that is about to be saved
    console.log('Saving personal info:', localPersonalInfo);

    // Ensure localPersonalInfo is valid and contains all necessary fields
    if (localPersonalInfo) {
      saveChanges(localPersonalInfo); // Call saveChanges with updated localPersonalInfo
      console.log('Changes saved');
    } else {
      console.error('No personal info to save');
    }

    // Prevent the modal from closing for now to check save behavior
    // onClose(); // Comment this out for debugging
  }, [localPersonalInfo, saveChanges]);

  return (
    <div className="relative p-3 pb-7 sm:p-4 md:p-5 border border-secondary rounded-md mb-3 flex flex-col gap-2 sm:gap-3">
      <PersonalInfo
        personalInformation={localPersonalInfo}
        handleChange={handleChange}
        errors={errors}
      />
      <AddressInfo
        personalInformation={localPersonalInfo}
        handleAddressChange={handleAddressChange}
        errors={errors}
      />
      <Summary
        summary={localPersonalInfo.summary}
        handleChange={handleChange}
      />
      <MediaLinks
        mediaLinks={localPersonalInfo.mediaLinks || []}
        SetPersonalInformation={setLocalPersonalInfo}
      />
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Save
        </button>
        <button
          onClick={onClose}  
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddPersonalInfo;
