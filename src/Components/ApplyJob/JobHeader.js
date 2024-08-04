import JobHeaderSkeleton from "@/Skeletons/JobHeaderSkeleton";
import React from "react";

const JobHeader = ({ job, loading }) => (
  !job || Object.keys(job).length === 0 ? (
    <JobHeaderSkeleton />
  ) : (
    <div className="flex items-center gap-5 border border-gray-300 rounded-lg p-5">
      <div>
        <img
          src={job?.image}
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <div>
        <h5 className="text-lg font-semibold">{job?.job_title}</h5>
        <p className="text-gray-600">{job?.address}</p>
      </div>
    </div>
  )
);

export default JobHeader;
