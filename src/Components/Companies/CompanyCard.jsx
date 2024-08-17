import React from "react";
import Link from "next/link";
import CompanyCoverImage from "./CompanyCoverImage";
import { useUserContext } from "@/Contexts/UserContext";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'; 

function CompanyCard({ props }) {
  const { index, company } = props;
  const router = useRouter();
  const { userData } = useUserContext();
  const {guestProtection} = useUserContext();

  const handleClick = (link) => {

    guestProtection(()=>{router.push(link)})
 
  };

  return (
    <div key={company.name} className="border border-gray-300 p-4 rounded-lg mb-4 h-fit w-80">
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <CompanyCoverImage company={company} />
        </div>
        <div className="relative -top-8 left-2 max-w-[98%]">
          <div className="flex gap-5 mb-4 items-end">
            <img src={company.logo} alt={company.name} className="w-20 h-20 bg-white rounded-lg shadow-md" />
            <div>
              <Link href={""}>
                <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
              </Link>
              <p className="text-gray-500">Verified Profile</p>
            </div>
          </div>
          <div className="flex gap-5 mb-4 items-end">
            <p className="text-gray-600">{company.category}</p>
            {company.size && <p className="text-gray-600">Company Size: {company.size}</p>}
          </div>
          <div className="flex gap-5 mb-4">
            <p className="text-gray-800">{company.description ? company.description.slice(0, 140) + "..." : ""}</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => handleClick(`/companies/${company.links.show}`)}
              className="w-32 h-10 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
            >
              View Details
            </button>
            <button 
              onClick={() => handleClick(`/companies/${company.links.show}#company-jobs`)}
              className="w-32 h-10 bg-transparent border border-gray-300 text-gray-800 font-bold rounded-md hover:bg-gray-100"
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
