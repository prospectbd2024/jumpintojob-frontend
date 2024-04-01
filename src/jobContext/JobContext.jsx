"use client"
import { useParams, usePathname, useRouter } from 'next/navigation';
import React,{useContext,createContext, useState,useEffect, useCallback} from 'react'


export const jobContext = createContext();
export const useJobContext = ()=> useContext(jobContext);



function JobContext({children}) {
    const {id} = useParams();
    const pathname = usePathname();
    const router = useRouter();
    const [allJobs, setAllJobs] = useState([]);
    const [selectedJob,setSelectedJob]= useState({});
    const [clickedJob, setClickedJob] = useState();
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular`)
            .then(res => res.json())
            .then(data => {
                setAllJobs(data.data);
                console.log(data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle errors appropriately (e.g., show an error message to the user)
            });
    }, []);

    const getJob = useCallback((id)=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular/show/${id}`)
        .then(res => res.json())
        .then(data => {
            setSelectedJob(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors appropriately (e.g., show an error message to the user)
        });
    },[])
    const selectJob = useCallback((id)=>{
        allJobs.map((job)=>{
            if(job.id==id){
                setSelectedJob(job)

            }

        })
    },[selectedJob])

    
    const handleClickedJob = (e) => {
        setClickedJob(e)
        selectJob(e);

        if(pathname.search('/findjobs/jobdetails')==-1){
            router.push("/findjobs/jobdetails/"+e)
        }
        else{
            
            const updatedUrl = pathname.replace(/\/\d+$/, `/${e}`);
            window.history.pushState({}, '', updatedUrl);
        }
  
        
    }
  return (
    <jobContext.Provider value={{allJobs, setAllJobs,selectedJob,setSelectedJob,getJob,selectJob,handleClickedJob,clickedJob, setClickedJob}}>
        {children}
    </jobContext.Provider>
  )
}

export default JobContext