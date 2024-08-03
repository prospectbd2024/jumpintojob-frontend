import { useResumeContext } from "@/Contexts/ResumeContext";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import Cropper from 'react-easy-crop';
import './ResumeHeading.css'
function HeadingFields({ props }) {
  const { personalInformation, SetPersonalInformation } = props;
  const { selectedImage, setSelectedImage, imagePreview, setImagePreview } = useResumeContext();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [tempFile, setTempFile] = useState(null);

  const fileInputRef = useRef(null);

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

  useEffect(() => {
    if (selectedImage) {
      SetPersonalInformation(prev => ({ ...prev, cv_profile_image: selectedImage }))
    }
  }, [selectedImage])

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
    SetPersonalInformation({ ...personalInformation, mediaLinks: [...personalInformation?.mediaLinks, { name: "", url: "" }] });
  };

  const handleFocus = (event) => {
    // Focus handling logic if needed
  }

  const handleBlur = (event) => {
    // Blur handling logic if needed
  }

  const handleImageChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setTempFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  }, [setImagePreview]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  const handleCropSave = useCallback(async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imagePreview, croppedAreaPixels);
      setSelectedImage(croppedImage);
      setShowCropper(false);
    }
  }, [croppedAreaPixels, imagePreview, setSelectedImage]);

  return (
    <div className="border border-gray-300 p-5 rounded-lg bg-white mb-5">
      <div className={`resume-heading-content`}>
        <div className="heading-form">
          <div className="dp">
            <div className="resume-profile-image">
              <input type="file" id="profileImage" onChange={handleImageChange} ref={fileInputRef} />

              {(imagePreview || personalInformation.cv_profile_image) && !showCropper ? (
                <img src={personalInformation.cv_profile_image ?? imagePreview} alt="Profile Preview" />
              ) : (
                <div className="empty-profile-image"></div>
              )}

              <label htmlFor="profileImage" className="custom-file-upload">
                Select Image
              </label>
              <h3>Personal Information</h3>
            </div>
          </div>

          {showCropper && (
            <div className="cropper-container">
              <Cropper
                image={imagePreview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <div className="cropper-controls">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(e.target.value)}
                  className="zoom-range"
                />
                <button onClick={handleCropSave} className="save-crop-btn">Save</button>
                <button onClick={() => setShowCropper(false)} className="cancel-crop-btn">Cancel</button>
              </div>
            </div>
          )}

          <div className="heading-form-main">
            <div className='resume-input-field input-container'>
              <input type="text" placeholder=" " id="title" value={personalInformation.title} onChange={(e) => handleChange('title', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
              <label htmlFor="title">Title</label>
              <hr />
            </div>
            <div className='resume-input-field input-container'>
              <input type="text" placeholder=" " id="firstname" value={personalInformation.firstName} onChange={(e) => handleChange('firstName', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
              <label htmlFor="firstname">First Name</label>
              <hr />
            </div>
            <div className='resume-input-field input-container'>
              <input type="text" placeholder=" " id="lastname" value={personalInformation.lastName} onChange={(e) => handleChange('lastName', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
              <label htmlFor="lastname">Last Name</label>
              <hr />
            </div>
            <div className='resume-input-field input-container'>
              <input type="text" placeholder=" " id="email" value={personalInformation.email} onChange={(e) => handleChange('email', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
              <label htmlFor="email">Email</label>
              <hr />
            </div>
            <div className='resume-input-field input-container'>
              <input type="text" placeholder=" " id="phone" value={personalInformation.phone} onChange={(e) => handleChange('phone', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
              <label htmlFor="phone">Phone</label>
              <hr />
            </div>
            <div className='resume-input-field input-container'>
              <input type="date" id="dob" value={personalInformation.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
            </div>
            <div className='resume-input-field input-container' >
              <select id="gender" value={personalInformation.gender} onChange={(e) => handleChange('gender', e.target.value)} onFocus={handleFocus} onBlur={handleBlur}>
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              <hr />
            </div>
            <div className='resume-input-field input-container'>
              <input type="text" placeholder=" " id="nationality" value={personalInformation.nationality} onChange={(e) => handleChange('nationality', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
              <label htmlFor="nationality"> Nationality</label>
              <hr />
            </div>
            <div className='resume-input-field input-container'>
              <input type="text" placeholder=" " id="religion" value={personalInformation.religion} onChange={(e) => handleChange('religion', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
              <label htmlFor="religion">Religion</label>
              <hr />
            </div>
            <div className='resume-input-field input-container'>
              <input type="text" placeholder=" " id="maritalStatus" value={personalInformation.maritalStatus} onChange={(e) => handleChange('maritalStatus', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
              <label htmlFor="maritalStatus">Marital Status</label>
              <hr />
            </div>
          </div>

          <div className="address-container">
            <div className="address-section">
              <h3>Current Address</h3>
              <div className='input-container resume-input-field'>
                <input type="text" placeholder=' ' id="current-city" value={personalInformation.currentAddress?.city} onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                <label htmlFor="current-city">City</label>
              </div>
              <div className='input-container resume-input-field'>
                <input type="text" placeholder=' ' id="current-state" value={personalInformation.currentAddress?.state} onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                <label htmlFor="current-state">State or District</label>
              </div>
              <div className='input-container resume-input-field'>
                <input type="text" placeholder=' ' id="current-country" value={personalInformation.currentAddress?.country} onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                <label htmlFor="current-country">Country</label>
              </div>
            </div>
            <div className="address-section">
              <h3>Permanent Address</h3>
              <div className='input-container resume-input-field'>
                <input type="text" placeholder=' ' id="permanent-city" value={personalInformation.permanentAddress?.city} onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                <label htmlFor="permanent-city">City</label>
              </div>
              <div className='input-container resume-input-field'>
                <input type="text" placeholder=' ' id="permanent-state" value={personalInformation.permanentAddress?.state} onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                <label htmlFor="permanent-state">State or District</label>
              </div>
              <div className='input-container resume-input-field'>
                <input type="text" placeholder=' ' id="permanent-country" value={personalInformation.permanentAddress?.country} onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                <label htmlFor="permanent-country">Country</label>
              </div>
            </div>
          </div>

          <div className='heading-textarea resume-input-field '>
            <h4>SUMMARY</h4>
            <textarea name="summary" id="summary" cols="30" rows="10" placeholder='Write your career summary' value={personalInformation.summary} onChange={(e) => handleChange('summary', e.target.value)} onFocus={handleFocus} onBlur={handleBlur}></textarea>
            <hr />
          </div>

          <div className='resume-input-field media-links'>
            <h3>Media Links</h3>
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
      </div>
    </div>
  );
}

export default HeadingFields;