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
        jobPage, setJobPage
        } =useJobContext()
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [query,setQuery] = useState("")

    useEffect(() => {
        setFilteredJobs(allJobs)
        console.log(allJobs);
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
          params.set(key, value);
        }
        return params.toString();
      };
      
    useEffect(()=>{
        filterJobs(query)
    },[query])

    const filterJobs =(query)=>{
        console.log(query);

        try{
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular/search?${query}`)
            .then(res => res.json())
            .then(data => {
                setFilteredJobs(data.data);
                // setJobPage({type : 'search_result', ...data.pagination})
                // console.log({type : 'search_result', ...data.pagination})
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle errors appropriately (e.g., show an error message to the user)
            });
    
        }
        catch(e){
            console.log(e);
        }

    }



    return (
        <div className='all-jobs' style={{'height' : '100%'}}>
            <SearchSection handleFilteredJobs={handleFilteredJobs}/>

            <div className="all-jobs-main" >
                <div className="all-jobs-content container">
                    <div className="show-all-jobs  scroll-container">
                        <JobListView props ={{ filteredJobs : filteredJobs,clickedJob : clickedJob,handleClickedJob }}/>
                        <Pagination jobPage={jobPage} setJobPage={setJobPage} />

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