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
    const [jobPage, setJobPage] = useState({currentPage: 1, type: 'fetch' , totalPages: 10 , status : 'new'});
    const [shouldShowButton , setShowButton] = useState(true);
    const [query,setQuery] = useState("")
    const [bookMarkedJobs, setBookMarkedJobs] = useState([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular`)
            .then(res => res.json())
            .then(data => {
                setAllJobs(data.data);
                setJobPage({type: 'get', ...data.pagination })
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle errors appropriately (e.g., show an error message to the user)
            });
    }, []);

    const getMoreJobs= (page)=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular?page=${page}`)
        .then(res => res.json())
        .then(data => {
            setAllJobs(data.data);
            setJobPage({type: 'get', ...data.pagination , status : 'done' })
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors appropriately (e.g., show an error message to the user)
        });
    }

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
    },[selectedJob,allJobs])

    
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
    
   

    useEffect(()=>{
        if(jobPage.type=='get' && jobPage.status=='process'){
            getMoreJobs(jobPage.currentPage)
            // console.log('getting jobs');
        }
        if(jobPage.type=='search'&& jobPage.status=='process'){
            filterJobs(query)
            // console.log('search jobs');
        }

    },[jobPage])


    useEffect(()=>{
        if (query!=''){
            filterJobs(query)
            setJobPage(prev=>({...prev, type:'search' , currentPage : 1}))
        }
    },[query])

    const filterJobs =(query)=>{
        // console.log(query);

        try{
            // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular/search?${query}&page=${jobPage.currentPage}`);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular/search?${query}&page=${jobPage.currentPage}`)
            .then(res => res.json())
            .then(data => {
                setAllJobs(data.data);
                setJobPage({type : 'search', ...data.pagination , status : 'done'})
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
    <jobContext.Provider value={{
        allJobs, setAllJobs,
        selectedJob,setSelectedJob,
        getJob,selectJob,
        handleClickedJob,
        clickedJob, setClickedJob,
        jobPage, setJobPage,
        shouldShowButton , setShowButton,
        query,setQuery,
        bookMarkedJobs,setBookMarkedJobs
        }}>
        {children}
    </jobContext.Provider>
  )
}

export default JobContext