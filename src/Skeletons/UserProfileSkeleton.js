import React from 'react';
import './UserProfileSkeleton.css';

const UserProfileSkeleton = () => {
  return (
    <div className="user-home-profile res-third-div">
      <h4>User Profile:</h4>
      <div className='user-home-profile-content'>
        <div className='home-profile'>
          <div className="home-user-profile">
            <div>
              <div className="user-profile-main skeleton">
                <div className="skeleton-img"></div>
                <div className="skeleton-text skeleton-name"></div>
                <div className="skeleton-text skeleton-placeholder"></div>
                <div className="skeleton-text skeleton-address"></div>
              </div>
              <div className="user-profile-info">
                <div className="profile-info">
                  <div className="skeleton-icon"></div>
                  <div>
                    <div className="skeleton-text skeleton-placeholder"></div>
                    <div className="skeleton-text skeleton-small"></div>
                  </div>
                </div>
                <div className="profile-info">
                  <div className="skeleton-icon"></div>
                  <div>
                    <div className="skeleton-text skeleton-placeholder"></div>
                    <div className="skeleton-text skeleton-small"></div>
                  </div>
                </div>
                <div className="profile-info">
                  <div className="skeleton-icon"></div>
                  <div>
                    <div className="skeleton-text skeleton-placeholder"></div>
                    <div className="skeleton-text skeleton-small"></div>
                  </div>
                </div>
                <div className="profile-info">
                  <div className="skeleton-icon"></div>
                  <div>
                    <div className="skeleton-text skeleton-placeholder"></div>
                    <div className="skeleton-text skeleton-small"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
