import React, { useState, useCallback, useRef } from "react";
import Cropper from 'react-easy-crop';

function ProfileImage({ personalInformation, imagePreview, setImagePreview, setSelectedImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
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
    <div className="flex flex-col items-center space-y-4 relative">
      <input type="file" id="profileImage" onChange={handleImageChange} ref={fileInputRef} className="hidden" />

      {!showCropper && (
       <>
       {(imagePreview || personalInformation.cv_profile_image) ? (
         <img src={personalInformation.cv_profile_image ?? imagePreview} alt="Profile Preview" className="w-40 h-40 rounded-full object-cover border-2 border-gray-300 p-1" />
       ) : (
         <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="No Image" className="w-40 h-40 rounded-full object-cover border-2 border-gray-300 p-1" />
       )}
       <label htmlFor="profileImage" className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition duration-300">
         Select Image
       </label>
     </>
      )}

      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <div className="relative aspect-w-1 aspect-h-1 mb-4" style={{ height: '400px' }}>
              <Cropper
                image={imagePreview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="zoomRange" className="block text-sm font-medium text-gray-700 mb-1">
                Zoom: {zoom.toFixed(1)}x
              </label>
              <input
                id="zoomRange"
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setShowCropper(false)} 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleCropSave} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileImage;
