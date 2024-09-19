import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { Edit } from 'lucide-react';

const SavedInfo = ({ personalInfo, onEdit }) => {
  const socialIcons = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    linkedin: FaLinkedin,
    github: FaGithub,
    instagram: FaInstagram,
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Saved Personal Information</h2>
      
      <div className="flex items-center mb-6">
        {personalInfo.cv_profile_image ? (
          <img 
            src={personalInfo.cv_profile_image} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 p-1 mr-6"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mr-6">
            <span className="text-gray-500 text-4xl text-center">No Image</span>
          </div>
        )}
        <h3 className="text-2xl font-semibold text-gray-800">{`${personalInfo.firstName} ${personalInfo.lastName}`}</h3>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <InfoItem label="Email" value={personalInfo.email} />
        <InfoItem label="Phone" value={personalInfo.phone} />
        <InfoItem label="Gender" value={personalInfo.gender} />
        <InfoItem label="Marital Status" value={personalInfo.maritalStatus} />
        <InfoItem label="Date of Birth" value={personalInfo.dateOfBirth} />
        <InfoItem label="Nationality" value={personalInfo.nationality} />
        <InfoItem label="Religion" value={personalInfo.religion} />
        <InfoItem label="Present Address" value={personalInfo.presentAddress?.address} />
        <InfoItem label="Permanent Address" value={personalInfo.permanentAddress?.address} />
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Media Links</h3>
        <div className="flex flex-wrap gap-4">
          {personalInfo.mediaLinks?.map((link, index) => {
            const Icon = socialIcons[link.name.toLowerCase()] || FaGithub;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-full transition duration-200"
              >
                <Icon className="text-xl" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
      <button
        onClick={onEdit}
        className="mt-6 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
      >
        {/* Edit Information */}
        <Edit size={18} className="mr-2" /> Edit Qualifications
      </button>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="text-sm font-medium text-gray-500 mb-1">{label}</h4>
    <p className="text-gray-800">{value || 'Not provided'}</p>
  </div>
);

export default SavedInfo;