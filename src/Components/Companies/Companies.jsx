"use client";
import React, { useCallback, useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import CompanyListView from "./CompanyListView";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Industries");
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
        <CategoryList props={{handleCategoryChange, selectedCategory, categories}} />
        <CompanyListView props={{companies}} />


        </div>
      </div>
    </div>
  );
};

export default Companies;
