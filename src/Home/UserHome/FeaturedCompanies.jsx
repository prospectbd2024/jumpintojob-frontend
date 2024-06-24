import React, { useState, useEffect } from 'react';
import CompanyCard from '@/Components/Companies/CompanyCard';
import CompanyCardSkeleton from '@/Skeletons/CompanyCardSkeleton';


function Companies({ props }) {
  const { companies } = props;
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Simulate loading delay (remove this in real usage)
    if(companies.length>0){
        setLoading(false)
    }
  }, [companies]);

  return (
    <div className='user-home-companies res-second-div'>
      <h4>Featured Companies:</h4>
      {loading ? (
        <div className='user-home-company'>
          {[...Array(3)].map((_, index) => (
            <CompanyCardSkeleton key={index} />

          ))}
        </div>
      ) : (
        <div className='user-home-company'>
          {companies.slice(0, 3).map((company, index) => (
            <CompanyCard key={index} props={{ company, index }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Companies;
