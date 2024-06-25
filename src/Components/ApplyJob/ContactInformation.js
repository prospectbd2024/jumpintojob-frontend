// ContactInformation.jsx
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactInformation = ({ personalInformation, phone }) => (
  <div className="step-applicant-account-info">
    <h4>Review your contact information</h4>
    <div className="application-input">
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        placeholder="First Name"
        id="first_name"
        disabled
        value={personalInformation?.firstName}
      />
    </div>
    <div className="application-input">
      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        placeholder="Last Name"
        id="last_name"
        disabled
        value={personalInformation?.lastName}
      />
    </div>
    <div className="application-input">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        disabled
        value={personalInformation?.email}
      />
    </div>
    <div className="application-input">
      <label htmlFor="citystate">
        City, State <span> </span>
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
      />
    </div>
    <div className="application-input">
      <label htmlFor="country">
        Country <span> </span>
      </label>
      <input
        type="text"
        placeholder="Country"
        id="country"
        disabled
        value={personalInformation?.currentAddress?.country}
      />
    </div>
    <div className="phone">
      <label htmlFor="phone">Phone</label>
      <PhoneInput
        className="phone-input"
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
