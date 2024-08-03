import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactInformation = ({ personalInformation, phone }) => (
  <div className="step-applicant-account-info space-y-6">
    <h4 className="text-lg font-semibold mb-6">Review your contact information</h4>
    
    <div className="application-input flex flex-col gap-2 mb-5">
      <label htmlFor="first_name" className="text-gray-900 text-sm">First Name</label>
      <input
        type="text"
        placeholder="First Name"
        id="first_name"
        disabled
        value={personalInformation?.firstName}
        className="h-10 border border-gray-300 rounded-md px-2 outline-none"
      />
    </div>

    <div className="application-input flex flex-col gap-2 mb-5">
      <label htmlFor="last_name" className="text-gray-900 text-sm">Last Name</label>
      <input
        type="text"
        placeholder="Last Name"
        id="last_name"
        disabled
        value={personalInformation?.lastName}
        className="h-10 border border-gray-300 rounded-md px-2 outline-none"
      />
    </div>

    <div className="application-input flex flex-col gap-2 mb-5">
      <label htmlFor="email" className="text-gray-900 text-sm">Email</label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        disabled
        value={personalInformation?.email}
        className="h-10 border border-gray-300 rounded-md px-2 outline-none"
      />
    </div>

    <div className="application-input flex flex-col gap-2 mb-5">
      <label htmlFor="citystate" className="text-gray-900 text-sm">
        City, State
      </label>
      <input
        type="text"
        placeholder="City and State"
        id="citystate"
        disabled
        value={
          personalInformation.currentAddress.city +
          (personalInformation.currentAddress.state
            ? ", " + personalInformation.currentAddress.state
            : "")
        }
        className="h-10 border border-gray-300 rounded-md px-2 outline-none"
      />
    </div>

    <div className="application-input flex flex-col gap-2 mb-5">
      <label htmlFor="country" className="text-gray-900 text-sm">
        Country
      </label>
      <input
        type="text"
        placeholder="Country"
        id="country"
        disabled
        value={personalInformation?.currentAddress?.country}
        className="h-10 border border-gray-300 rounded-md px-2 outline-none"
      />
    </div>

    <div className="phone flex flex-col gap-2 mb-5">
      <label htmlFor="phone" className="text-gray-900 text-sm">Phone</label>
      <PhoneInput
        className="phone-input border border-gray-300 rounded-md"
        country={"bd"}
        value={phone}
        inputProps={{
          name: "phone",
          required: true,
          placeholder: "Enter your phone number with country code",
        }}
      />
    </div>
  </div>
);

export default ContactInformation;
