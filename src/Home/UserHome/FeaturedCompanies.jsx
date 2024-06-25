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
    <div className={`user-home-companies-container ${isLoggedIn ? 'logged-in' : ''}`}>
      <h4 className={isLoggedIn ? 'logged-in-title' : 'logged-out-title'}>
        Featured Companies:
      </h4>
      <div
        className="user-home-companies"
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
