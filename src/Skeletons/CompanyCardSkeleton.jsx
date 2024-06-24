import React from 'react';
import './CompanyCardSkeleton.css'; // Make sure to import the correct CSS file

const CompanyCardSkeleton = () => {
  return (
    <div className='company-item-skeleton'>
      <div className='company-item-content skeleton'>
        <div className='company-item-content-banner-skeleton'></div>
        <div className='company-item-content-main'>
          <div className='main-items'>
            <div className='skeleton-image'></div>
            <div>
              <div className='skeleton-title'></div>
              <div className='skeleton-verified'></div>
            </div>
          </div>
          <div className='main-items'>
            <div className='skeleton-category'></div>
            <div className='skeleton-size'></div>
          </div>
          <div className='main-items'>
            <div className='skeleton-description'></div>
          </div>
          <div className='company-item-content-footer'>
            <div>
              <button className='skeleton-button'></button>
            </div>
            <div>
              <button className='skeleton-button'></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCardSkeleton;
