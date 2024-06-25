// ContactInformationSkeleton.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContactInformationSkeleton = () => (
  <div className="step-applicant-account-info">
    <h4><Skeleton width={200} /></h4>
    {[...Array(6)].map((_, i) => (
      <div className="application-input" key={i}>
        <Skeleton width={100} height={20} />
        <Skeleton width={'100%'} height={40} />
      </div>
    ))}
  </div>
);

export default ContactInformationSkeleton;
