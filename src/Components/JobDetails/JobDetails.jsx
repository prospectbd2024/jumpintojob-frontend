"use client"
import React from 'react';
import { FaUpRightFromSquare } from "react-icons/fa6";
import Link from 'next/link';
import Swal from 'sweetalert2';


const JobDetails = ({props}) => {

    const {job} = props;

    const handleApplyJob = () => {
        if (userData) {
            // Use window.open() to open the URL in a new tab
            window.open(`/applyjob/${job.id}`, '_blank');
            
            
        } else {
            Swal.fire({
                title: 'User must login before applying!',
                text: "Do you want to login?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    loginNavigate.push('/signin')
                }
            })
        }

    }
    return (
        <div className='job-details'>{
            job && 

            <div className="job-details-content">
                <div className="job-details-header">
                    <div className="job-details-header-company">
                        <img src={job.image} alt="" />
                        <Link href={""}>{job.company_name}</Link>
                    </div>
                    <div className="job-details-header-job">
                        <div>
                            <h2>{job.job_title}</h2>
                            <p>{job.address}</p>
                        </div>
                        <button onClick={handleApplyJob}>Apply Now <FaUpRightFromSquare/></button>
                    </div>
                </div>
                <div className="job-details-main">
                    <p><span>Job Description </span>{job.description}</p>
                    <p><span>Job Responsibilities </span>{job.resposibilities}</p>
                    <p><span>Job Type </span>{job.availability}</p>
                    <p><span>Salary </span>{job.salary}</p>
                    <p><span>Educational Requirements </span>{job.educational_requirements}</p>
                    <p><span>Required Expereinces </span>{job.experience}</p>
                </div>
            </div>}
        </div>
    );
};

export default JobDetails;