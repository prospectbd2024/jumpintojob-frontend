import React from 'react';
import './JobDetailsSkeleton.css'; // Corrected CSS file name

const JobDetailsSkeleton = () => {
  return (
    <div className='job-details-skeleton'>
      <div className='job-details-content-skeleton skeleton'>
        <div className='job-details-header-skeleton'>
          <div className='job-details-header-company-skeleton'>
            <div className='skeleton-image-skeleton'></div>
            <div className='skeleton-company-skeleton'></div>
          </div>
          <div className='job-details-header-job-skeleton'>
            <div>
              <div className='skeleton-title-skeleton'></div>
              <div className='skeleton-location-skeleton'></div>
            </div>
            <button className='skeleton-button-skeleton'></button>
          </div>
        </div>
        <div className='job-details-main-skeleton'>
          <div className='skeleton-info-skeleton'></div>
          <div className='skeleton-info-skeleton'></div>
          <div className='skeleton-info-skeleton'></div>
          <div className='skeleton-info-skeleton'></div>
          <div className='skeleton-info-skeleton'></div>
          <div className='skeleton-info-skeleton'></div>
          <div className='skeleton-info-skeleton'></div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;
