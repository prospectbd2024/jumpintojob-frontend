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
    <div className="space-y-6">
      {companies.map((company, index) => (
        <CompanyCard key={index} props={{ company }} />
      ))}
    </div>
  );
}

export default CompanyListView;