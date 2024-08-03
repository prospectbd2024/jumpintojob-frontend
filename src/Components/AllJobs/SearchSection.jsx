"use client";
import { HiOutlineBriefcase, HiOutlineLocationMarker } from 'react-icons/hi';
import React from 'react';

function SearchSection({ handleFilteredJobs }) {
  return (
    <div className="mb-8 container">
      <div className="text-center mx-auto w-3/5">
        <form onSubmit={handleFilteredJobs} className="flex items-center gap-6">
          <div className="flex items-center gap-5 border border-gray-300 p-2 rounded relative">
            <HiOutlineBriefcase className="text-primary" />
            <input
              type="text"
              name="jobTitle"
              placeholder="Job title or keywords"
              className="w-72 h-10 border-none outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-5 border border-gray-300 p-2 rounded relative">
            <HiOutlineLocationMarker className="text-primary" />
            <input
              type="text"
              name="jobLocation"
              placeholder="Location"
              className="w-72 h-10 border-none outline-none text-sm"
            />
          </div>
          <input
            type="submit"
            value="Search"
            className="h-10 border-none bg-primary text-white w-28 text-sm font-bold rounded cursor-pointer transition-colors hover:bg-blue-700"
          />
        </form>
      </div>
    </div>
  );
}

export default SearchSection;
