"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './AllJobs.css'

import { useUserContext } from '../../Contexts/UserContext';
import { useJobContext } from '@/Contexts/JobContext';
import DefaultJobDetails from './DefaultJobDetails';
import SearchSection from './SearchSection';
import JobListView from './JobListView';
import Link from 'next/link';
import Pagination from './Pagination';




const AllJobs = ({children}) => {

    const {
        allJobs,clickedJob,
        setAllJobs,
        handleClickedJob,
        jobPage, setJobPage,
        query,setQuery
        } =useJobContext()
    const [filteredJobs, setFilteredJobs] = useState([]);
  

    useEffect(() => {
        setFilteredJobs(allJobs)

    }, [allJobs])
    

    const handleFilteredJobs = useCallback( (event) => {

        event.preventDefault();
        const searchKey = event.target.jobTitle.value.toLowerCase();
        const location = event.target.jobLocation.value.toLowerCase();
        setQuery(createQueryString( {searchKey : searchKey, location : location}));
       
    })
    const createQueryString = (paramsObj) => {
        const params = new URLSearchParams();
        
        for (const [key, value] of Object.entries(paramsObj)) {
            if (value && value!=''){
                params.set(key, value);
            }
        }
        return params.toString();
      };
      



    return (
        <div className='all-jobs' style={{'height' : '100%'}}>
            <SearchSection handleFilteredJobs={handleFilteredJobs}/>

            <div className="all-jobs-main" >
                <div className="all-jobs-content container">
                    <div className="show-all-jobs  scroll-container">
                        <JobListView props ={{ filteredJobs : filteredJobs,clickedJob : clickedJob,handleClickedJob }}/>
                       {jobPage.currentPage==1 && allJobs.length<10 && <Pagination jobPage={jobPage} setJobPage={setJobPage} />} 

                    </div>
                    <div>
                     {children}
                    </div>

                </div>
            </div>


        </div>
    );
};

export default AllJobs;