import React, { useState, useEffect } from "react";
import CompanyCard from "@/Components/Companies/CompanyCard";
import CompanyCardSkeleton from "@/Skeletons/CompanyCardSkeleton";
import { useCompanyContext } from "@/Contexts/CompanyContext";
import "./FeaturedCompanies.css";

function FeaturedCompanies({ isLoggedIn , className }) {
  const { companies } = useCompanyContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (companies.length > 0) {
      setLoading(false);
    }
  }, [companies]);

  return (
    <div className={`mt-5 ${isLoggedIn ? 'logged-in' : ''} ` }>
      <h4 className={"text-center text-darker-secondary-color text-2xl "}>
        Featured Companies:
      </h4>
      <div
        className={`grid container mx-auto ${isLoggedIn ? " grid-cols-4 gap-x-3 gap-y-24 " : "grid-cols-4 "} `}
         >
        {loading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <CompanyCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {companies.slice(0,  8).map((company, index) => (
              <CompanyCard key={index} props={{ company, index }} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default FeaturedCompanies;
