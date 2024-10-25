"use client"
import { useParams, usePathname, useRouter } from 'next/navigation';
import React,{useContext,createContext, useState,useEffect, useCallback} from 'react'
import { useUserContext } from './UserContext';


export const jobContext = createContext();
export const useJobContext = ()=> useContext(jobContext);



function JobContext({children}) {
    const {id} = useParams();
    const pathname = usePathname();
    const router = useRouter();
    const [allJobs, setAllJobs] = useState([]);
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [selectedJob,setSelectedJob]= useState({});
    const [clickedJob, setClickedJob] = useState();
    const [jobPage, setJobPage] = useState({currentPage: 1, type: 'fetch' , totalPages: 10 , status : 'new'});
    const [shouldShowButton , setShowButton] = useState(true);
    const [query,setQuery] = useState("")
    const [bookMarkedJobs, setBookMarkedJobs] = useState([])
    const [Loading, setLoading] = useState(true);
    const [isFeaturedJobLoading,setFeaturedJobsLoading] = useState(true)
    const [NewJobLoadingFlag, setNewJobLoadingFlag] = useState(false);
    const [shouldWait,setShouldWait] = useState(false)
   const {userData} = useUserContext();

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
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular/featured-jobs`)
            .then(res => res.json())
            .then(data => {
                setFeaturedJobs(data.data);
                setJobPage({type: 'get', ...data.pagination }) 
                setTimeout(() => {
                    setFeaturedJobsLoading(false)
                }, 1000);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle errors appropriately (e.g., show an error message to the user)
            });
    }, []);
    useEffect(() => {
        if(userData){
            getBookMarkJobs()
        }
    
      
    }, [])
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
    const getNewJobsAndReplace = async (page) => {

        setNewJobLoadingFlag(true);
        let prevScrollToBottom = document.documentElement.scrollHeight;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular?page=${page}`);
            const newData = await response.json();
            setAllJobs(allJobs => [...allJobs, ...newData.data]);
            setJobPage({type: 'get', ...newData.pagination })
            setTimeout(()=>{
                setShouldWait( prev => false)
            },5000)
            
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setNewJobLoadingFlag(false) 
               
             
        }
    };


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

        if(pathname.search('/jobs/jobdetails')==-1){
            router.push("/jobs/jobdetails/"+e)
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

    const getBookMarkJobs = () => {
        let userId = userData?.data?.user?.user_id;
    
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmark/${userId}`)
                .then(res => res.json())
                .then(data => {
                    setBookMarkedJobs(data.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } catch (e) {
            console.log(e);
        }
    };
    

    const updateBookMarkJobs = (jobId) => {
        let userId = userData?.data?.user?.user_id;
    
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmark/${userId}/update`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "Accept" : 'application/json'
                },
                body: JSON.stringify({ job_id: jobId }),
            })
                .then(res => res.json())
                .then(data => {
                    // setBookMarkedJobs(data.data); // Update state with new bookmarks 

                    
                })
                .catch(error => {
                    console.error('Error updating bookmark:', error);
                });
        } catch (e) {
            console.log(e);
        }
    };
    

    const filterJobs =(query)=>{
         

        try{
             
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
        bookMarkedJobs,setBookMarkedJobs, getMoreJobs, getNewJobsAndReplace, Loading, NewJobLoadingFlag,
        shouldWait,setShouldWait,
        updateBookMarkJobs,
        featuredJobs, setFeaturedJobs,
        isFeaturedJobLoading

        }}>
        {children}
    </jobContext.Provider>
  )
}

export default JobContext