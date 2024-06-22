import React from 'react'
import Link from "next/link";
import CompanyCoverImage from './CompanyCoverImage';
function CompanyListView({props}) {
   const {companies}= props;
    return (
    <div className="companies-tabs-content">
    {companies.map((company)=>{
      return <div key={company.name} className="company-item">
         <div className="company-item-content">
        <div className="company-item-content-banner">
        <CompanyCoverImage company={company}/>
        </div>
        <div className="company-item-content-main">
          <div className="main-items">
            <img src={company.logo} alt="" />
            <div>
              <Link href={""}>
                <h3>{company.name}</h3>
              </Link>
              <p>Verified Profile</p>
            </div>
          </div>
          <div className="main-items">
            <p>{company.category}</p>
            { company.size?<p>Company Size: {company.size}</p>: ''}
          </div>
          <div className="main-items">
            <p className="company_description">
              {company.description? company.description.slice(0, 140)+'...':''}
            </p>
          </div>
          <div className="company-item-content-footer">
            <Link href={`/companies/${company.links.show}`}>
              <button className="company-button company-details-button">
                View Details
              </button>
            </Link>
            <Link href={`/companies/${company.links.show}#company-jobs`}>
              <button className="company-button company-jobs-button">
                View Jobs
              </button>
            </Link>
          </div>
        </div>
      </div></div>
    })}
  </div>
  )
}

export default CompanyListView
