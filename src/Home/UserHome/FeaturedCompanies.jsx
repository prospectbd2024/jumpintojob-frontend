import React, { useState, useEffect } from "react";
import CompanyCard from "@/Components/Companies/CompanyCard";
import CompanyCardSkeleton from "@/Skeletons/CompanyCardSkeleton";
import { useCompanyContext } from "@/Contexts/CompanyContext";
import "./FeaturedCompanies.css";

function FeaturedCompanies({ isLoggedIn }) {
  const { companies } = useCompanyContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (companies.length > 0) {
      setLoading(false);
    }
  }, [companies]);

  return (
    <div className={`mt-5 ${isLoggedIn ? 'logged-in' : ''}`}>
      <h4 className={isLoggedIn ? 'logged-in-title' : 'logged-out-title'}>
        Featured Companies:
      </h4>
      <div
        className="grid grid-cols-3 gap-x-3 gap-y-24 container mx-auto"
        style={{
          gridTemplateColumns: isLoggedIn ? "repeat(1, 1fr)" : "repeat(4, 1fr)",
        }}>
        {loading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <CompanyCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {companies.slice(0, isLoggedIn ? 3 : 8).map((company, index) => (
              <CompanyCard key={index} props={{ company, index }} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default FeaturedCompanies;
