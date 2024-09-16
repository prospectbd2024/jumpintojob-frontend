"use client";
import {HiOutlineBriefcase, HiOutlineLocationMarker} from 'react-icons/hi';
import React from 'react';

function SearchSection({handleFilteredJobs}) {
    return (
        <div className="container mx-auto px-4"> {/* Added responsive padding and centering */}
            <div className="text-center mx-auto w-full md:w-4/5 lg:w-3/5"> {/* Adjust width for different screens */}
                <form onSubmit={handleFilteredJobs}
                      className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6"> {/* Column on small screens, row on larger */}
                    {/* Job title input */}
                    <div
                        className="flex items-center gap-3 lg:gap-5 border border-gray-300 p-2 rounded w-full lg:w-auto"> {/* Full width on small screens */}
                        <HiOutlineBriefcase className="text-primary"/>
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="Job title or keywords"
                            className="w-full lg:w-72 h-10 border-none outline-none text-sm"
                        />
                    </div>

                    {/* Location input */}
                    <div
                        className="flex items-center gap-3 lg:gap-5 border border-gray-300 p-2 rounded w-full lg:w-auto"> {/* Full width on small screens */}
                        <HiOutlineLocationMarker className="text-primary"/>
                        <input
                            type="text"
                            name="jobLocation"
                            placeholder="Location"
                            className="w-full lg:w-72 h-10 border-none outline-none text-sm"
                        />
                    </div>

                    {/* Submit button */}
                    <input
                        type="submit"
                        value="Search"
                        className="w-full lg:w-28 h-10 border-none bg-primary-color px-4 text-white text-sm font-bold rounded cursor-pointer transition-transform transform hover:scale-105"
                    />
                </form>
            </div>
        </div>
    );
}

export default SearchSection;
