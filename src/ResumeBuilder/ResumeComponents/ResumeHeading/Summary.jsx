// Summary.js
import React from "react";

function Summary({ summary, handleChange }) {
  return (
    <div className="space-y-2">
      <h4 className="text-base font-semibold sm:text-lg md:text-xl">SUMMARY</h4>
      <textarea
        name="summary"
        id="summary"
        rows="4"
        placeholder='Write your career summary'
        value={summary}
        onChange={(e) => handleChange('summary', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
  );
}

export default Summary;