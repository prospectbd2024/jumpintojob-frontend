"use client";
import React, {   useState } from "react";
import CategoryList from "./CategoryList";  
import { useCategoryContext } from "@/Contexts/CategoryContext";
import '@/Components/Companies/Companies.css'
import {useRouter} from 'next/navigation'
const Companies = ({children}) => { 
  const {jobCategories} = useCategoryContext(); 
  const [selectedCategory, setSelectedCategory] = useState("All Industries");

 
  return (
    <div className="companies">
      <div className="section-header companies-header">
        <h2>Browse For Companies</h2>
        <p>Find your dream company</p>
      </div>
      <div className="companies-content container">
        <div className="companies-tabs">
        <CategoryList props={{selectedCategory, categories: jobCategories}} />
        {children}
        </div>
      </div>
    </div>
  );
};

export default Companies;
