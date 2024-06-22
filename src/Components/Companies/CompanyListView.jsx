import React from 'react'
import Link from "next/link";
import CompanyCoverImage from './CompanyCoverImage';
import { useUserContext } from '@/Contexts/UserContext';
import CompanyCard from './CompanyCard';

function CompanyListView({props}) {
   const {companies}= props;
   const {userData} = useUserContext();
     
    return (
    <div className="companies-tabs-content">
    {companies.map((company,index)=> <CompanyCard key={index} props={{company}}/> ) }
  </div>
  )
}

export default CompanyListView
