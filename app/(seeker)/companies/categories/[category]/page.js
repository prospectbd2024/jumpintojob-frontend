"use client"
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCompanyContext } from '@/Contexts/CompanyContext';
import CompanyListView from '@/Components/Companies/CompanyListView';

function Page() {
    const {setCompanies,companies} = useCompanyContext();
    const { category } = useParams();
    const fetchCompanes = useCallback((category)=>{
     
        const queryParams = {
          category: category
        };
        const queryString = new URLSearchParams(queryParams).toString();
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies?${queryString}`);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies?${queryString}`)
          .then((res) => res.json())
          .then((data) => {
            setCompanies(data.data);
            console.log(data.data??[]);
          });
      },[])

    
    useEffect(()=>{
        fetchCompanes(category)
    },[category]);

      
 
    return (companies?.length >0?
        <CompanyListView props={{companies}} />
        :<>No {category } jobs found</>
    );
}

export default Page;
