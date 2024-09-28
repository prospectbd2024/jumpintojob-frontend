import React, { useState, useEffect } from "react";
import CompanyCoverImage from "./CompanyCoverImage";
import LoadingSpinner from "./LoadingSpinner";
import SkeletonPlaceholder from "./SkeletonPlaceholder";

function CompanyDetails({ company }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    if (company && Object.keys(company).length > 0) {
      setIsLoading(false);
    }
  }, [company]);

  if (isLoading) {
    return <SkeletonPlaceholder />;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md my-4">
      <div className="flex flex-col">
        <div className="w-full h-[500px] overflow-hidden">
          <CompanyCoverImage company={company} className="w-full h-full object-cover" />
        </div>
        <div className="p-5 flex flex-col items-start">
          <div className="flex items-center mb-4">
            <img
              src={company.logo}
              alt=""
              className="w-15 h-15 object-cover rounded-full border-2 border-white shadow-md mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
              <p className="text-green-500 font-semibold text-sm">Verified Profile</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-gray-600 text-lg">{company.category || ""}</p>
            {company.size?<p className="text-gray-500 text-sm">Company Size: {company.size}</p>:<></>}
          </div>
        </div>
        <div className="p-5 bg-gray-100 border-t border-gray-200">
          <p className="text-gray-800 text-lg leading-relaxed">{company.description || ""}</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
