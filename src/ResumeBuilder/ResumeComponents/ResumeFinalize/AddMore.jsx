import React, { useEffect } from 'react';

function AddMore({ props }) {
  const { inputType, formData = {}, setFormData } = props;

  // Reset formData when inputType changes
  useEffect(() => {
    const resetFormData = () => {
      switch (inputType) {
        case 'Project':
          return {
            type: 'Project',
            title: '',
            startDate: '',
            endDate: '',
            present: false,
            description: '',
          };
        case 'Certificate':
          return {
            type: 'Certificate',
            title: '',
            date: '',
            description: '',
          };
        case 'Publication':
          return {
            type: 'Publication',
            title: '',
            journal: '',
            date: '',
            abstract: '',
          };
        default:
          return {
            type: 'Other',
            title: '',
            description: '',
          };
      }
    };

    setFormData(resetFormData());
  }, [inputType, setFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const renderProjectForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full"
        />
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            name="present"
            checked={formData.present || false}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-base">Present</label>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full resize-y overflow-auto h-24 md:h-32"
        />
      </div>
    </div>
  );

  const renderCertificateForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full resize-y overflow-auto h-24 md:h-32"
        />
      </div>
    </div>
  );

  const renderPublicationForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Journal/Conference:</label>
        <input
          type="text"
          name="journal"
          value={formData.journal || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Abstract:</label>
        <textarea
          name="abstract"
          value={formData.abstract || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full resize-y overflow-auto h-24 md:h-32"
        />
      </div>
    </div>
  );

  const renderDefaultForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semibold mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-base w-full resize-y overflow-auto h-24 md:h-32"
        />
      </div>
    </div>
  );

  const renderForm = () => {
    switch (inputType) {
      case 'Project':
        return renderProjectForm();
      case 'Certificate':
        return renderCertificateForm();
      case 'Publication':
        return renderPublicationForm();
      default:
        return renderDefaultForm();
    }
  };

  return <>{renderForm()}</>;
}

export default AddMore;

