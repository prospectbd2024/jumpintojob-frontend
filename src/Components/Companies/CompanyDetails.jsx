import React from "react";
import "./CompanyDetails.css";
import CompanyCoverImage from "./CompanyCoverImage";
function CompanyDetails({ company }) {
  return (
    <div key={company.name} className="company-item">
      <div className="company-item-content">
        <div className="company-item-cover company-cover">
        <CompanyCoverImage company={company}/>
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
            <p className="company-category-text">{company.category ? company.category : ""}</p>
            {company.size ? <p className="company-size">Company Size: {company.size}</p> : <></>}
          </div>
        </div>
        <div className="company-description company-description-container">
          <p className="company-description-text">{company.description ? company.description : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
