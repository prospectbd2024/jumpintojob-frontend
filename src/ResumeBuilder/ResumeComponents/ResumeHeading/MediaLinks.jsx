import React from "react";
import { FaTrashAlt } from 'react-icons/fa';
import InputField from "./InputField";

function MediaLinks({ mediaLinks, SetPersonalInformation }) {
  const handleMediaLinkChange = (index, field, value) => {
    const updatedMediaLinks = [...mediaLinks];
    updatedMediaLinks[index][field] = value;
    SetPersonalInformation(prev => ({ ...prev, mediaLinks: updatedMediaLinks }));
  };

  const handleDeleteMediaLink = (index) => {
    const updatedMediaLinks = [...mediaLinks];
    updatedMediaLinks.splice(index, 1);
    SetPersonalInformation(prev => ({ ...prev, mediaLinks: updatedMediaLinks }));
  };

  const handleAddMediaLink = () => {
    SetPersonalInformation(prev => ({
      ...prev,
      mediaLinks: [...(prev.mediaLinks || []), { name: "", url: "" }]
    }));
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">Social Media Links</h3>
      {mediaLinks?.map((link, index) => (
        <div 
          key={index} 
          className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 md:space-x-4"
        >
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2 gap-2">
            <InputField
              value={link.name}
              label='Name'
              onChange={(e) => handleMediaLinkChange(index, "name", e.target.value)}
              className="flex-1"
            />
            <InputField
              value={link.url}
              label="link.com/me"
              onChange={(e) => handleMediaLinkChange(index, "url", e.target.value)}
              className="flex-1"
            />
            <FaTrashAlt
              className="text-red-500 cursor-pointer hover:text-red-700 text-xl sm:text-2xl md:text-3xl mt-2 sm:mt-0"
              onClick={() => handleDeleteMediaLink(index)}
            />
          </div>
        </div>
      ))}
      <button
        onClick={handleAddMediaLink}
        className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Add Media Link
      </button>
    </div>
  );
}

export default MediaLinks;
