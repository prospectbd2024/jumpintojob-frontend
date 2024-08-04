"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useJobContext } from '@/Contexts/JobContext'; 
import SearchSection from './SearchSection';
import JobListView from './JobListView'; 
import Pagination from './Pagination';

const AllJobs = ({ children }) => {
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
    <div className="container mx-auto h-full px-8 py-8">
      <SearchSection handleFilteredJobs={handleFilteredJobs} />
      <div className="border-t border-gray-300 pt-6">
        <div className="container grid grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-row gap-6">
              <div className="space-y-4 flex-grow-0 w-1/3">
                <JobListView props={{ filteredJobs, clickedJob, handleClickedJob }} />
                {jobPage.currentPage === 1 && allJobs.length < 10 ? null : (
                  <Pagination jobPage={jobPage} setJobPage={setJobPage} />
                )}
              </div>
              <div className='flex-grow'>
              {children}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
