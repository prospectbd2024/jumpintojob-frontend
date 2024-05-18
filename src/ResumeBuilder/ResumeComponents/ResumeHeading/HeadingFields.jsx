import React, { useState } from "react";
import {FaTrashAlt}  from 'react-icons/fa'
function HeadingFields({ props }) {
  
  const {profileData, setProfileData} = props;


  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddressChange = (addressType, field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [addressType]: {
        ...prevData[addressType],
        [field]: value
      }
    }));
  };

  const handleMediaLinkChange = (index, field, value) => {
    console.log(profileData.mediaLinks);
    const updatedMediaLinks = [...profileData.mediaLinks];
    updatedMediaLinks[index][field] = value;
    setProfileData({...profileData, mediaLinks : updatedMediaLinks })
  };

  const handleDeleteMediaLink = (index) => {
    const updatedMediaLinks = [...profileData.mediaLinks];
    updatedMediaLinks.splice(index, 1);
    setProfileData({...profileData, mediaLinks : updatedMediaLinks })
  };

  const handleAddMediaLink = () => {
    // console.log(profileData);
    setProfileData(  { ...profileData   ,  mediaLinks:     [ ...profileData?.mediaLinks, { name: "", url: "" }]});
  };
  const handleFocus=(event)=>{
    let element = event.target;
    element.classList.add('focused')
    let parentNode = element.parentNode;
    let hr = parentNode.querySelector('hr');
    hr.classList.add('focused')
    
  }
  const handleBlur=( event)=>{
    let element = event.target;
    element.classList.remove('focused')
    let parentNode = element.parentNode;
    let hr = parentNode.querySelector('hr');
    hr.classList.remove('focused')
  }
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className={`resume-heading-content  'resume-heading-content-yesimg' : 'resume-heading-content-noimg'`}>
      {
      // templateType == 'cv' &&

      }
      <div   className="heading-form">
          <div className="resume-profile-image">
               <label htmlFor="">PROFILE IMAGE</label>
              <input type="file" onChange={handleImageChange} />
          </div>
        <div className="heading-form-main">
       
         
          <div className='resume-input-field'>
            <label htmlFor="title">TITLE</label>
            <input type="text" placeholder='DevOps engineer' id="title" value={profileData.title} onChange={(e) => handleChange('title', e.target.value)}  onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="firstname">FIRST NAME</label>
            <input type="text" placeholder='David' id="firstname" value={profileData.firstName} onChange={(e) => handleChange('firstName', e.target.value)}  onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="lastname">LAST NAME</label>
            <input type="text" placeholder='Warner' id="lastname" value={profileData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="email">EMAIL</label>
            <input type="text" placeholder='Your email' id="email" value={profileData.email} onChange={(e) => handleChange('email', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="phone">PHONE</label>
            <input type="text" placeholder='Your phone' id="phone" value={profileData.phone} onChange={(e) => handleChange('phone', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="dob">DATE OF BIRTH</label>
            <input type="date" id="dob" value={profileData.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
          </div>
          <div className='resume-input-field' >
          <label htmlFor="gender">GENDER</label>
          <select id="gender"  value={profileData.gender} onChange={(e) => handleChange('gender', e.target.value)} onFocus={handleFocus} onBlur={handleBlur}>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <hr  />
        </div>

          <div className='resume-input-field'>
            <label htmlFor="nationality">NATIONALITY</label>
            <input type="text" placeholder='Nationality' id="nationality" value={profileData.nationality} onChange={(e) => handleChange('nationality', e.target.value)}onFocus={handleFocus} onBlur={handleBlur}  />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="religion">RELIGION</label>
            <input type="text" placeholder='Religion' id="religion" value={profileData.religion} onChange={(e) => handleChange('religion', e.target.value)}onFocus={handleFocus} onBlur={handleBlur}  />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="maritalStatus">MARITAL STATUS</label>
            <input type="text" placeholder='Marital Status' id="maritalStatus" value={profileData.maritalStatus} onChange={(e) => handleChange('maritalStatus', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
        <div className='resume-input-field media-links'>
            <label>Media Links</label>
          {/* Media Links */}
          {profileData.mediaLinks?.map((link, index) => (
            <div className="media-link" key={index}>
              <div className="media-link-name-container">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={link.name}
                  placeholder='LinkedIn'
                  onChange={(e) => handleMediaLinkChange(index, "name", e.target.value)}
                />
              </div>
              <div className="media-link-url-container">
              <label htmlFor="">URL</label>
                <input
                  type="text"
                  value={link.url}
                  placeholder="linkedin.com/me"
                  onChange={(e) => handleMediaLinkChange(index, "url", e.target.value)}
                />
              </div>
              <div className="delete-btn-container">
                <FaTrashAlt
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDeleteMediaLink(index)}
                />
              </div>
            </div>
          ))}
        <button onClick={handleAddMediaLink}>Add Media Link</button>
        </div>
        </div>
        {/* Button to add media links */}

        <div className='heading-textarea resume-input-field'>
          <label htmlFor="summary">SUMMARY</label>
          <textarea name="summary" id="summary" cols="30" rows="10" placeholder='Write your career summary' value={profileData.summary} onChange={(e) => handleChange('summary', e.target.value)}onFocus={handleFocus} onBlur={handleBlur} ></textarea>
          <hr />
        </div>
        <div className="address-section">
          <h3>Current Address</h3>
          <div className='resume-input-field'>
            <label htmlFor="current-city">CITY</label>
            <input type="text" placeholder='Portland' id="current-city" value={profileData.currentAddress?.city} onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="current-state">STATE OR DISTRICT</label>
            <input type="text" placeholder='Oregon' id="current-state" value={profileData.currentAddress?.state} onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="current-country">COUNTRY</label>
            <input type="text" placeholder='United States' id="current-country" value={profileData.currentAddress?.country} onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
        </div>
        <div className="address-section">
          <h3>Permanent Address</h3>
          <div className='resume-input-field'>
            <label htmlFor="permanent-city">CITY</label>
            <input type="text" placeholder='Portland' id="permanent-city" value={profileData.permanentAddress?.city} onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="permanent-state">STATE OR DISTRICT</label>
            <input type="text" placeholder='Oregon' id="permanent-state" value={profileData.permanentAddress?.state} onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="permanent-country">COUNTRY</label>
            <input type="text" placeholder='United States' id="permanent-country" value={profileData.permanentAddress?.country} onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadingFields;
