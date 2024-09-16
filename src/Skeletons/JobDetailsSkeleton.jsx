// JobDetailsSkeleton.jsx
'use client';
import React from 'react';

const JobDetailsSkeleton = () => {
  return (
    <div className="relative bg-white shadow-md border-b border-gray-200 overflow-hidden sm:mx-0 md:mx-0 lg:mx-0 xl:mx-0">
      {/* Header Content */}
      <div className="relative pb-1 py-2 pt-2 sm:p-4 md:p-6 lg:pt-8">
        {/* Cover Image Skeleton */}
        <div className="absolute inset-0 z-0 overflow-hidden animate-pulse">
          <div className="w-full h-full bg-gray-300" style={{clipPath: 'polygon(45% 0px, 100% 0px, 100% 100%, 57% 100%)'}}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Header Information Skeleton */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
          {/* Logo and Job Info Skeleton */}
          <div className="flex flex-col flex-grow">
            <div className="flex items-center gap-4 mb-2 animate-pulse">
              <div className="w-16 h-16 rounded-lg bg-gray-300"></div>
              <div className="flex flex-col">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>

            {/* Job Details Skeleton */}
            {/*<div className="flex flex-col sm:flex-row text-sm text-gray-600 gap-2 animate-pulse">*/}
            {/*  <div className="flex items-center mb-1">*/}
            {/*    <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>*/}
            {/*    <div className="h-4 bg-gray-300 rounded w-1/3"></div>*/}
            {/*  </div>*/}
            {/*  <div className="flex items-center mb-1">*/}
            {/*    <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>*/}
            {/*    <div className="h-4 bg-gray-300 rounded w-1/3"></div>*/}
            {/*  </div>*/}
            {/*  <div className="flex items-center mb-1">*/}
            {/*    <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>*/}
            {/*    <div className="h-4 bg-gray-300 rounded w-1/3"></div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
        {/* Apply Button Skeleton */}
        <div className="flex items-center animate-pulse">
          <div className="w-64 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Job Details Section Skeleton */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 overflow-y-auto"
           style={{maxHeight: 'calc(100vh - 18rem)'}}>
        <div className="text-sm md:text-base">
          <div className="mb-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="mb-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="mb-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="mb-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="mb-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="mb-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;
