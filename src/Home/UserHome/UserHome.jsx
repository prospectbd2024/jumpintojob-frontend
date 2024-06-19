"use client"
import React, { useEffect, useState } from 'react';
import './UserHome.css'
import { useUserContext } from '../../Contexts/UserContext';
import { useMediaQuery } from '@uidotdev/usehooks';
import { HiMap, HiOutlineBookmark } from 'react-icons/hi';
import Link from 'next/link';
import { FcBriefcase, FcBusinessman, FcFinePrint, FcOnlineSupport } from "react-icons/fc";
import { useJobContext } from '@/Contexts/JobContext';
import { useCompanyContext } from '@/Contexts/CompanyContext';
import Companies from './Companies';

const UserHome = () => {
    const { setClickedFeaturedJob,profile } = useUserContext();
    const {allJobs} = useJobContext();
    const {companies} = useCompanyContext();
    let isClient = false;
    setInterval(() => {
        isClient = true;
    }, 1000);
    const isMobileScreen = isClient ? useMediaQuery("only screen and (max-width : 1368px)") : false;
    const handleClickedFeaturedJob = (e) => {
        setClickedFeaturedJob(e);
    }

    return (

        <div className='user-home'>
            <div className="user-home-content container">
                <div>
                    <Companies props={{companies}} />
                </div>
                <div className="user-home-jobs res-first-div">
                    <h4>Featured Jobs:</h4>
                    {allJobs.length > 0 ?
                        <div>
                            <div className='featured-jobs-items all-jobs-container'>
                                {
                                    allJobs.slice(0, 10).map(job =>
                                        <div className={`featured-job-item single-job`} key={job.id}>
                                            <div className="single-job-header">
                                                <h2>{job.job_title}</h2>
                                                <HiOutlineBookmark></HiOutlineBookmark>
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
                            <div className="featured-jobs-more">
                                <Link href="/findjobs"><button>Explore More</button></Link>
                            </div>
                        </div>
                        :
                        <div className=''>
                            <h4 className=''>No Jobs Available</h4>
                        </div>
                    }
                </div>
                <div className="user-home-profile res-third-div">
                    <h4>User Profile:</h4>
                    <div className='user-home-profile-content'>
                        <div className='home-profile'>
                            <div className="home-user-profile">

                                     <div>
                                        <div className="user-profile-main" >
                                            <img src="https://img.freepik.com/free-icon/man_318-677829.jpg" alt="" />
                                            <h3> {`${profile?.first_name} ${profile?.last_name}`}</h3>
                                            <p>Not added</p>
                                            <p className='user-address'><HiMap />{`${profile?.street?profile?.street+",":""} ${profile?.state?profile?.state+",":""} ${profile?.city?profile?.city+",":""} ${profile?.country}`}</p>
                                        </div>
                                        <div className="user-profile-info">

                                            <div className="profile-info">
                                                <FcBusinessman />
                                                <div>
                                                    <p>Profile Verification</p>
                                                    <h6>Verified</h6>
                                                </div>
                                            </div>
                                            <div className="profile-info">
                                                <FcBriefcase />
                                                <div>
                                                    <p>Applied Jobs</p>
                                                    <h6>82</h6>
                                                </div>
                                            </div>
                                            <div className="profile-info">
                                                <FcOnlineSupport />
                                                <div>
                                                    <p>Interview</p>
                                                    <h6>02</h6>
                                                </div>
                                            </div>
                                            <div className="profile-info">
                                                <FcFinePrint />
                                                <div>
                                                    <p>Profile Appear</p>
                                                    <h6>08</h6>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                            </div>
                        </div>
                        {/* <div className='home-subscribe'>
                            <div className="dashboard-resume">
                                <img src="https://img.freepik.com/free-vector/landing-page-concept-new-message_52683-25720.jpg?w=996&t=st=1695997740~exp=1695998340~hmac=02f0a9d4d08173205c030adafb433a61738cf32c478a6b7036560d5e226f605d" alt="" />
                                <h3>Start your career with top companies</h3>
                                <p>Looking for a job? Increase the  chance of
                                    getting hired with subscribing to our email
                                    service.</p>
                                <button>Subscribe</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;