"use client"
import React,{useContext,createContext, useState,useEffect, useCallback} from 'react'


export const companyContext = createContext();
export const useCompanyContext = ()=> useContext(companyContext);



function CompanyContext({children}) {
    const [companies, setCompanies] = useState([]);
    const [categories, setCategories] = useState([]);
    const getCompanies = useCallback((id) => {
        const queryParams = {
          category_id: id
        };
        const queryString = new URLSearchParams(queryParams).toString();
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies?${queryString}`);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies?${queryString}`)
          .then((res) => res.json())
          .then((data) => {
            setCompanies(data.data);
          });
      });
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`)
          .then((res) => res.json())
          .then((data) => {
            setCategories(data.data);
          });
        getCompanies('all');
      }, []);
  return (
    <companyContext.Provider value={ {getCompanies,companies, setCompanies,categories, setCategories}}>
        {children}
    </companyContext.Provider>
  )
}

export default CompanyContext