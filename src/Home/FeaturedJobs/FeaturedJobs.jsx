"use client"
import React, { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowRight, HiOutlineBookmark, HiOutlineCursorClick } from 'react-icons/hi';
import Link from 'next/link';
import './FeaturedJobs.css'
import { FaUpRightFromSquare } from 'react-icons/fa6';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useUserContext } from '../../Contexts/UserContext';
import { useJobContext } from '@/Contexts/JobContext';
import { useCompanyContext } from '@/Contexts/CompanyContext';
const FeaturedJobs = () => {
    const { setClickedFeaturedJob } = useUserContext();
    const {allJobs, setAllJobs} = useJobContext();


    let isClient = false;
    setTimeout(() => {
        isClient = true
    }, 1000);

    const isMobileScreen = isClient ? useMediaQuery("only screen and (max-width : 1368px)") : false;


    const handleClickedFeaturedJob = (e) => {
        setClickedFeaturedJob(e);
    }

    return (
        <div className='featured-jobs-section'>

            <div className="featured-jobs-content container">
                <div className="featured-jobs-header section-header">
                    <h2>Featured jobs at Jump Into Job</h2>
                </div>
                {allJobs.length > 0 ?
                    <div>
                        <div className="featured-jobs-items all-jobs-container">
                            {
                                allJobs.slice(0, 6).map(job =>
                                    <div className={`featured-job-item single-job`} key={job.id}>
                                        <div className="single-job-header">
                                            <h2>{job.job_title}</h2>
                                            <HiOutlineBookmark />
                                        </div>
                                        <h3>{job.company_name}</h3>
                                        <p>{job.address}</p>
                                        <p>{job.description.slice(0, 100)}...</p>
                                        <div className="single-job-bottom">
                                            <p className='single-job-salary'>{job.salary} <span>(Estimated)</span></p>
                                            <p className='posting-date'>22d</p>
                                        </div>
                                        {isMobileScreen ?
                                            <Link onClick={() => handleClickedFeaturedJob(job.id)} href={`/jobdetailsres/${job.id}`}>View Details</Link>
                                            :
                                            <Link onClick={() => handleClickedFeaturedJob(job.id)} href={`/findjobs/jobdetails/${job.id}`}>View Details</Link>
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div className="featured-jobs-show-more-btn">
                            <button><Link href="/findjobs">Show More Jobs</Link></button>
                        </div>
                    </div>
                    :
                    <div className='no-jobs-available'>
                        <h4 className=''>No Jobs Available</h4>
                    </div>
                }
            </div>
        </div>
    );
};

export default FeaturedJobs;