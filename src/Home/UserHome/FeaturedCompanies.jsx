import React, { useEffect, useState } from "react";
import CompanyCard from "@/Components/Companies/CompanyCard";
import CompanyCardSkeleton from "@/Skeletons/CompanyCardSkeleton";
import { useCompanyContext } from "@/Contexts/CompanyContext";
import Link from "next/link";

function FeaturedCompanies({ isLoggedIn, className }) {
  const { companies,featuredCompanies } = useCompanyContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (companies.length > 0) {
      setLoading(false);
    }
  }, [companies]);

  return (
    <section
      className={`featured-companies mt-5 ${isLoggedIn ? "logged-in" : ""} `}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-8">
          Featured Companies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 justify-center">
          {loading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <CompanyCardSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {featuredCompanies.slice(0, 7).map((company, index) => (
                <CompanyCard key={index} props={{ company, index }} />
              ))}
            </>
          )}
        </div>
        <div className="text-center mt-10">
          <Link href="/companies">
            <button
              className="
            bg-green-500 
        text-white 
        px-4 
        py-2 
        text-lg 
        rounded-md 
        cursor-pointer 
        inline-block 
        mt-2 
        transition 
        duration-300 
        ease-in-out 
        hover:bg-green-600
            "
            >
              Show More Companies
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCompanies;
