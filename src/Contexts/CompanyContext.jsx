"use client"
import React,{useContext,createContext, useState,useEffect, useCallback, cache} from 'react'


export const companyContext = createContext();
export const useCompanyContext = ()=> useContext(companyContext);



function CompanyContext({children}) {

    const [companies, setCompanies] = useState([]);
 
    
    const fetchCompanes = useCallback((category_id)=>{
      const queryParams = {
        category_id: category_id
      };
      const queryString = new URLSearchParams(queryParams).toString();
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies?${queryString}`)
        .then((res) => res.json())
        .then((data) => {
          setCompanies(data.data);
          console.log(data.data);
        });
    },[])

    useEffect(() => {
      fetchCompanes('all-industries');
      }, []);

  return (
    <companyContext.Provider value={ { companies, setCompanies}}>
        {children}
    </companyContext.Provider>
  )
}

export default CompanyContext