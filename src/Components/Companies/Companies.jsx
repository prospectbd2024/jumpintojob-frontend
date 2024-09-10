"use client";
import React, { useState } from "react";
import CategoryList from "./CategoryList";
import { useCategoryContext } from "@/Contexts/CategoryContext";

const Companies = ({ children }) => {
  const { jobCategories } = useCategoryContext();
  const [selectedCategory, setSelectedCategory] = useState("All Industries");
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

  const handleCategorySelect = () => {
    setIsCategoryListOpen(false);
  };

  return (
    <div className="my-5 container mx-auto px-4">
      <div className="section-header mb-5 text-center">
        <h2 className="text-2xl font-semibold">Browse For Companies</h2>
        <p className="text-gray-600">Find your dream company</p>
      </div>
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsCategoryListOpen(!isCategoryListOpen)}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
        >
          {isCategoryListOpen ? "Close Categories" : "Open Categories"}
        </button>
      </div>
      <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-8">
        <div className={`${isCategoryListOpen ? 'block' : 'hidden'} lg:block mb-6 lg:mb-0`}>
          <CategoryList 
            props={{ 
              selectedCategory, 
              categories: jobCategories,
              onCategorySelect: handleCategorySelect 
            }} 
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Companies;