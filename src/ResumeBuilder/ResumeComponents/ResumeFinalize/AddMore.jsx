import React, { useState } from 'react';
import './AddMore.css';

function AddMore({ props }) {
  const { inputType, more, manageMore } = props;

  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    present: false,
    description: '',
    date: '',
    journal: '',
    abstract: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const renderForm = () => {
    switch (inputType) {
      case 'Project':
        return (
          <div className="add-project-container">
            <div className="project-title">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="project-date">
              <div className="project-start-date">
                <label>Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="project-end-date">
                <label>End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
                <div className="project-working-present">
                  <input
                    type="checkbox"
                    name="present"
                    checked={formData.present}
                    onChange={handleChange}
                  />
                  <label>Present</label>
                </div>
              </div>
            </div>
            <div className="project-description">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 'Certificate':
        return (
          <div className="add-certificate-container">
            <div className="certificate-title">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="certificate-date">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="certificate-description">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 'Publication':
        return (
          <div className="add-publication-container">
            <div className="publication-title">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="publication-journal">
              <label>Journal/Conference:</label>
              <input
                type="text"
                name="journal"
                value={formData.journal}
                onChange={handleChange}
              />
            </div>
            <div className="publication-date">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="publication-abstract">
              <label>Abstract:</label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="default-container">
            <div className="default-title">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="default-description">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        );
    }
  };

  return <>{renderForm()}</>;
}

export default AddMore;
