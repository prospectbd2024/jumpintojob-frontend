"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CompanyCoverImage from "./CompanyCoverImage";
import { useUserContext } from "@/Contexts/UserContext";
import CompanyCard from "./CompanyCard";
import CompanyCardSkeleton from "@/Skeletons/CompanyCardSkeleton";

function CompanyListView({ props }) {
  const [isLoading, setIsLoading] = useState(true);
  const { companies } = props;

  useEffect(() => {
    if (companies && Object.keys(companies).length > 0) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [companies]);
  if (isLoading) {
    return (
      <div className="companies-tabs-content">
        <CompanyCardSkeleton />
        <CompanyCardSkeleton />
        <CompanyCardSkeleton />
        <CompanyCardSkeleton />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-20">
      {companies.map((company, index) => (
        <CompanyCard key={index} props={{ company }} />
      ))}
    </div>
  );
}

export default CompanyListView;
