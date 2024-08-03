// MediaLinks.js
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
    SetPersonalInformation(prev => ({ ...prev, mediaLinks: [...prev.mediaLinks, { name: "", url: "" }] }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Media Links</h3>
      {mediaLinks?.map((link, index) => (
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
  );
}

export default MediaLinks;