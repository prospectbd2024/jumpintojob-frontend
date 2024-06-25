// JobHeaderSkeleton.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobHeaderSkeleton = () => (
  <div className="job-application-header">
    <div>
      <Skeleton circle={true} height={50} width={50} />
    </div>
    <div>
      <Skeleton width={200} height={20} />
      <Skeleton width={150} height={15} />
    </div>
  </div>
);

export default JobHeaderSkeleton;
