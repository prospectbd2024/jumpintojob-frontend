"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Link from "next/link";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Industries");
  const [categories, setCategories] = useState([]);
  const getCompanies = useCallback((id) => {
    console.log(id);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
    getCompanies(12);
  }, []);

  const handleCategoryChange = useCallback(
    (event) => {
      setSelectedCategory(event);
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
          <div className="companies-tablist">
            <div
              key={"all"}
              onClick={() => handleCategoryChange("All Industries")}
              className={`${
                selectedCategory == "All Industries"
                  ? "company-category-selected"
                  : "company-tab"
              }`}
            >
              All Industries
            </div>
            {categories.map((category) => {
              return (
                <div
                  key={category.category_name}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`${
                    selectedCategory == category.id
                      ? "company-category-selected"
                      : "company-tab"
                  }`}
                >
                  {category.category_name}
                </div>
              );
            })}
            <div
              key={"others"}
              onClick={() => handleCategoryChange("Other")}
              className={`${
                selectedCategory == "Other"
                  ? "company-category-selected"
                  : "company-tab"
              }`}
            >
              Other
            </div>
          </div>

          {categories.map((category) => (
            <div className="companies-tabs-content" id={`${category.id}`}>
              {companies.map((company) => (
                <div key={`${company.id}`} className="company-item">
                  <div className="company-item-content">
                    <div className="company-item-content-banner">
                      <img src={company.company_banner} alt="" />
                    </div>
                    <div className="company-item-content-main">
                      <div className="main-items">
                        <img src={company.company_logo} alt="" />
                        <div>
                          <Link href={""}>
                            <h3>{company.company_name}</h3>
                          </Link>
                          <p>Verified Profile</p>
                        </div>
                      </div>
                      <div className="main-items">
                        <p>{company.company_category}</p>
                        <p>Company Size: {company.company_size}</p>
                      </div>
                      <div className="main-items">
                        <p className="company_description">
                          {company.company_description.slice(0, 140)}...
                        </p>
                      </div>
                      <div className="company-item-content-footer">
                        <Link href={""}>
                          <button className="company-button company-details-button">
                            View Details
                          </button>
                        </Link>
                        <Link href={""}>
                          <button className="company-button company-jobs-button">
                            View Jobs
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
