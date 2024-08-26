import { useJobContext } from '@/Contexts/JobContext';
import { useUserContext } from '@/Contexts/UserContext';
import React from 'react';
import { HiOutlineBookmark } from 'react-icons/hi';

const SingleJob = ({ job, clickedJob, handleClickedJob }) => {
  const {guestProtection} = useUserContext();
  const { bookMarkedJobs,setBookMarkedJobs} = useJobContext();
  const toggleBookMarks =(e,job)=>{
    e.stopPropagation();
    guestProtection(
      ()=>{ 
        let id = job.id; 
        console.log(bookMarkedJobs);
        
        if(bookMarkedJobs.includes(id)){
          setBookMarkedJobs(prev => prev.filter(jobId => jobId !== id)  )  
        } else {
            setBookMarkedJobs(prev => ([...prev,id]) )
        }
        
      }
    )
    
  }

return (
    <div
      className={`relative rounded-lg p-6 shadow-lg border-b-4 border-transparent transition duration-300 ease-in-out cursor-pointer ${
        clickedJob === job.id ? 'border-gray-800 shadow-2xl' : 'hover:border-gray-300 hover:shadow-xl'
      }`}
      onClick={() => handleClickedJob(job.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{job.job_title}</h2>
        <HiOutlineBookmark
          onClick={(e) => {
            e.stopPropagation();
            toggleBookMarks(e, job);
          }}
          className={`text-lg cursor-pointer w-6 h-6 p-1 rounded-full transition duration-300 ease-in-out ${
            bookMarkedJobs.includes(job.id)
              ? 'bg-gray-300 hover:bg-gray-500 text-gray-900 hover:text-white'
              : 'bg-green-300 hover:bg-green-500 text-gray-900 hover:text-white'
          }`}
        />
      </div>
      <h3 className="text-md font-medium text-gray-700 mb-2">{job.company_name}</h3>
      <p className="text-gray-600 mt-1 leading-relaxed truncate">{job.address}</p>
      <p className="text-gray-700 mt-2 leading-relaxed truncate">{job.description}</p>
      <div className="flex items-center justify-between mt-4">
        <p className="font-semibold bg-blue-100 py-1 px-3 rounded-lg text-blue-800">
          {job.salary} <span className="font-normal">(Estimated)</span>
        </p>
        <p className="text-gray-500 text-sm">22d</p>
      </div>
    </div>
  );
};

export default SingleJob;
