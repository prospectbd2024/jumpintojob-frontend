"use client"
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../../Contexts/UserContext";
import UserImage from "@/assets/default-user.jpg";
import { FaTrashAlt } from 'react-icons/fa';
import { useUserProfileContext } from "@/Contexts/UserProfileContext";
import SaveProfileButton from "../Buttons/SaveProfileButton";

const AboutMe = () => {

  const { userData } = useUserContext();

  const { personalInformation, SetPersonalInformation ,avatar, setAvatar,selectedAvatar, selectAvatar } = useUserProfileContext();

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
    SetPersonalInformation({ ...personalInformation, mediaLinks: updatedMediaLinks })
  };

  const handleDeleteMediaLink = (index) => {
    const updatedMediaLinks = [...personalInformation.mediaLinks];
    updatedMediaLinks.splice(index, 1);
    SetPersonalInformation({ ...personalInformation, mediaLinks: updatedMediaLinks })
  };

  const handleAddMediaLink = () => {
    SetPersonalInformation({ ...personalInformation, mediaLinks: [...personalInformation.mediaLinks, { name: "", url: "" }] })
  };
  const handleAddressChange = (addressType, field, value) => {
    SetPersonalInformation((prevData) => ({
      ...prevData,
      [addressType]: {
        ...prevData[addressType],
        [field]: value
      }
    }));
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Personal Information</h2>
      <div  style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'center', gridColumn: 'span 2' }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={personalInformation.avatar ??  UserImage.src}
              alt="Avatar"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />

            <div
              style={{
                position: 'absolute',
                width: '110px',
                textAlign: 'center',
                right: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <label htmlFor="avatar-upload">
                <span style={{ textDecoration: "none" }}>Upload</span>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                value={undefined}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          {/* <div>
            <h2>{personalInformation?.firstName} {personalInformation?.lastName}</h2>
            <h4 >{personalInformation?.email}</h4>
            <p>{personalInformation?.user_type}</p>
          </div> */}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="first_name" style={{ display: 'block', marginBottom: '10px' }}>First Name</label>
          <input
            type="text"
            placeholder="Your First Name"
            id="first_name"
            name="firstName"
            value={personalInformation.firstName || " "}
            onChange={(e) => handleChange('firstName', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="last_name" style={{ display: 'block', marginBottom: '10px' }}>Last Name</label>
          <input
            type="text"
            placeholder="Your Last Name"
            id="last_name"
            name="lastName"
            value={personalInformation.lastName || " "}
            onChange={(e) => handleChange('lastName', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '10px' }}>Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            value={personalInformation.email || " "}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '10px' }}>Phone Number</label>
          <input
            type="text"
            placeholder="Your Phone Number"
            id="phone"
            name="phone"
            value={personalInformation.phone || " "}
            onChange={(e) => handleChange('phone', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="gender" style={{ display: 'block', marginBottom: '10px' }}>Gender</label>
          <select
            id="gender"
            value={personalInformation.gender || ""}
            onChange={(e) => handleChange('gender', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="maritalStatus" style={{ display: 'block', marginBottom: '10px' }}>Marital Status</label>
          <select
            id="maritalStatus"
            value={personalInformation.maritalStatus || ""}
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          >
            <option value="" style={{ display: 'block', marginBottom: '10px' }}>Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="dateOfBirth" style={{ display: 'block', marginBottom: '10px' }}>Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            value={personalInformation.dateOfBirth || ""}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="nationality" style={{ display: 'block', marginBottom: '10px' }}>Nationality</label>
          <input
            type="text"
            placeholder="Nationality"
            id="nationality"
            value={personalInformation.nationality || ""}
            onChange={(e) => handleChange('nationality', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', }}>
          <label htmlFor="religion" style={{ display: 'block', marginBottom: '10px' }}>Religion</label>
          <input
            type="text"
            placeholder="Religion"
            id="religion"
            value={personalInformation.religion || ""}
            onChange={(e) => handleChange('religion', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          />
        </div>
        <div style={{
          gridColumn: 'span 2',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          marginBottom: '20px',
          flexBasis: '48%',
          position: 'relative'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>Media Links</h3>
          {personalInformation?.mediaLinks.map((link, index) => (
            <div className="media-link" key={index} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="" style={{ display: 'block', paddingBottom: '5px' }}>Name</label>
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => handleMediaLinkChange(index, "name", e.target.value)}
                  placeholder='Linkdin'
                  style={{
                    padding: '12px 9px',
                    outline: 'none',
                    fontSize: '1rem',
                    fontWeight: '400',
                    borderRadius: '5px',
                    border: '1px solid #a3a3a3',
                    background: 'transparent',
                    color: '#2c2c2c'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="" style={{ display: 'block', paddingBottom: '5px' }}>URL</label>
                <input
                  type="text"
                  value={link.url}
                  placeholder="linkedin.com/in/me"
                  onChange={(e) => handleMediaLinkChange(index, "url", e.target.value)}
                  style={{
                    padding: '12px 9px',
                    outline: 'none',
                    fontSize: '1rem',
                    fontWeight: '400',
                    borderRadius: '5px',
                    border: '1px solid #a3a3a3',
                    background: 'transparent',
                    color: '#2c2c2c'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <FaTrashAlt
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDeleteMediaLink(index)}
                />
              </div>
            </div>
          ))}
          {personalInformation?.mediaLinks.length == 0 && <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '0px 0px 20px 0px' }}>Please add Media links</div>}
          <button type="button" onClick={handleAddMediaLink} style={{ background: 'var(--primary-color)', color: '#fff', width: '70px', height: '30px', borderRadius: '5px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: '.3s', marginBottom: '20px' }}>Add </button>
        </div>
        <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Current Address</h3>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="city" style={{ display: 'block', marginBottom: '10px' }}>City</label>
              <input
                type="text"
                value={personalInformation.currentAddress?.city|| ""}
                onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="state" style={{ display: 'block', marginBottom: '10px' }}>State</label>
              <input
                type="text"
                value={personalInformation.currentAddress?.state|| ""}
                onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="country" style={{ display: 'block', marginBottom: '10px' }}>Country</label>
              <input
                type="text"
                value={personalInformation.currentAddress?.country|| ""}
                onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="postalCode" style={{ display: 'block', marginBottom: '10px' }}>Postal Code</label>
              <input
                type="number"
                value={personalInformation.currentAddress?.postalCode|| ""}
                onChange={(e) => handleAddressChange('currentAddress', 'postalCode', e.target.value)}
                style={{
                  height: '45px',
                  width: '90%',
                  padding: '0 10px',
                  fontSize: '17px',
                  border: '1px solid #80808057',
                  borderRadius: '5px',
                  'MozAppearance': 'textfield', /* Hide increase/decrease buttons on Firefox */
                  '::webkitInnerSpinButton': 'none', /* Hide increase/decrease buttons on Chrome and Safari */
                  '::WebkitOuterSpinButton': 'none', /* Hide increase/decrease buttons on Chrome and Safari */
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Permanent Address</h3>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="city" style={{ display: 'block', marginBottom: '10px' }}>City</label>
              <input
                type="text"
                value={personalInformation.permanentAddress.city|| ""}
                onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="state" style={{ display: 'block', marginBottom: '10px' }}>State</label>
              <input
                type="text"
                value={personalInformation.permanentAddress.state|| ""}
                onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="country" style={{ display: 'block', marginBottom: '10px' }}>Country</label>
              <input
                type="text"
                value={personalInformation.permanentAddress.country|| ""}
                onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="postalCode" style={{ display: 'block', marginBottom: '10px' }}>Postal Code</label>
              <input
                type="number"
                value={personalInformation.permanentAddress.postalCode|| ""}
                onChange={(e) => handleAddressChange('permanentAddress', 'postalCode', e.target.value)}
                style={{
                  height: '45px',
                  width: '90%',
                  padding: '0 10px',
                  fontSize: '17px',
                  border: '1px solid #80808057',
                  borderRadius: '5px',
                  'MozAppearance': 'textfield', /* Hide increase/decrease buttons on Firefox */
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ gridColumn: "span 2", textAlign: "right" }}>
          <SaveProfileButton onSave={()=>{console.log("saved");}}/>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
