import React from 'react';
import { Edit } from 'lucide-react';

const SavedQualifications = ({ qualifications, onEdit }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Saved Qualifications</h2>
      
      {Object.entries(qualifications).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 capitalize">{category}</h3>
          {items.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md mb-3">
              {Object.entries(item).map(([key, value]) => (
                <QualificationItem key={key} label={key} value={value} />
              ))}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={onEdit}
        className="mt-6 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
      >
        <Edit size={18} className="mr-2" /> Edit Qualifications
      </button>
    </div>
  );
};

const QualificationItem = ({ label, value }) => (
  <div className="mb-2">
    <span className="font-medium text-gray-600 capitalize">{label}: </span>
    <span className="text-gray-800">{value || 'Not provided'}</span>
  </div>
);

export default SavedQualifications;