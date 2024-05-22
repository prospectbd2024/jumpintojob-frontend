"use client"
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../../Contexts/UserContext";
import UserImage from "@/assets/default-user.jpg";
import { FaTrashAlt } from 'react-icons/fa';
import { useUserProfileContext } from "@/Contexts/UserProfileContext";

const AboutMe = () => {

  const { userData } = useUserContext();

  const { profileData, setProfileData ,avatar, setAvatar,selectedAvatar, selectAvatar } = useUserProfileContext();




  const handleUpdateUserProfile = async (event) => {
    event.preventDefault();

    const updateUserProfile = {
      ...profileData,
      "avata": selectedAvatar,
      "_method": "PUT"
    }

    const userProfileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/update`,
      {
        method: "POST",
        headers: {
          "Conte-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${userData?.data?.access_token}`,
        },
        body: updateUserProfile,
      }
    );

    const updatedData = await userProfileResponse.json();
    if (updatedData) {
      Swal.fire({
        title: "Update",
        text: "Profile saved successfully!",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          title: "swal-title",
          text: "swal-text",
          confirmButton: "swal-confirm-button",
        },
      });

      setProfile(updatedData?.user);
    } else {
      console.log("Something is wrong with updating your data", updatedData);
    }
  };


  useEffect(() => {
    if (selectedAvatar) {
      setAvatar(URL.createObjectURL(selectedAvatar));
    }
  }, [selectedAvatar]);

  const handleFileChange = (event) => {
    selectAvatar(event.target.files[0]);
  };

  const handleChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMediaLinkChange = (index, field, value) => {
    const updatedMediaLinks = [...profileData.mediaLinks];
    updatedMediaLinks[index][field] = value;
    setProfileData({ ...profileData, mediaLinks: updatedMediaLinks })
  };

  const handleDeleteMediaLink = (index) => {
    const updatedMediaLinks = [...profileData.mediaLinks];
    updatedMediaLinks.splice(index, 1);
    setProfileData({ ...profileData, mediaLinks: updatedMediaLinks })
  };

  const handleAddMediaLink = () => {
    setProfileData({ ...profileData, mediaLinks: [...profileData.mediaLinks, { name: "", url: "" }] })
  };
  const handleAddressChange = (addressType, field, value) => {
    console.log(value);
    setProfileData((prevData) => ({
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
      <form onSubmit={handleUpdateUserProfile} style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'center', gridColumn: 'span 2' }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={avatar ? avatar : UserImage.src}
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
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div>
            <h4 suppressHydrationWarning={true}>{profile?.email}</h4>
            <p>{profile?.user_type}</p>
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="first_name" style={{ display: 'block', marginBottom: '10px' }}>First Name</label>
          <input
            type="text"
            placeholder="Your First Name"
            id="first_name"
            name="firstName"
            value={profileData.first_name || " "}
            onChange={(e) => handleChange('first_name', e.target.value)}
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
            value={profileData.last_name || " "}
            onChange={(e) => handleChange('last_name', e.target.value)}
            style={{ height: '45px', width: '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="gender" style={{ display: 'block', marginBottom: '10px' }}>Gender</label>
          <select
            id="gender"
            value={profileData.gender || ""}
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
            value={profileData.maritalStatus || ""}
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
            value={profileData.dateOfBirth || ""}
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
            value={profileData.nationality || ""}
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
            value={profileData.religion || ""}
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
          {profileData?.mediaLinks.map((link, index) => (
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
          {profileData?.mediaLinks.length == 0 && <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '0px 0px 20px 0px' }}>Please add Media links</div>}
          <button type="button" onClick={handleAddMediaLink} style={{ background: 'var(--primary-color)', color: '#fff', width: '70px', height: '30px', borderRadius: '5px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: '.3s', marginBottom: '20px' }}>Add </button>
        </div>
        <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Current Address</h3>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="city" style={{ display: 'block', marginBottom: '10px' }}>City</label>
              <input
                type="text"
                value={profileData.currentAddress?.city}
                onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="state" style={{ display: 'block', marginBottom: '10px' }}>State</label>
              <input
                type="text"
                value={profileData.currentAddress?.state}
                onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="country" style={{ display: 'block', marginBottom: '10px' }}>Country</label>
              <input
                type="text"
                value={profileData.currentAddress?.country}
                onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="postalCode" style={{ display: 'block', marginBottom: '10px' }}>Postal Code</label>
              <input
                type="number"
                value={profileData.currentAddress?.postal_code}
                onChange={(e) => handleAddressChange('currentAddress', 'postal_code', e.target.value)}
                style={{
                  height: '45px',
                  width: '90%',
                  padding: '0 10px',
                  fontSize: '17px',
                  border: '1px solid #80808057',
                  borderRadius: '5px',
                  '-moz-appearance': 'textfield', /* Hide increase/decrease buttons on Firefox */
                  '::-webkit-inner-spin-button': 'none', /* Hide increase/decrease buttons on Chrome and Safari */
                  '::-webkit-outer-spin-button': 'none', /* Hide increase/decrease buttons on Chrome and Safari */
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
                value={profileData.permanentAddress.city}
                onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="state" style={{ display: 'block', marginBottom: '10px' }}>State</label>
              <input
                type="text"
                value={profileData.permanentAddress.state}
                onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="country" style={{ display: 'block', marginBottom: '10px' }}>Country</label>
              <input
                type="text"
                value={profileData.permanentAddress.country}
                onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)}
                style={{ height: '45px', width: '90%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="postalCode" style={{ display: 'block', marginBottom: '10px' }}>Postal Code</label>
              <input
                type="number"
                value={profileData.permanentAddress.postal_code}
                onChange={(e) => handleAddressChange('permanentAddress', 'postal_code', e.target.value)}
                style={{
                  height: '45px',
                  width: '90%',
                  padding: '0 10px',
                  fontSize: '17px',
                  border: '1px solid #80808057',
                  borderRadius: '5px',
                  '-moz-appearance': 'textfield', /* Hide increase/decrease buttons on Firefox */
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ gridColumn: "span 2", textAlign: "right" }}>
          <button type="submit" style={{ background: "var(--primary-color)", color: "#fff", width: "120px", height: "40px", borderRadius: "5px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: ".3s" }}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default AboutMe;
