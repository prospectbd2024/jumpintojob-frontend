// CoverLetterSection.jsx
import React from "react";
import { FaFileUpload } from "react-icons/fa";
import CoverLetterSectionSkeleton from "@/Skeletons/CoverLetterSectionSkeleton";

const CoverLetterSection = ({
  forwardingLetter,
  handleFileChange,
  handleTextChange,
  handleCoverLetter,
  loading,
}) => (
  <div className="upload-coverletter upload-resume">
    {loading ? (
      <CoverLetterSectionSkeleton />
    ) : (
      <div>
        <div className="cover-letter-options">
          <div className="cover-letter-radio">
            <input
              type="radio"
              id="text-letter"
              name="text"
              defaultChecked
              onClick={() => handleCoverLetter("text")}
            />
            <label htmlFor="text-letter">Text</label>
          </div>
          <div className="cover-letter-radio">
            <input
              type="radio"
              id="upload-letter"
              name="text"
              onClick={() => handleCoverLetter("file")}
            />
            <label htmlFor="upload-letter">Upload</label>
          </div>
        </div>
        {forwardingLetter.type !== "text" ? (
          <div className="upload-input-container">
            <div>
              {!forwardingLetter?.value?.name ? (
                <FaFileUpload className="file-upload" />
              ) : (
                <div>{forwardingLetter?.value?.name}</div>
              )}

              <p>Use files like pdf, doc, docx, rtf or text</p>
              <button type="button" className="file-upload-button">
                Upload Forwarding Letter
              </button>
            </div>

            <input type="file" className="file" onChange={handleFileChange} />
          </div>
        ) : (
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Type forwarding letter"
            value={forwardingLetter.value ?? ""}
            onChange={handleTextChange}
          ></textarea>
        )}
      </div>
    )}
  </div>
);

export default CoverLetterSection;
