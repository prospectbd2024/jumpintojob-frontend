import React from "react";
import Link from "next/link";
import "./CompanyCard.css";
import CompanyCoverImage from "./CompanyCoverImage";
import { useUserContext } from "@/Contexts/UserContext";
import { useRouter } from "next/navigation";
function CompanyCard({ props }) {
  const { index, company } = props;
  const router = useRouter();
  const { userData } = useUserContext();
  const handleClick = (link) => {
    if (userData) {
      router.push(link);
    }
    else{
      router.push("/signin");
    }
  };

  return (
    <div key={company.name} className="company-item">
      <div className="company-item-content">
        <div className="company-item-content-banner">
          <CompanyCoverImage company={company} />
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
            {company.size ? <p>Company Size: {company.size}</p> : ""}
          </div>
          <div className="main-items">
            <p className="company_description">{company.description ? company.description.slice(0, 140) + "..." : ""}</p>
          </div>
          <div className="company-item-content-footer">
            <div
              onClick={() => {
                handleClick(`/companies/${company.links.show}`);
              }}>
              <button className="company-button company-details-button">View Details</button>
            </div>
            <div
              onClick={() => {
                handleClick(`/companies/${company.links.show}#company-jobs`);
              }}>
              <button className="company-button company-jobs-button">View Jobs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
