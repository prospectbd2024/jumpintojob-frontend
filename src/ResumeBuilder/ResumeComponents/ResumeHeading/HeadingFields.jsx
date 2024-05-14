import React, { useState } from "react";
import {FaTrashAlt}  from 'react-icons/fa'
function HeadingFields({  }) {

  const [isFocused,setFocus] = useState("")
  // Initial resume data state
  const initialResumeData = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentAddress: {
      city: "",
      state: "",
      country: ""
    },
    permanentAddress: {
      city: "",
      state: "",
      country: ""
    },
    dateOfBirth: "", // New field for date of birth
    gender: "", // New field for gender
    nationality: "", // New field for nationality
    religion: "", // New field for religion
    maritalStatus: "", // New field for marital status
    summary: ""
  };

  // State to handle resume data
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleChange = (field, value) => {
    setResumeData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddressChange = (addressType, field, value) => {
    setResumeData((prevData) => ({
      ...prevData,
      [addressType]: {
        ...prevData[addressType],
        [field]: value
      }
    }));
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
    setResumeData((prevData) => ({
      ...prevData,
      dateOfBirth: e.target.value,
    }));
  };
  const [mediaLinks,setMediaLinks] = useState([]);
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
  return (
    <div className={`resume-heading-content  'resume-heading-content-yesimg' : 'resume-heading-content-noimg'`}>
      {
      // templateType == 'cv' &&
      //   <div className="image-upload">
      //     {/* Image Upload Component */}
      //   </div>
      }
      <div   className="heading-form">
        <div className="heading-form-main">
          <div className='resume-input-field'>
            <label htmlFor="title">TITLE</label>
            <input type="text" placeholder='DevOps engineer' id="title" value={resumeData.title} onChange={(e) => handleChange('title', e.target.value)}  onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="firstname">FIRST NAME</label>
            <input type="text" placeholder='David' id="firstname" value={resumeData.firstName} onChange={(e) => handleChange('firstName', e.target.value)}  onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="lastname">LAST NAME</label>
            <input type="text" placeholder='Warner' id="lastname" value={resumeData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="email">EMAIL</label>
            <input type="text" placeholder='Your email' id="email" value={resumeData.email} onChange={(e) => handleChange('email', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="phone">PHONE</label>
            <input type="text" placeholder='Your phone' id="phone" value={resumeData.phone} onChange={(e) => handleChange('phone', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="dob">DATE OF BIRTH</label>
            <input type="date" id="dob" value={dateOfBirth} onChange={handleDateOfBirthChange} />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="gender">GENDER</label>
            <input type="text" placeholder='Gender' id="gender" value={resumeData.gender} onChange={(e) => handleChange('gender', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="nationality">NATIONALITY</label>
            <input type="text" placeholder='Nationality' id="nationality" value={resumeData.nationality} onChange={(e) => handleChange('nationality', e.target.value)}onFocus={handleFocus} onBlur={handleBlur}  />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="religion">RELIGION</label>
            <input type="text" placeholder='Religion' id="religion" value={resumeData.religion} onChange={(e) => handleChange('religion', e.target.value)}onFocus={handleFocus} onBlur={handleBlur}  />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="maritalStatus">MARITAL STATUS</label>
            <input type="text" placeholder='Marital Status' id="maritalStatus" value={resumeData.maritalStatus} onChange={(e) => handleChange('maritalStatus', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
        <div className='resume-input-field media-links'>
            <label>Media Links</label>
          {/* Media Links */}
          {mediaLinks.map((link, index) => (
            <div className="media-link" key={index}>
              <div className="media-link-name-container">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => handleMediaLinkChange(index, "name", e.target.value)}
                />
              </div>
              <div className="media-link-url-container">
              <label htmlFor="">URL</label>
                <input
                  type="text"
                  value={link.url}
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
          <textarea name="summary" id="summary" cols="30" rows="10" placeholder='Write your career summary' value={resumeData.summary} onChange={(e) => handleChange('summary', e.target.value)}onFocus={handleFocus} onBlur={handleBlur} ></textarea>
          <hr />
        </div>
        <div className="address-section">
          <h3>Current Address</h3>
          <div className='resume-input-field'>
            <label htmlFor="current-city">CITY</label>
            <input type="text" placeholder='Portland' id="current-city" value={resumeData.currentAddress.city} onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="current-state">STATE OR DISTRICT</label>
            <input type="text" placeholder='Oregon' id="current-state" value={resumeData.currentAddress.state} onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="current-country">COUNTRY</label>
            <input type="text" placeholder='United States' id="current-country" value={resumeData.currentAddress.country} onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
        </div>
        <div className="address-section">
          <h3>Permanent Address</h3>
          <div className='resume-input-field'>
            <label htmlFor="permanent-city">CITY</label>
            <input type="text" placeholder='Portland' id="permanent-city" value={resumeData.permanentAddress.city} onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="permanent-state">STATE OR DISTRICT</label>
            <input type="text" placeholder='Oregon' id="permanent-state" value={resumeData.permanentAddress.state} onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="permanent-country">COUNTRY</label>
            <input type="text" placeholder='United States' id="permanent-country" value={resumeData.permanentAddress.country} onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadingFields;
