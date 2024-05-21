import React, { useEffect } from 'react';
import './AddMore.css';

function AddMore({ props }) {
  const { inputType, formData = {}, setFormData } = props;

  // Reset formData when inputType changes
  useEffect(() => {
    const resetFormData = () => {
      switch (inputType) {
        case 'Project':
          return {
            type : 'Project',
            title: '',
            startDate: '',
            endDate: '',
            present: false,
            description: '',
          };
        case 'Certificate':
          return {
            type : 'Certificate',
            title: '',
            date: '',
            description: '',
          };
        case 'Publication':
          return {
            type : 'Publication',
            title: '',
            journal: '',
            date: '',
            abstract: '',
          };
        default:
          return {
            type : 'Other',
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
    <div className="add-project-container">
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate || ''}
          onChange={handleChange}
        />
        <div className="form-check" >
          <div >
          <input
            type="checkbox"
            name="present"
            checked={formData.present || false}
            onChange={handleChange}
          />
          <label>Present</label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderCertificateForm = () => (
    <div className="add-certificate-container">
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderPublicationForm = () => (
    <div className="add-publication-container">
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Journal/Conference:</label>
        <input
          type="text"
          name="journal"
          value={formData.journal || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Abstract:</label>
        <textarea
          name="abstract"
          value={formData.abstract || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderDefaultForm = () => (
    <div className="default-container">
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
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
