"use client"
import React from 'react'
import ApplyJob from '@/Components/ApplyJob/ApplyJob'
import { useParams } from 'next/navigation';
import { useJobContext } from '@/Contexts/JobContext';

function Page() {
    const { allJobs } = useJobContext();
    const { id } = useParams();
    const job = allJobs?.find(job => job.id == id);
    return <ApplyJob job={job} />
}

export default Page;
