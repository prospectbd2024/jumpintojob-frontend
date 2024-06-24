import React, { useState, useEffect } from "react";
import CompanyCard from "@/Components/Companies/CompanyCard";
import CompanyCardSkeleton from "@/Skeletons/CompanyCardSkeleton";
import { useCompanyContext } from "@/Contexts/CompanyContext";
import "./FeaturedCompanies.css";

function FeaturedCompanies({ props }) {
  const { isLoggedIn } = props;
  const { companies } = useCompanyContext();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Simulate loading delay (remove this in real usage)
    if (companies.length > 0) {
      setLoading(false);
    }
  }, [companies]);

  return (
    <div className="user-home-companies-container" style={{marginTop : isLoggedIn? '0px' : '20px'}}>
      {isLoggedIn ? (
        <h4 style={{ marginBottom: "15px", color: "var(--darker-secondary-color)", fontSize: "18px", fontWeight: "400" }}>Featured Companies:</h4>
      ) : (
        <h4 style={{ textAlign: "center", marginBlock: " 10px" }}>Featured Companies:</h4>
      )}
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
