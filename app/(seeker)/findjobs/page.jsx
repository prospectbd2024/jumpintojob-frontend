"use client"
import DefaultJobDetails from '@/Components/AllJobs/DefaultJobDetails'
import JobDetails from '@/Components/JobDetails/JobDetails'
import {  useJobContext } from '@/jobContext/JobContext'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Page() {
  const router = useRouter()

   const {selectedJob} = useJobContext();

  return (
    <div>
      {selectedJob.id?
      <JobDetails props={{job : selectedJob}} />:
      <DefaultJobDetails/>}
    </div>
  )
}

export default Page