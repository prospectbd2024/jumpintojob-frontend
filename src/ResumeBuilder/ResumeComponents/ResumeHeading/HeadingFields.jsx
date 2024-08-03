import { useResumeContext } from "@/Contexts/ResumeContext";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import Cropper from 'react-easy-crop';

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
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <input type="file" id="profileImage" onChange={handleImageChange} ref={fileInputRef} className="hidden" />

          {(imagePreview || personalInformation.cv_profile_image) && !showCropper ? (
            <img src={personalInformation.cv_profile_image ?? imagePreview} alt="Profile Preview" className="w-40 h-40 rounded-full object-cover border-2 border-gray-300" />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          <label htmlFor="profileImage" className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition duration-300">
            Select Image
          </label>
          <h3 className="text-xl font-semibold">Personal Information</h3>
        </div>

        {showCropper && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl">
              <Cropper
                image={imagePreview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <div className="mt-4 flex justify-between items-center">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-1/2"
                />
                <div>
                  <button onClick={handleCropSave} className="px-4 py-2 bg-green-600 text-white rounded mr-2 hover:bg-green-700 transition duration-300">Save</button>
                  <button onClick={() => setShowCropper(false)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <InputField
              id="title"
              label="Title"
              value={personalInformation.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
            <InputField
              id="firstname"
              label="First Name"
              value={personalInformation.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            <InputField
              id="lastname"
              label="Last Name"
              value={personalInformation.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
            <InputField
              id="email"
              label="Email"
              value={personalInformation.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <InputField
              id="phone"
              label="Phone"
              value={personalInformation.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <InputField
              id="dob"
              label="Date of Birth"
              type="date"
              value={personalInformation.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            />
            <select
              id="gender"
              value={personalInformation.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            <InputField
              id="nationality"
              label="Nationality"
              value={personalInformation.nationality}
              onChange={(e) => handleChange('nationality', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Address</h3>
            <InputField
              id="current-city"
              label="City"
              value={personalInformation.currentAddress?.city}
              onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)}
            />
            <InputField
              id="current-state"
              label="State or District"
              value={personalInformation.currentAddress?.state}
              onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)}
            />
            <InputField
              id="current-country"
              label="Country"
              value={personalInformation.currentAddress?.country}
              onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Permanent Address</h3>
            <InputField
              id="permanent-city"
              label="City"
              value={personalInformation.permanentAddress?.city}
              onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
            />
            <InputField
              id="permanent-state"
              label="State or District"
              value={personalInformation.permanentAddress?.state}
              onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
            />
            <InputField
              id="permanent-country"
              label="Country"
              value={personalInformation.permanentAddress?.country}
              onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">SUMMARY</h4>
          <textarea
            name="summary"
            id="summary"
            rows="4"
            placeholder='Write your career summary'
            value={personalInformation.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Media Links</h3>
          {personalInformation.mediaLinks?.map((link, index) => (
            <div key={index} className="flex items-center space-x-4">
              <InputField
                value={link.name}
                placeholder='LinkedIn'
                onChange={(e) => handleMediaLinkChange(index, "name", e.target.value)}
              />
              <InputField
                value={link.url}
                placeholder="linkedin.com/me"
                onChange={(e) => handleMediaLinkChange(index, "url", e.target.value)}
              />
              <FaTrashAlt
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleDeleteMediaLink(index)}
              />
            </div>
          ))}
          <button
            onClick={handleAddMediaLink}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Add Media Link
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ id, label, value, onChange, type = "text" }) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute left-2 top-2 text-gray-500 transition-all duration-300 transform -translate-y-4 scale-75 opacity-0 peer-placeholder-shown:opacity-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:opacity-100 peer-focus:-translate-y-4 peer-focus:scale-75"
      >
        {label}
      </label>
    </div>
  );
}

export default HeadingFields;