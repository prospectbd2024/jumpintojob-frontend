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
    <div className="company-card rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="grid sm:grid-cols-12">
        <div className="sm:col-span-4 flex items-center justify-center p-4">
          <CompanyCoverImage company={company} className="w-full h-full object-cover" />
        </div>
        <div className="sm:col-span-8 px-4 py-6 flex flex-col gap-4">
          <div className="flex items-center">
            <img src={company.logo} alt={company.name} className="w-12 h-12 mr-3 rounded-lg" />
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
          <p className="text-sm text-gray-700 line-clamp-3">{company.description}</p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleClick(`/companies/${company.links.show}`)}
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
            >
              View Details
            </button>
            <button 
              onClick={() => handleClick(`/companies/${company.links.show}#company-jobs`)}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors"
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