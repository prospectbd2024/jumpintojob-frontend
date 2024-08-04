import React from "react";
import { FaFileUpload } from "react-icons/fa";

const CoverLetterSection = ({ forwardingLetter, handleCoverLetter, handleTextChange, handleFileChange }) => (
  <div className="mt-5 border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
    <div className="flex gap-5 mb-5">
      <label className="flex items-center gap-2 cursor-pointer text-gray-700">
        <input
          type="radio"
          name="coverLetterType"
          value="text"
          checked={forwardingLetter.type === "text"}
          onChange={() => handleCoverLetter("text")}
          className="mr-2"
        />
        Text
      </label>
      <label className="flex items-center gap-2 cursor-pointer text-gray-700">
        <input
          type="radio"
          name="coverLetterType"
          value="file"
          checked={forwardingLetter.type === "file"}
          onChange={() => handleCoverLetter("file")}
          className="mr-2"
        />
        Upload
      </label>
    </div>
    {forwardingLetter.type === "file" ? (
      <div className="flex flex-col items-center p-5 border-2 border-dashed border-gray-300 rounded-lg transition-colors hover:border-blue-500">
        <div className="text-center">
          {forwardingLetter?.value?.name ? (
            <div className="font-bold mb-2">{forwardingLetter.value.name}</div>
          ) : (
            <FaFileUpload className="text-blue-500 text-4xl mb-2" />
          )}
          <p className="text-gray-500 text-sm mb-3">Use files like pdf, doc, docx, rtf or text</p>
          <label className="bg-blue-500 text-white border-none px-4 py-2 rounded cursor-pointer transition-colors hover:bg-blue-700">
            Upload Forwarding Letter
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.rtf,.txt"
            />
          </label>
        </div>
      </div>
    ) : (
      <textarea
        placeholder="Type your forwarding letter here..."
        value={forwardingLetter.value || ""}
        onChange={handleTextChange}
        className="w-full min-h-[200px] border border-gray-300 rounded-md p-4 text-base resize-y transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
      ></textarea>
    )}
  </div>
);

export default CoverLetterSection;
