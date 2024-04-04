'use client';
import React, { useEffect } from 'react';
import JobDetails from '@/Components/JobDetails/JobDetails';

import { useParams } from 'next/navigation';
import { useJobContext } from '@/jobContext/JobContext';


function Page() {


    const {getJob,selectedJob} = useJobContext();
    const {id}  = useParams();
    useEffect(()=>{
      getJob(id)
    },[])

  return (
    <>
      {selectedJob.id && <JobDetails props={{  job : selectedJob}} />}
    </>
      );
}

export default Page;
