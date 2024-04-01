'use client';
import React, { useEffect } from 'react';
import JobDetails from '@/Components/JobDetails/JobDetails';

import { useParams } from 'next/navigation';
import { useContext } from 'react';
import { useJobContext } from '@/jobContext/JobContext';





function Page() {


    const {getJob,selectedJob} = useJobContext();
    const {id}  = useParams();
    useEffect(()=>{
      getJob(id)
    },[])

  return (
    <div>
      {selectedJob.id && <JobDetails props={{  job : selectedJob}} />}
    </div>
      );
}

export default Page;
