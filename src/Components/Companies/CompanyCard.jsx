import React from "react";
import Link from 'next/link'
import './CompanyCard.css';
import CompanyCoverImage from "./CompanyCoverImage";
function CompanyCard({props}) {
    const {index, company} = props;
  return (
    <div key={index} className="company-item">
      <div className="company-item-content">
        <div className="company-item-content-banner">
        <CompanyCoverImage company={company}/>
        
        </div>
        <div className="company-item-content-main">
          <div className="main-items">
            <img src={company.logo} alt="" />
            <div>
              <Link href="">
                <h3>{company.name}</h3>
              </Link>
              <p>Verified Profile</p>
            </div>
          </div>
          <div className="main-items">
            <p>{company.company_type}</p>
            <p>{company.location}</p>
          </div>
          <div className="main-items">
            <p className="company_description">{company.description?.slice(0, 90)}...</p>
          </div>
          <div className="company-item-content-footer">
           
            <Link href={`/companies/${company.links.show}`}>
              <button className="company-button company-details-button">View Details</button>
            </Link>
            <Link href="">
              <button className="company-button company-jobs-button">View Jobs</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
