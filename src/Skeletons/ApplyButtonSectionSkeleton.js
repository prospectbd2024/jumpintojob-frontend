// ApplyButtonSectionSkeleton.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ApplyButtonSectionSkeleton = () => (
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Skeleton width={200} height={40} />
  </div>
);

export default ApplyButtonSectionSkeleton;
