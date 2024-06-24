import React, { useState, useEffect } from 'react';
import CompanyCard from '@/Components/Companies/CompanyCard';
import CompanyCardSkeleton from '@/Skeletons/CompanyCardSkeleton';
import { useCompanyContext } from '@/Contexts/CompanyContext';
import './FeaturedCompanies.css';

function FeaturedCompanies({ props }) {
  const { companies } = useCompanyContext();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Simulate loading delay (remove this in real usage)
    if(companies.length>0){
        setLoading(false)
    }
  }, [companies]);

  return (
    <div className='user-home-companies-container'>
      <h4 style={{textAlign: 'center' , marginBlock :' 10px'}}>Featured Companies:</h4>
      {loading ? (
        <div className='user-home-companies'>
          {[...Array(6)].map((_, index) => (
            <CompanyCardSkeleton key={index} />

          ))}
        </div>
      ) : (
        <div className='user-home-companies'>

          {companies.slice(0, 6).map((company, index) => (
            <CompanyCard key={index} props={{ company, index }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedCompanies;
