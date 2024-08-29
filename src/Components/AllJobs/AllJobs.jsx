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
        getNewJobsAndReplace
    } = useJobContext();

    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false); // To track loading state

    useEffect(() => {
        setFilteredJobs(allJobs);
    }, [allJobs]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loadingMore) {
                setLoadingMore(true);
                getNewJobsAndReplace(jobPage.currentPage + 1); // Load next page of jobs
                console.log('Loading more jobs...');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadingMore, jobPage.currentPage, getNewJobsAndReplace]);

    useEffect(() => {
        if (jobPage.status === 'done') {
            setLoadingMore(false);
        }
    }, [jobPage.status]);

    const handleFilteredJobs = useCallback((event) => {
        event.preventDefault();
        const searchKey = event.target.jobTitle.value.toLowerCase();
        const location = event.target.jobLocation.value.toLowerCase();
        setQuery(createQueryString({ searchKey, location }));
    }, [setQuery]);

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
            {/* Search Section with Spacing */}
            <div className="shadow-md py-2.5 lg:py-4 border-b border-gray-300">
                <SearchSection handleFilteredJobs={handleFilteredJobs} />
            </div>

            {/* Main Content Section */}
            <div className="border-t border-gray-300 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Job List View */}
                    <div className="md:col-span-1 space-y-4">
                        <JobListView props={{ filteredJobs, clickedJob, handleClickedJob }} />
                        {loadingMore && <p>Loading more jobs...</p>}
                    </div>

                    {/* Children Content */}
                    <div className="md:col-span-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllJobs;


