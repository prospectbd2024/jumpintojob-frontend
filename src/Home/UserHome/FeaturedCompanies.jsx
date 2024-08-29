import React, { useEffect, useState } from "react";
import CompanyCard from "@/Components/Companies/CompanyCard";
import CompanyCardSkeleton from "@/Skeletons/CompanyCardSkeleton";
import { useCompanyContext } from "@/Contexts/CompanyContext";

function FeaturedCompanies({ isLoggedIn, className }) {
  const { companies } = useCompanyContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (companies.length > 0) {
      setLoading(false);
    }
  }, [companies]);

  return (
    <section className={`featured-companies mt-5 ${isLoggedIn ? 'logged-in' : ''} `}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-8">Featured Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {loading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <CompanyCardSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {companies.slice(0, 8).map((company, index) => (
                <CompanyCard key={index} props={{ company, index }} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCompanies;