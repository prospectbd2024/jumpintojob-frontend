"use client"
import DefaultJobDetails from '@/Components/AllJobs/DefaultJobDetails'
import {  useJobContext } from '@/jobContext/JobContext'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Page() {
  const router = useRouter()

   const {selectedJob} = useJobContext();
   useState(()=>{
     if (selectedJob.id) {
      router.push('/findjobs/jobdetails/'+selectedJob.id)
     }

   },[])
  return (
    <div>
      {!selectedJob.id &&
      <DefaultJobDetails/>}
    </div>
  )
}

export default Page