"use client";
import React, {useCallback, useEffect, useState} from 'react';
import {useJobContext} from '@/Contexts/JobContext';
import SearchSection from './SearchSection';
import JobListView from './JobListView';
import Pagination from './Pagination';

const AllJobs = ({children}) => {
    const {
        allJobs, clickedJob,
        setAllJobs, handleClickedJob,
        jobPage, setJobPage,
        query, setQuery
    } = useJobContext();

    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        setFilteredJobs(allJobs);
    }, [allJobs]);

    const handleFilteredJobs = useCallback((event) => {
        event.preventDefault();
        const searchKey = event.target.jobTitle.value.toLowerCase();
        const location = event.target.jobLocation.value.toLowerCase();
        setQuery(createQueryString({searchKey, location}));
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
                <SearchSection handleFilteredJobs={handleFilteredJobs}/>
            </div>

            {/* Main Content Section */}
            <div className="border-t border-gray-300 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Job List View */}
                    <div className="md:col-span-1 space-y-4">
                        <JobListView props={{filteredJobs, clickedJob, handleClickedJob}}/>
                        {jobPage.currentPage === 1 && allJobs.length < 10 ? null : (
                            <Pagination jobPage={jobPage} setJobPage={setJobPage}/>
                        )}
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
