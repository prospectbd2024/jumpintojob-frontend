"use client";
import React, { useCallback, useEffect, useState } from "react";
import CategoryList from "./CategoryList"; 
import { useCompanyContext } from "@/Contexts/CompanyContext";
import { useCategoryContext } from "@/Contexts/CategoryContext";
import '@/Components/Companies/Companies.css'
import {useRouter} from 'next/navigation'
const Companies = ({children}) => {
  const {getCompanies,companies} = useCompanyContext();
  const {jobCategories} = useCategoryContext();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Industries");

 
  return (
    <div className="companies">
      <div className="section-header companies-header">
        <h2>Browse For Companies</h2>
        <p>Lorem aliasg elit. Saepe, alias. Atqudolor?</p>
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
