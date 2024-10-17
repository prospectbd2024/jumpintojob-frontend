"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useJobContext } from '@/Contexts/JobContext';
import SearchSection from './SearchSection';
import JobListView from './JobListView';

const AllJobs = ({ children }) => {
    const {
        allJobs, clickedJob,
        setAllJobs, handleClickedJob,
        jobPage, setJobPage,
        query, setQuery,
        getNewJobsAndReplace, NewJobLoadingFlag
    } = useJobContext();

    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        setFilteredJobs(allJobs);
    }, [allJobs]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                >= document.documentElement.offsetHeight - 500
                && !NewJobLoadingFlag
            ) {
                getNewJobsAndReplace(jobPage.currentPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [jobPage.currentPage, getNewJobsAndReplace]);

    const handleFilteredJobs = useCallback((event) => {
        event.preventDefault();
        const searchKey = event.target.jobTitle.value.toLowerCase();
        const location = event.target.jobLocation.value.toLowerCase();
        setQuery(createQueryString({searchKey, location}));
        
        const filtered = allJobs.filter(job => 
            job.job_title.toLowerCase().includes(searchKey) &&
            job.address.toLowerCase().includes(location)
        );
        
        setFilteredJobs(filtered);
        setSearchPerformed(true);
    }, [allJobs, setQuery]);

    const createQueryString = (paramsObj) => {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(paramsObj)) {
            if (value) {
                params.set(key, value);
            }
        }
        return params.toString();
    };

    return (
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-20">
                <SearchSection handleFilteredJobs={handleFilteredJobs}/>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 xl:w-1/3 mb-6 lg:mb-0 mt-4">
                    <JobListView 
                        props={{
                            filteredJobs, 
                            clickedJob, 
                            handleClickedJob, 
                            searchPerformed
                        }}
                    />
                </div>
                <div className="hidden lg:block lg:w-1/2 xl:w-2/3 relative">
                    <div className="sticky top-4" style={{ height: 'calc(100vh - 2rem)' }}>
                        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 mt-4 overflow-y-auto" style={{ maxHeight: '100%' }}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllJobs;