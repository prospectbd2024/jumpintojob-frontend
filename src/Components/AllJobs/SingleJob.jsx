import { useUserContext } from '@/Contexts/UserContext';
import React from 'react';
import { HiOutlineBookmark } from 'react-icons/hi';

const SingleJob = ({ job, clickedJob, handleClickedJob }) => {
  const {guestProtection} = useUserContext();
  const bookMarkJob =(job)=>{
    console.log("book marked!",job);
    
  }
  return (
    <div
      className={`relative rounded-lg p-4 shadow-md border-b-4 border-transparent transition duration-300 ease-in-out cursor-pointer ${
        clickedJob === job.id ? 'border-gray-600 shadow-md' : 'hover:border-gray-300 hover:shadow-lg'
      }`}
      onClick={() => handleClickedJob(job.id)}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg text-gray-900 mb-1">{job.job_title}</h2>
        <HiOutlineBookmark
        onClick={ (e)=>{  e.stopPropagation() ;   guestProtection(()=> bookMarkJob(job) )}}
          className="text-gray-900 cursor-pointer w-[1.5rem] h-[1.5rem] bg-green-300 p-1 rounded-full transition duration-300 ease-in-out hover:text-white hover:bg-green-600"
        />
      </div>
      <h3 className="text-sm text-gray-600">{job.company_name}</h3>
      <p className="text-gray-700 mt-2 leading-relaxed">{job.address}</p>
      <p className="text-gray-700 mt-2 leading-relaxed">{job.description.slice(0, 100)}...</p>
      <div className="flex items-center justify-between mt-4">
        <p className="font-bold bg-blue-100 py-1 px-3 rounded">
          {job.salary} <span className="font-medium">(Estimated)</span>
        </p>
        <p className="text-gray-600">22d</p>
      </div>
    </div>
  );
};

export default SingleJob;
