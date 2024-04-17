"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link';
import { useUserContext } from '@/UserContext/UserContext';
import CompanyDetails from '@/Components/Companies/CompanyDetails';
import MoreJobButton from '@/Components/AllJobs/MoreJobButton';
import JobListView from '@/Components/AllJobs/JobListView';
import JobDetails from '@/Components/JobDetails/JobDetails';

function Page() {
    const { slug } = useParams();
    const [company, setCompany] = useState({});
    const UserContext = useUserContext();
    const [allJobs,setAllJobs] = useState([]);
    const [clickedJob, setCLickedJob] = useState(0);
    const [job,setJob] = useState({}); 
    let bearerToken = '';

    const handleClickedJob = useCallback((id)=>{
        setCLickedJob(id)
        allJobs.map((job)=>{
            if(job.id==id){
                setJob(job)
            }
        })
    },[allJobs]);
    useEffect(()=>{
        bearerToken = UserContext.userData.data.access_token;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/company/show/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            }
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            let company = data.data;
            setCompany(company)

        })
    },[])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular/${slug}`)
            .then(res => res.json())
            .then(data => {
                let jobs = data.data;
                setAllJobs(jobs);
                setJob(jobs.length>0?jobs[0]:{})
                // console.log(jobs.length>0?jobs[0]:{});
            })
            .catch(error => {
                console.error('Error fetching data:', error);

            });
    }, []);
    return (
        <div>
        <CompanyDetails company={company}/>
        <div className='all-jobs' style={{'height' : '100%'}}>

            <div className="all-jobs-main" >
                <div className="all-jobs-content container">
                    <div className="show-all-jobs  scroll-container" id="company-jobs">
                    <JobListView props={{filteredJobs: allJobs, limit: 10, clickedJob: clickedJob, isMobileScreen: false , handleClickedJob : handleClickedJob}} />

                    </div>
                    <div>
                    <JobDetails props={{job: job}} />
                    </div>

                </div>
            </div>
        </div>

        </div>
    )
}

export default Page;
