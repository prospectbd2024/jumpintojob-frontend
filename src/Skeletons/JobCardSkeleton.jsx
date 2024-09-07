// SingleJobSkeleton.jsx
import React from 'react';

const SingleJobSkeleton = () => {
  return (
    <div className="relative mb-3 mx-2 sm:mx-3 md:mx-3 md:mr-10 md:ml-10 lg:mx-5 xl:mx-0 rounded-lg p-4 transition-transform duration-300 ease-in-out cursor-pointer bg-gray-100 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="flex items-center justify-between mt-3">
        <div className="w-24 h-6 bg-gray-300 rounded"></div>
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SingleJobSkeleton;
