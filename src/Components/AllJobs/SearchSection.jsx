"use client";

import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineBriefcase, HiOutlineLocationMarker, HiSearch } from 'react-icons/hi';

const SearchSection = ({ handleFilteredJobs }) => {
  const [isCompact, setIsCompact] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsCompact(scrollPosition > 50);
    };

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const isLarge = !isCompact || isExpanded;

  return (
    <div 
      ref={searchRef}
      className={`fixed left-0 right-0 bg-white shadow-md transition-all duration-500 ease-in-out ${
        isLarge ? 'py-4' : 'py-3'
      }`}
      style={{
        top: 'var(--header-height, 50px)',
        zIndex: 1000,
      }}
    >
      <style jsx>{`
        @media (max-width: 1200px) {
          div {
            top: 0 !important;
          }
          :global(header) {
            display: none;
          }
        }
      `}</style>
      <div className={`container mx-auto px-5 ${isLarge ? 'max-w-6xl duration-1000' : 'max-w-2xl duration-1000'}`}>
        <form onSubmit={handleFilteredJobs} className={`flex items-center bg-white border border-gray-300 rounded-full overflow-hidden transition-all duration-300 ${isLarge ? 'h-16' : 'h-12'}`}>
          <div className="flex-grow flex items-center space-x-4 px-6">
            <div className={`flex items-center space-x-2 ${isLarge ? 'text-base' : 'text-sm'}`}>
              <HiOutlineBriefcase className="text-primary" />
              <input
                type="text"
                name="jobTitle"
                placeholder="Job title or keywords"
                className="w-full bg-transparent focus:outline-none"
                onFocus={handleFocus}
              />
            </div>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${isLarge ? 'text-base' : 'text-sm'}`}>
              <HiOutlineLocationMarker className="text-primary" />
              <input
                type="text"
                name="jobLocation"
                placeholder="Location"
                className="w-full bg-transparent focus:outline-none"
                onFocus={handleFocus}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`flex items-center justify-center bg-primary-color text-white rounded-full transition-all duration-300 hover:scale-105 ${
              isLarge ? 'w-28 h-12 mr-2' : 'w-10 h-10 mr-1'
            }`}
          >
            {isLarge ? (
              <span className="font-bold">Search</span>
            ) : (
              <HiSearch className="text-lg" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchSection;