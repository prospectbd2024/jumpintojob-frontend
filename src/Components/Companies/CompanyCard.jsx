import React from "react";
import Link from "next/link";
import CompanyCoverImage from "./CompanyCoverImage";
import { useUserContext } from "@/Contexts/UserContext";
import { useRouter } from "next/navigation";

function CompanyCard({ props }) {
  const { company } = props;
  const router = useRouter();
  const { guestProtection } = useUserContext();

  const handleClick = (link) => {
    guestProtection(() => { router.push(link) });
  };

  return (
    <div className="company-card border border-gray-300 p-4 rounded-lg mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3 lg:w-1/4">
          <div className="rounded-lg overflow-hidden h-48 sm:h-36">
            <CompanyCoverImage company={company} />
          </div>
        </div>
        <div className="w-full sm:w-2/3 lg:w-3/4">
          <div className="flex items-center mb-2">
            <img src={company.logo} alt={company.name} className="w-12 h-12 mr-3 bg-white rounded-lg shadow-sm" />
            <div>
              <Link href={""}>
                <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
              </Link>
              <p className="text-sm text-gray-500">Verified Profile</p>
            </div>
          </div>
          {/* <div className="mb-2">
            <span className="text-sm font-medium text-gray-600 mr-3">{company.category}</span>
            {company.size && <span className="text-sm text-gray-600">Size: {company.size}</span>}
          </div> */}
          <p className="text-sm text-gray-700 mb-3">{company.description ? `${company.description.slice(0, 100)}...` : ""}</p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleClick(`/companies/${company.links.show}`)}
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
            >
              View Details
            </button>
            <button 
              onClick={() => handleClick(`/companies/${company.links.show}#company-jobs`)}
              className="px-4 py-2 bg-transparent border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              View Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;