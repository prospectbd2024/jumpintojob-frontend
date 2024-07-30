import React, { useEffect } from 'react';
import './AddMore.scss';

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
    <div className="add-more__container">
      <div className="add-more__form-group">
        <label className="add-more__label">Title:</label>
        <input
          className="add-more__input"
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </div>
      <div className="add-more__form-group">
        <label className="add-more__label">Start Date:</label>
        <input
          className="add-more__input add-more__input--date"
          type="date"
          name="startDate"
          value={formData.startDate || ''}
          onChange={handleChange}
        />
      </div>
      <div className="add-more__form-group">
        <label className="add-more__label">End Date:</label>
        <input
          className="add-more__input add-more__input--date"
          type="date"
          name="endDate"
          value={formData.endDate || ''}
          onChange={handleChange}
        />
        <div className="add-more__form-check">
          <div className="add-more__form-check-inner">
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
      <div className="add-more__form-group">
        <label className="add-more__label">Description:</label>
        <textarea
          className="add-more__textarea"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderCertificateForm = () => (
    <div className="add-more__container">
      <div className="add-more__form-group">
        <label className="add-more__label">Title:</label>
        <input
          className="add-more__input"
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </div>
      <div className="add-more__form-group">
        <label className="add-more__label">Date:</label>
        <input
          className="add-more__input add-more__input--date"
          type="date"
          name="date"
          value={formData.date || ''}
          onChange={handleChange}
        />
      </div>
      <div className="add-more__form-group">
        <label className="add-more__label">Description:</label>
        <textarea
          className="add-more__textarea"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderPublicationForm = () => (
    <div className="add-more__container">
      <div className="add-more__form-group">
        <label className="add-more__label">Title:</label>
        <input
          className="add-more__input"
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </div>
      <div className="add-more__form-group">
        <label className="add-more__label">Journal/Conference:</label>
        <input
          className="add-more__input"
          type="text"
          name="journal"
          value={formData.journal || ''}
          onChange={handleChange}
        />
      </div>
      <div className="add-more__form-group">
        <label className="add-more__label">Date:</label>
        <input
          className="add-more__input add-more__input--date"
          type="date"
          name="date"
          value={formData.date || ''}
          onChange={handleChange}
        />
      </div>
      <div className="add-more__form-group">
        <label className="add-more__label">Abstract:</label>
        <textarea
          className="add-more__textarea"
          name="abstract"
          value={formData.abstract || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderDefaultForm = () => (
    <div className="add-more__container">
      <div className="add-more__form-group">
        <label className="add-more__label">Title:</label>
        <input
          className="add-more__input"
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </div>
      <div className="add-more__form-group">
        <label className="add-more__label">Description:</label>
        <textarea
          className="add-more__textarea"
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
