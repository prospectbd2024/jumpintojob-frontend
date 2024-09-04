import React from "react";
import InputField from "./InputField";

function AddressInfo({ personalInformation, handleAddressChange, isFormValid }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-2 sm:space-y-4">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">Current Address</h3>
        <InputField
          id="current-city"
          label="City"
          value={personalInformation.currentAddress?.city}
          onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)}
          required
          isFormValid={isFormValid}
        />
        <InputField
          id="current-state"
          label="State or District"
          value={personalInformation.currentAddress?.state}
          onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)}
          required
          isFormValid={isFormValid}
        />
        <InputField
          id="current-country"
          label="Country"
          value={personalInformation.currentAddress?.country}
          onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)}
          required
          isFormValid={isFormValid}
        />
      </div>
      <div className="space-y-2 sm:space-y-4">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">Permanent Address</h3>
        <InputField
          id="permanent-city"
          label="City"
          value={personalInformation.permanentAddress?.city}
          onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
          required
          isFormValid={isFormValid}
        />
        <InputField
          id="permanent-state"
          label="State or District"
          value={personalInformation.permanentAddress?.state}
          onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
          required
          isFormValid={isFormValid}
        />
        <InputField
          id="permanent-country"
          label="Country"
          value={personalInformation.permanentAddress?.country}
          onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)}
          required
          isFormValid={isFormValid}
        />
      </div>
    </div>
  );
}

export default AddressInfo;