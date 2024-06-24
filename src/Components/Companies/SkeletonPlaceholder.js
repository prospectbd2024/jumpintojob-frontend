import React from 'react';
import './SkeletonPlaceholder.css';

function SkeletonPlaceholder() {
  return (
    <div className="skeleton">
      <div className="skeleton-item-cover"></div>
      <div className="skeleton-item-details">
        <div className="skeleton-logo"></div>
        <div className="skeleton-info">
          <div className="skeleton-title"></div>
          <div className="skeleton-status"></div>
        </div>
        <div className="skeleton-category"></div>
        <div className="skeleton-size"></div>
      </div>
      <div className="skeleton-description"></div>
    </div>
  );
}

export default SkeletonPlaceholder;
