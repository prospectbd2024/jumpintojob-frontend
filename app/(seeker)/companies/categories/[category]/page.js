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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies?${queryString}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data.data);
          });
      },[])

      
    useEffect(()=>{
        setCompanies([])
    },[])

    useEffect(()=>{
        fetchCompanes(category)
    },[category]);


    return (
        <CompanyListView props={{companies}} />
    );
}

export default Page;
