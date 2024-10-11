'use client'
import React, { useState, useEffect } from "react";
import { ChevronDownIcon, MapPinIcon, GlobeAltIcon, UsersIcon, BriefcaseIcon, TrendingUpIcon } from 'lucide-react';
import CompanyCoverImage from "./CompanyCoverImage";

const CompanyDetails = ({ company }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (company && Object.keys(company).length > 0) {
      setIsLoading(false);
    }
  }, [company]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100 mb-5">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen mb-5">
      <div className="relative w-full h-[60vh] bg-gradient-to-r from-blue-600 to-purple-600">
        <CompanyCoverImage company={company} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      </div>
      
      <div className="max-w-5xl mx-auto -mt-32 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
          <div className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-6 sm:space-y-0 sm:space-x-8 mb-8">
              <img
                src={company.logo || "/api/placeholder/180/180"}
                alt={`${company.name} logo`}
                className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{company.name}</h1>
                <p className="text-emerald-600 font-semibold flex items-center justify-center sm:justify-start">
                  <TrendingUpIcon className="w-5 h-5 mr-2" />
                  Verified Profile
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {company.category && (
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-2" />
                  {company.category}
                </span>
              )}
              {company.size && (
                <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <UsersIcon className="w-4 h-4 mr-2" />
                  {company.size} Employees
                </span>
              )}
            </div>

            <div className="space-y-4 text-gray-600 mb-8">
              {company.location && (
                <div className="flex items-center">
                  <MapPinIcon className="w-6 h-6 mr-3 text-gray-500" />
                  <span className="text-lg">{company.location}</span>
                </div>
              )}
              {company.website && (
                <div className="flex items-center">
                  <GlobeAltIcon className="w-6 h-6 mr-3 text-gray-500" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
                    {company.website}
                  </a>
                </div>
              )}
            </div>

            <div className={`mt-6 ${showMore ? '' : 'max-h-40 overflow-hidden'}`}>
              <p className="text-gray-700 leading-relaxed text-lg">{company.description}</p>
            </div>
            
            {company.description && company.description.length > 200 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-6 text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none flex items-center group"
              >
                <span className="text-lg font-medium">{showMore ? 'Show Less' : 'Show More'}</span>
                <ChevronDownIcon className={`ml-2 w-5 h-5 transform group-hover:translate-y-1 ${showMore ? 'rotate-180' : ''} transition-all duration-200`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;