"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './AllJobs.css'

import { useUserContext } from '../../Contexts/UserContext';
import { useJobContext } from '@/Contexts/JobContext';
import DefaultJobDetails from './DefaultJobDetails';
import SearchSection from './SearchSection';
import JobListView from './JobListView';
import Link from 'next/link';
import MoreJobButton from './MoreJobButton';




const AllJobs = ({children}) => {

    const {allJobs,clickedJob,handleClickedJob} =useJobContext()
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [jobsToShow, setJobsToShow] = useState(6)

    const jobsToShowIncrement = 6;

    useEffect(() => {
        setFilteredJobs(allJobs)
    }, [allJobs])
    
    const totalJobs =filteredJobs.length;
    const shouldShowButton = jobsToShow < totalJobs;
    const handleFilteredJobs = useCallback( (event) => {

        event.preventDefault();
        const searchKey = event.target.jobTitle.value.toLowerCase();
        const location = event.target.jobLocation.value.toLowerCase();
        console.log(searchKey,location);
        const query = createQueryString( {searchKey : searchKey, location : location}  );

        filterJob(query)
         
    })
    const createQueryString = (paramsObj) => {
        const params = new URLSearchParams();
        
        for (const [key, value] of Object.entries(paramsObj)) {
          params.set(key, value);
        }
        return params.toString();
      };
      

    const filterJob =(query)=>{

        try{
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular/search/${query}`)
            .then(res => res.json())
            .then(data => {
                setFilteredJobs(data.data);
                // console.log(data.data);
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
                        <JobListView props ={{ filteredJobs : allJobs, limit : jobsToShow ,clickedJob : clickedJob,handleClickedJob }}/>
                        <MoreJobButton props={{shouldShowButton,jobsToShowIncrement,setJobsToShow}}/>

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