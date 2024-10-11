"use client"
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import JobListView from '@/Components/AllJobs/JobListView';
import CompanyDetails from '@/Components/Companies/CompanyDetails';
import JobDetails from '@/Components/JobDetails/JobDetails';
import MobileJobDetailsModal from '@/Components/JobDetails/MobileJobDetailsModal';
import { useUserContext } from '@/Contexts/UserContext';
import { useApplicationContext } from "@/Contexts/ApplicationContext";

function Page() {
    const { slug } = useParams();
    const [company, setCompany] = useState({});
    const { userData, guestProtection } = useUserContext();
    const { isApplied } = useApplicationContext();
    const [allJobs, setAllJobs] = useState([]);
    const [clickedJob, setClickedJob] = useState(0);
    const [job, setJob] = useState({});
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const [showMobileModal, setShowMobileModal] = useState(false);

    let bearerToken = '';

    const handleClickedJob = useCallback((id) => {
        setClickedJob(id);
        const selectedJob = allJobs.find(job => job.id === id);
        if (selectedJob) {
            setJob(selectedJob);
            if (isMediumScreen) {
                setShowMobileModal(true);
            }
        }
    }, [allJobs, isMediumScreen]);

    const toggleMobileModal = () => {
        setShowMobileModal(!showMobileModal);
    };

    const handleApplyJob = (jobId) => {
        guestProtection(() => {
            window.open(`/applyjob/${jobId}`, '_blank');
        });
    };

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMediumScreen(window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        bearerToken = userData?.data?.access_token;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/company/show/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            let company = data.data;
            console.log("Fetched company data:", company); // Add this log
            setCompany(company);
        })
        .catch(error => {
            console.error("Error fetching company data:", error); // Add error logging
        });
    }, [slug, userData]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${slug}/circulars`)
            .then(res => res.json())
            .then(data => {
                let jobs = data.data;
                setAllJobs(jobs);
                setJob(jobs.length > 0 ? jobs[0] : null);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [slug]);

    return (
        <div>
            <CompanyDetails company={company} />
            <div className='all-jobs' style={{ 'height': '100%' }}>
                <div className="all-jobs-main">
                    <div className="flex justify-between gap-5">
                        <div className="show-all-jobs scroll-container" id="company-jobs">
                            <JobListView 
                                props={{
                                    filteredJobs: allJobs, 
                                    limit: 100, 
                                    clickedJob: clickedJob, 
                                    isMobileScreen: false, 
                                    handleClickedJob: handleClickedJob
                                }} 
                            />
                        </div>
                        {!isMediumScreen && (
                            <div className='ml-5 mr-8 mt-4'>
                                <JobDetails props={{ job: job, handleApplyJob: () => handleApplyJob(job.id) }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isMediumScreen && showMobileModal && (
                <MobileJobDetailsModal 
                    job={job} 
                    toggleModal={toggleMobileModal} 
                    handleApplyJob={() => handleApplyJob(job.id)}
                    isApplied={isApplied(job.id)}
                />
            )}
        </div>
    );
}

export default Page;