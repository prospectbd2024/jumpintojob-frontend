'use client'
import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle, Save } from 'lucide-react';
import SavedQualifications from './Qualifications/SavedQualifications';

const Qualifications = () => {
  const [qualifications, setQualifications] = useState({
    education: [{ degree: '', institution: '', year: '' }],
    workExperience: [{ position: '', company: '', duration: '', responsibilities: '' }],
    skills: [{ name: '', proficiency: 'Beginner' }],
    languages: [{ name: '', proficiency: 'Basic' }],
    certifications: [{ name: '', issuer: '', year: '' }],
    projects: [{ name: '', description: '', technologies: '' }],
    awards: [{ name: '', issuer: '', year: '' }],
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('savedQualifications');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setQualifications(parsedData);
    }
  }, []);

  const handleChange = (category, index, field, value) => {
    setQualifications(prevState => ({
      ...prevState,
      [category]: prevState[category].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addField = (category) => {
    const emptyFields = {
      education: { degree: '', institution: '', year: '' },
      workExperience: { position: '', company: '', duration: '', responsibilities: '' },
      skills: { name: '', proficiency: 'Beginner' },
      languages: { name: '', proficiency: 'Basic' },
      certifications: { name: '', issuer: '', year: '' },
      projects: { name: '', description: '', technologies: '' },
      awards: { name: '', issuer: '', year: '' },
    };

    setQualifications(prevState => ({
      ...prevState,
      [category]: [...prevState[category], emptyFields[category]]
    }));
  };

  const removeField = (category, index) => {
    setQualifications(prevState => ({
      ...prevState,
      [category]: prevState[category].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    localStorage.setItem('savedQualifications', JSON.stringify(qualifications));
    setIsSaved(true);
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  const renderFields = (category, fields) => (
    <div className="space-y-4 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 capitalize">{category}</h3>
      {(qualifications[category] || []).map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
          {fields.map((field) => (
            <div key={field} className="mb-2">
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {field}
              </label>
              {field === 'proficiency' ? (
                <select
                  value={item[field]}
                  onChange={(e) => handleChange(category, index, field, e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {category === 'skills' ? 
                    ['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                      <option key={level} value={level}>{level}</option>
                    )) :
                    ['Basic', 'Conversational', 'Fluent', 'Native'].map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))
                  }
                </select>
              ) : (
                <input
                  type={field === 'year' ? 'number' : 'text'}
                  value={item[field]}
                  onChange={(e) => handleChange(category, index, field, e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          {index > 0 && (
            <button
              onClick={() => removeField(category, index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <MinusCircle size={20} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addField(category)}
        className="flex items-center text-blue-500 hover:text-blue-700"
      >
        <PlusCircle size={20} className="mr-1" /> Add {category}
      </button>
    </div>
  );

  if (isSaved) {
    return <SavedQualifications qualifications={qualifications} onEdit={handleEdit} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Qualifications</h2>
      <div className="space-y-6">
        {renderFields('education', ['degree', 'institution', 'year'])}
        {renderFields('workExperience', ['position', 'company', 'duration', 'responsibilities'])}
        {renderFields('skills', ['name', 'proficiency'])}
        {renderFields('languages', ['name', 'proficiency'])}
        {renderFields('certifications', ['name', 'issuer', 'year'])}
        {renderFields('projects', ['name', 'description', 'technologies'])}
        {renderFields('awards', ['name', 'issuer', 'year'])}
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        >
          <Save size={20} className="mr-2" /> Save Qualifications
        </button>
      </div>
    </div>
  );
};

export default Qualifications;