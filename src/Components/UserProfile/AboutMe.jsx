"use client"
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../../Contexts/UserContext";
import UserImage from "@/assets/default-user.jpg";
import { FaTrashAlt } from 'react-icons/fa';

const AboutMe = () => {
  const { userData, profile, setProfile } = useUserContext();
  const [avatar, setAvatar] = useState(null);
  const [selectedAvatar, selectAvatar] = useState(null);
  const [first_name, setFirstName] = useState(" ");
  const [last_name, setLastName] = useState(" ");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");
  const [currentAddress, setCurrentAddress] = useState({
    city: "",
    state: "",
    country: "",
    postal_code: ""
  });
  const [permanentAddress, setPermanentAddress] = useState({
    city: "",
    state: "",
    country: "",
    postal_code: ""
  });
  const [mediaLinks, setMediaLinks] = useState([]);

  const handleUpdateUserProfile = async (event) => {
    event.preventDefault();
    const updateUserProfile = new FormData();
    updateUserProfile.append("avatar", selectedAvatar);
    updateUserProfile.append("current_city", currentAddress.city);
    updateUserProfile.append("current_state", currentAddress.state);
    updateUserProfile.append("current_country", currentAddress.country);
    updateUserProfile.append("current_postal_code", currentAddress.postal_code);
    updateUserProfile.append("permanent_city", permanentAddress.city);
    updateUserProfile.append("permanent_state", permanentAddress.state);
    updateUserProfile.append("permanent_country", permanentAddress.country);
    updateUserProfile.append("permanent_postal_code", permanentAddress.postal_code);
    updateUserProfile.append("gender", gender);
    updateUserProfile.append("marital_status", maritalStatus);
    updateUserProfile.append("date_of_birth", dateOfBirth);
    updateUserProfile.append("nationality", nationality);
    updateUserProfile.append("religion", religion);
    updateUserProfile.append("_method", "PUT");

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
    setAvatar(profile?.avatar);
    setFirstName(profile?.first_name);
    setLastName(profile?.last_name);
    setCurrentAddress({
      city: profile?.current_address?.city || "",
      state: profile?.current_address?.state || "",
      country: profile?.current_address?.country || "",
      postal_code: profile?.current_address?.postal_code || ""
    });
    setPermanentAddress({
      city: profile?.permanent_address?.city || "",
      state: profile?.permanent_address?.state || "",
      country: profile?.permanent_address?.country || "",
      postal_code: profile?.permanent_address?.postal_code || ""
    });
    setGender(profile?.gender || "");
    setMaritalStatus(profile?.marital_status || "");
    setDateOfBirth(profile?.date_of_birth || "");
    setNationality(profile?.nationality || "");
    setReligion(profile?.religion || "");
  }, [profile]);

  useEffect(() => {
    if (selectedAvatar) {
      setAvatar(URL.createObjectURL(selectedAvatar));
    }
  }, [selectedAvatar]);

  const handleFileChange = (event) => {
    selectAvatar(event.target.files[0]);
  };

  const handleChange = (field, value, addressType) => {
    switch (addressType) {
      case "current":
        setCurrentAddress((prevAddress) => ({
          ...prevAddress,
          [field]: value
        }));
        break;
      case "permanent":
        setPermanentAddress((prevAddress) => ({
          ...prevAddress,
          [field]: value
        }));
        break;
      default:
        break;
    }
  };

  const handleMediaLinkChange = (index, field, value) => {
    const updatedMediaLinks = [...mediaLinks];
    updatedMediaLinks[index][field] = value;
    setMediaLinks(updatedMediaLinks);
  };

  const handleDeleteMediaLink = (index) => {
    const updatedMediaLinks = [...mediaLinks];
    updatedMediaLinks.splice(index, 1);
    setMediaLinks(updatedMediaLinks);
  };

  const handleAddMediaLink = () => {
    setMediaLinks([...mediaLinks, { name: "", url: "" }]);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2 style={{fontSize: '20px', marginBottom: '15px'}}>Personal Information</h2>
      <form onSubmit={handleUpdateUserProfile} style={{display: 'grid', gap: '20px' , gridTemplateColumns : '1fr 1fr'}}>
        <div style={{display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'center' ,gridColumn: 'span 2'}}>
          <div style={{position: "relative", display: "inline-block" }}>
            <img
              src={avatar ? avatar : UserImage.src}
              alt="Avatar"
              style={{width: "150px", height: "150px", borderRadius: "50%"}}
            />

            <div
              style={{
                position: "absolute",
                bottom: "15px",
                right: "40px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <label htmlFor="avatar-upload">
                <span style={{textDecoration: "underline"}}>Upload</span>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{display: "none"}}
              />
            </div>
          </div>
          <div>
            <h4 suppressHydrationWarning={true}>{profile?.email}</h4>
            <p>{profile?.user_type}</p>
          </div>
        </div>
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="first_name" style={{display : 'block' , marginBottom : '10px'}}>First Name</label>
          <input
            type="text"
            placeholder="Your First Name"
            id="first_name"
            name="firstName"
            value={first_name || " "}
            onChange={(e) => setFirstName(e.target.value)}
            style={{height: '45px', width : '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
          />
        </div>
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="last_name" style={{display : 'block' , marginBottom : '10px'}}>Last Name</label>
          <input
            type="text"
            placeholder="Your Last Name"
            id="last_name"
            name="lastName"
            value={last_name || " "}
            onChange={(e) => setLastName(e.target.value)}
            style={{height: '45px', width : '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
          />
        </div>
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="gender" style={{display : 'block' , marginBottom : '10px'}}>Gender</label>
          <select
            id="gender"
            value={gender || ""}
            onChange={(e) => setGender(e.target.value)}
            style={{height: '45px', width : '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="maritalStatus" style={{display : 'block' , marginBottom : '10px'}}>Marital Status</label>
          <select
            id="maritalStatus"
            value={maritalStatus || ""}
            onChange={(e) => setMaritalStatus(e.target.value)}
            style={{height: '45px', width : '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
          >
            <option value="" style={{display : 'block' , marginBottom : '10px'}}>Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="dateOfBirth" style={{display : 'block' , marginBottom : '10px'}}>Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth || ""}
            onChange={(e) => setDateOfBirth(e.target.value)}
            style={{height: '45px', width : '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
          />
        </div>
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="nationality" style={{display : 'block' , marginBottom : '10px'}}>Nationality</label>
          <input
            type="text"
            placeholder="Nationality"
            id="nationality"
            value={nationality || ""}
            onChange={(e) => setNationality(e.target.value)}
            style={{height: '45px', width : '80%', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
          />
        </div>
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="religion" style={{display : 'block' , marginBottom : '10px'}}>Religion</label>
          <input
            type="text"
            placeholder="Religion"
            id="religion"
            value={religion || ""}
            onChange={(e) => setReligion(e.target.value)}
            style={{height: '45px',width : '80%',  padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
          />
        </div>
        <div style={{gridColumn : 'span 2'}}>
          <h3 style={{marginBottom: '20px', fontSize: '20px'}}>Media Links</h3>
          {mediaLinks.map((link, index) => (
            <div className="media-link" key={index}>
              <div style={{marginBottom: '10px'}}>
                <label htmlFor="" style={{display : 'block' , paddingBottom : '5px'}}>Name</label>
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => handleMediaLinkChange(index, "name", e.target.value)}
                  placeholder ='Linkdin'
                  style={{height: '45px', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px', outline: 'none'}}
                />
              </div>
              <div style={{marginBottom: '10px'}}>
                <label htmlFor="" style={{display : 'block' , paddingBottom : '5px'}}>URL</label>
                <input
                  type="text"
                  value={link.url}
                  placeholder="linkedin.com/in/me"
                  onChange={(e) => handleMediaLinkChange(index, "url", e.target.value)}
                  style={{height: '45px', padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px' , outline: 'none'}}
                />
              </div>
              <div style={{display : 'flex' , flexDirection : 'row' , justifyContent : 'center', alignItems : 'center'}}>
                <FaTrashAlt
                  style={{cursor: "pointer", color: "red"}}
                  onClick={() => handleDeleteMediaLink(index)}
                />
              </div>
            </div>
          ))}
          {mediaLinks.length==0&& <div style={{fontSize : '18px', fontWeight: 'bold', margin : '0px 0px 20px 0px'}}>Please add Media links</div>}
          <button type="button" onClick={handleAddMediaLink} style={{background: '#3498DB', color: '#fff', width: '70px', height: '30px', borderRadius: '5px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: '.3s', marginBottom: '20px'}}>Add </button>
        </div>
        <div style={{gridColumn : 'span 2',display : 'grid' , gridTemplateColumns : '1fr 1fr'}}>
          <div style={{marginBottom: '10px'}}>
            <h3 style={{marginBottom: '20px', fontSize: '20px'}}>Current Address</h3>
            <div style={{marginBottom: '10px'}}>
              <label htmlFor="city" style={{display : 'block' , marginBottom : '10px'}}>City</label>
              <input
                type="text"
                value={currentAddress.city}
                onChange={(e) => handleChange("city", e.target.value, "current")}
                style={{height: '45px',width : '90%',  padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <label htmlFor="state" style={{display : 'block' , marginBottom : '10px'}}>State</label>
              <input
                type="text"
                value={currentAddress.state}
                onChange={(e) => handleChange("state", e.target.value, "current")}
                style={{height: '45px',width : '90%',  padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <label htmlFor="country" style={{display : 'block' , marginBottom : '10px'}}>Country</label>
              <input
                type="text"
                value={currentAddress.country}
                onChange={(e) => handleChange("country", e.target.value, "current")}
                style={{height: '45px',width : '90%',  padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <label htmlFor="postalCode" style={{display : 'block' , marginBottom : '10px'}}>Postal Code</label>
              <input
                type="number"
                value={currentAddress.postal_code}
                onChange={(e) => handleChange("postal_code", e.target.value, "current")}
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
          <div style={{marginBottom: '10px'}}>
            <h3 style={{marginBottom: '20px', fontSize: '20px'}}>Permanent Address</h3>
            <div style={{marginBottom: '10px'}}>
              <label htmlFor="city" style={{display : 'block' , marginBottom : '10px'}}>City</label>
              <input
                type="text"
                value={permanentAddress.city}
                onChange={(e) => handleChange("city", e.target.value, "permanent")}
                style={{height: '45px',width : '90%',  padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <label htmlFor="state" style={{display : 'block' , marginBottom : '10px'}}>State</label>
              <input
                type="text"
                value={permanentAddress.state}
                onChange={(e) => handleChange("state", e.target.value, "permanent")}
                style={{height: '45px',width : '90%',  padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <label htmlFor="country" style={{display : 'block' , marginBottom : '10px'}}>Country</label>
              <input
                type="text"
                value={permanentAddress.country}
                onChange={(e) => handleChange("country", e.target.value, "permanent")}
                style={{height: '45px',width : '90%',  padding: '0 10px', fontSize: '17px', border: '1px solid #80808057', borderRadius: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <label htmlFor="postalCode" style={{display : 'block' , marginBottom : '10px'}}>Postal Code</label>
              <input
                type="number"
                value={permanentAddress.postal_code}
                onChange={(e) => handleChange("postal_code", e.target.value, "permanent")}
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
          <button type="submit" style={{ background: "#3498DB", color: "#fff", width: "120px", height: "40px", borderRadius: "5px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: ".3s" }}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default AboutMe;
