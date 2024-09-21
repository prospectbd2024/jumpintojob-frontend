"use client";
import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import CompanyCardSkeleton from "@/Skeletons/CompanyCardSkeleton";

function CompanyListView({ props }) {
  const [isLoading, setIsLoading] = useState(true);
  const { companies } = props;

  useEffect(() => {
    if (companies && companies.length > 0) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [companies]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <CompanyCardSkeleton />
        <CompanyCardSkeleton />
        <CompanyCardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-100 p-4 rounded-lg shadow-lg overflow-hidden">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center sticky">Companies</h3>
      <div className="space-y-2 max-h-[calc(100vh-205px)] overflow-y-auto pr-2 custom-scrollbar">
      {companies.map((company, index) => (
        <CompanyCard key={index} props={{ company }} />
      ))}

      </div>
    </div>
  );
}

export default CompanyListView;