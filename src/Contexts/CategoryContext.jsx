"use client"
import React,{useContext,createContext, useState,useEffect, useCallback, cache} from 'react'


export const categoryContext = createContext();
export const useCategoryContext = ()=> useContext(categoryContext);



function CategoryContext({children}) {
    const [jobCategories, setJobCategories] = useState([]);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`)
        .then(res => res.json())
        .then(data => {
            setJobCategories(data.data);
        })
    },[])
  return (
    <categoryContext.Provider value={ {jobCategories, setJobCategories}}>
        {children}
    </categoryContext.Provider>
  )
}

export default CategoryContext