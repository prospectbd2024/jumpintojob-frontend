import React, { useState, useEffect } from "react";
import "./CompanyDetails.css";
import CompanyCoverImage from "./CompanyCoverImage";
import LoadingSpinner from "./LoadingSpinner";
import SkeletonPlaceholder from "./SkeletonPlaceholder";

function CompanyDetails({ company }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    if(company && Object.keys(company).length >0){
      setIsLoading(false)
    }

  }, [company]);

  if (isLoading) {
    return <SkeletonPlaceholder />;
  }

  return (
    <div key={company.name} className="company-item">
      <div className="company-item-content">
        <div className="company-item-cover company-cover">
          <CompanyCoverImage company={company} />
        </div>
        <div className="company-item-details">
          <div className="company-logo company-logo-container">
            <img src={company.logo} alt="" className="company-logo-image" />
            <div className="company-info company-info-container">
              <h3 className="company-title">{company.name}</h3>
              <p className="company-status">Verified Profile</p>
            </div>
          </div>
          <div className="company-category">
            <p className="company-category-text">
              {company.category ? company.category : ""}
            </p>
            {company.size ? (
              <p className="company-size">Company Size: {company.size}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="company-description company-description-container">
          <p className="company-description-text">
            {company.description ? company.description : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
