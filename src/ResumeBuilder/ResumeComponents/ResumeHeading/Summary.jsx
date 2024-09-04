import React from "react";

function Summary({ summary, handleChange }) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">SUMMARY</h4>
      <textarea
        name="summary"
        id="summary"
        rows="4"
        placeholder="Write your career summary"
        value={summary}
        onChange={(e) => handleChange("summary", e.target.value)}
        className={`w-full p-2 sm:p-3 text-xs sm:text-sm md:text-base border rounded-lg 
          ${summary ? 'border-neutral-300' : 'border-black'} 
          focus:border-black`}
      ></textarea>
    </div>
  );
}

export default Summary;
