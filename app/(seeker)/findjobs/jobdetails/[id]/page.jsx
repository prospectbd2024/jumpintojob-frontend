'use client';
import React, { useEffect } from 'react';
import JobDetails from '@/Components/JobDetails/JobDetails';

import { useParams } from 'next/navigation';
import { useJobContext } from '@/Contexts/JobContext';


function Page() {


    const {getJob,selectedJob,setClickedJob} = useJobContext();
    const {id}  = useParams();
    useEffect(()=>{
      getJob(id)
      setClickedJob(id)

    },[])

  return (
    <>
      {selectedJob.id && <JobDetails props={{  job : selectedJob}} />}
    </>
      );
}

export default Page;
