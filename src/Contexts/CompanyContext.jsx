"use client"
import React,{useContext,createContext, useState,useEffect, useCallback, cache} from 'react'


export const companyContext = createContext();
export const useCompanyContext = ()=> useContext(companyContext);



function CompanyContext({children}) {

    const [companies, setCompanies] = useState([]);
    const [featuredCompanies, setFeaturedCompanies] = useState([]);
 
    
    const fetchCompanes = useCallback((category_id)=>{
      const queryParams = {
        category_id: category_id
      };
      const queryString = new URLSearchParams(queryParams).toString();
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies?${queryString}`)
        .then((res) => res.json())
        .then((data) => {
          setCompanies(data.data??[]);
           
        });
    },[])

    useEffect(() => {
      fetchCompanes('all-industries');
      }, []);

      
      
    useEffect(() => { 
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/featured`)
        .then((res) => res.json())
        .then((data) => {
          setFeaturedCompanies(data.data??[]);
           
        });
      }, []);
  return (
    <companyContext.Provider value={ { companies, setCompanies,featuredCompanies, setFeaturedCompanies}}>
        {children}
    </companyContext.Provider>
  )
}

export default CompanyContext