"use client";
import React, { useCallback, useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import CompanyListView from "./CompanyListView";
import { useCompanyContext } from "@/Contexts/CompanyContext";
import { useCategoryContext } from "@/Contexts/CategoryContext";
import '@/Components/Companies/Companies.css'
const Companies = () => {
  const {getCompanies,companies} = useCompanyContext();
  const {jobCategories} = useCategoryContext();

  const [selectedCategory, setSelectedCategory] = useState("All Industries");

  const handleCategoryChange = useCallback(
    (event) => {

      setSelectedCategory(event);
      getCompanies(event);

    },
    [setSelectedCategory]
    );

  return (
    <div className="companies">
      <div className="section-header companies-header">
        <h2>Browse For Companies</h2>
        <p>Lorem aliasg elit. Saepe, alias. Atqudolor?</p>
      </div>
      <div className="companies-content container">
        <div className="companies-tabs">
        <CategoryList props={{handleCategoryChange, selectedCategory, categories: jobCategories}} />
        <CompanyListView props={{companies}} />


        </div>
      </div>
    </div>
  );
};

export default Companies;
