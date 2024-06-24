// JobHeader.jsx
import React from "react";

const JobHeader = ({ job }) => (
  <div className="job-application-header">
    <div>
      <img src={job?.image} alt="" />
    </div>
    <div>
      <h5>{job?.job_title}</h5>
      <p>{job?.address}</p>
    </div>
  </div>
);

export default JobHeader;
