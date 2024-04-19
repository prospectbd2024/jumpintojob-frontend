"use client"
import React,{useContext,createContext, useState,useEffect, useCallback, cache} from 'react'


export const companyContext = createContext();
export const useCompanyContext = ()=> useContext(companyContext);



function CompanyContext({children}) {

    const [companies, setCompanies] = useState([]);
    const [cachedCategoryCompanies,addCachedCategoryCompanes] = useState([]);

    const handleCachedCompanies = useCallback((category_id)=>{
      // console.log(category_id);
      let flag = false;
      let companies = [];
      cachedCategoryCompanies.map((categoryCompanies)=>{
        if(categoryCompanies.category_id==category_id){
          flag = true;
          companies = categoryCompanies.companies;
        }
      })
      if(!flag){
        fetchCompanes(category_id)
      }
      else{
        setCompanies(companies)
      }
    },[cachedCategoryCompanies])
    const getCompanies = useCallback((id) => {
      handleCachedCompanies(id)
      });
    
    const fetchCompanes = useCallback((category_id)=>{
      const queryParams = {
        category_id: category_id
      };
      const queryString = new URLSearchParams(queryParams).toString();
      // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies?${queryString}`);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies?${queryString}`)
        .then((res) => res.json())
        .then((data) => {
          setCompanies(data.data);
          let temp = cachedCategoryCompanies;
          temp.push({category_id : category_id , companies : data.data})
          addCachedCategoryCompanes(temp);
        });
    },[])

    useEffect(() => {
        getCompanies('all');
      }, []);
  return (
    <companyContext.Provider value={ {getCompanies,companies, setCompanies}}>
        {children}
    </companyContext.Provider>
  )
}

export default CompanyContext