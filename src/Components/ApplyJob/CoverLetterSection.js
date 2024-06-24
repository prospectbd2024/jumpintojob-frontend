// CoverLetterSection.js
import React from "react";
import { FaFileUpload } from "react-icons/fa";
import './CoverLetterSection.css';

const CoverLetterSection = ({ forwardingLetter, handleCoverLetter, handleTextChange, handleFileChange }) => (
  <div className="upload-coverletter">
    <div className="cover-letter-options">
      <label className="cover-letter-radio">
        <input 
          type="radio" 
          name="coverLetterType" 
          value="text" 
          checked={forwardingLetter.type === "text"} 
          onChange={() => handleCoverLetter("text")} 
        />
        Text
      </label>
      <label className="cover-letter-radio">
        <input 
          type="radio" 
          name="coverLetterType" 
          value="file" 
          checked={forwardingLetter.type === "file"} 
          onChange={() => handleCoverLetter("file")} 
        />
        Upload
      </label>
    </div>
    {forwardingLetter.type === "file" ? (
      <div className="upload-input-container">
        <div className="file-upload-wrapper">
          {forwardingLetter?.value?.name ? (
            <div className="file-name">{forwardingLetter.value.name}</div>
          ) : (
            <FaFileUpload className="file-upload-icon" />
          )}
          <p className="file-upload-hint">Use files like pdf, doc, docx, rtf or text</p>
          <label className="file-upload-button">
            Upload Forwarding Letter
            <input type="file" className="file-input" onChange={handleFileChange} accept=".pdf,.doc,.docx,.rtf,.txt" />
          </label>
        </div>
      </div>
    ) : (
      <textarea
        placeholder="Type your forwarding letter here..."
        value={forwardingLetter.value || ""}
        onChange={handleTextChange}
        className="cover-letter-textarea"
      ></textarea>
    )}
  </div>
);

export default CoverLetterSection;