import React, { useState ,useEffect} from "react";
import {FaTrashAlt}  from 'react-icons/fa'
function HeadingFields({ props }) {
  
  const { personalInformation, SetPersonalInformation } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (field, value) => {
    SetPersonalInformation((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
  // useEffect(() => {
  //    SetPersonalInformation(prev=>({...prev, cv_profile_image : selectedImage}))
  // }, [selectedImage])
  


  const handleMediaLinkChange = (index, field, value) => {
    console.log(personalInformation.mediaLinks);
    const updatedMediaLinks = [...personalInformation.mediaLinks];
    updatedMediaLinks[index][field] = value;
    SetPersonalInformation({...personalInformation, mediaLinks : updatedMediaLinks })
  };

  const handleDeleteMediaLink = (index) => {
    const updatedMediaLinks = [...personalInformation.mediaLinks];
    updatedMediaLinks.splice(index, 1);
    SetPersonalInformation({...personalInformation, mediaLinks : updatedMediaLinks })
  };

  const handleAddMediaLink = () => {
    // console.log(personalInformation);
    SetPersonalInformation(  { ...personalInformation   ,  mediaLinks:     [ ...personalInformation?.mediaLinks, { name: "", url: "" }]});
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
    const file = event.target.files[0];
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      SetPersonalInformation((prevData) => ({
        ...prevData,
        cv_profile_image: selectedImage,
      }));
    }
  }, [selectedImage, SetPersonalInformation]);
  return (
    <div className={`resume-heading-content  'resume-heading-content-yesimg' : 'resume-heading-content-noimg'`}>
      {
      // templateType == 'cv' &&

      }
      <div   className="heading-form">
      <div className="dp">

      <div className="resume-profile-image">
      <input type="file" id="profileImage" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Profile Preview" />}
      <label htmlFor="profileImage" className="custom-file-upload">
        Select Image
      </label>
    </div>
      </div>
        <h3>Personal Information</h3>
        <div className="heading-form-main">
          <div className='resume-input-field'>
            <label htmlFor="title"></label>
            <input type="text" placeholder='Title: DevOps engineer' id="title" value={personalInformation.title} onChange={(e) => handleChange('title', e.target.value)}  onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="firstname"></label>
            <input type="text" placeholder='First Name' id="firstname" value={personalInformation.firstName} onChange={(e) => handleChange('firstName', e.target.value)}  onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="lastname"></label>
            <input type="text" placeholder='Last Name' id="lastname" value={personalInformation.lastName} onChange={(e) => handleChange('lastName', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="email"></label>
            <input type="text" placeholder='Email' id="email" value={personalInformation.email} onChange={(e) => handleChange('email', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="phone"></label>
            <input type="text" placeholder='Phone' id="phone" value={personalInformation.phone} onChange={(e) => handleChange('phone', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="dob"></label>
            <input type="date" id="dob" value={personalInformation.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
          </div>
          <div className='resume-input-field' >
          <label htmlFor="gender"></label>
          <select id="gender"  value={personalInformation.gender} onChange={(e) => handleChange('gender', e.target.value)} onFocus={handleFocus} onBlur={handleBlur}>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <hr  />
        </div>

          <div className='resume-input-field'>
            <label htmlFor="nationality"></label>
            <input type="text" placeholder='Nationality' id="nationality" value={personalInformation.nationality} onChange={(e) => handleChange('nationality', e.target.value)}onFocus={handleFocus} onBlur={handleBlur}  />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="religion"></label>
            <input type="text" placeholder='Religion' id="religion" value={personalInformation.religion} onChange={(e) => handleChange('religion', e.target.value)}onFocus={handleFocus} onBlur={handleBlur}  />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="maritalStatus"></label>
            <input type="text" placeholder='Marital Status' id="maritalStatus" value={personalInformation.maritalStatus} onChange={(e) => handleChange('maritalStatus', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
        <div className='resume-input-field media-links'>
            <h3>Media Links</h3>
          {/* Media Links */}
          {personalInformation.mediaLinks?.map((link, index) => (
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
          <h4>SUMMARY</h4>
          <textarea name="summary" id="summary" cols="30" rows="10" placeholder='Write your career summary' value={personalInformation.summary} onChange={(e) => handleChange('summary', e.target.value)}onFocus={handleFocus} onBlur={handleBlur} ></textarea>
          <hr />
        </div>
        <div className="address-section">
          <div className='resume-input-field'>
            <label htmlFor="current-city"></label>
          <h3>Current Address</h3>
            <input type="text" placeholder='City' id="current-city" value={personalInformation.currentAddress?.city} onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="current-state"></label>
            <input type="text" placeholder='State or District' id="current-state" value={personalInformation.currentAddress?.state} onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="current-country"></label>
            <input type="text" placeholder='Country' id="current-country" value={personalInformation.currentAddress?.country} onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
        </div>
        <div className="address-section">
          <div className='resume-input-field'>
            <label htmlFor="permanent-city"></label>
          <h3>Permanent Address</h3>
            <input type="text" placeholder='City' id="permanent-city" value={personalInformation.permanentAddress?.city} onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="permanent-state"></label>
            <input type="text" placeholder='State or District' id="permanent-state" value={personalInformation.permanentAddress?.state} onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
          <div className='resume-input-field'>
            <label htmlFor="permanent-country"></label>
            <input type="text" placeholder='Country' id="permanent-country" value={personalInformation.permanentAddress?.country} onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadingFields;
