"use client";
import React, { useState } from "react";
import CategoryList from "./CategoryList";  
import { useCategoryContext } from "@/Contexts/CategoryContext";
// import '@/Components/Companies/Companies.css'; // If you still need some custom CSS

const Companies = ({children}) => { 
  const { jobCategories } = useCategoryContext(); 
  const [selectedCategory, setSelectedCategory] = useState("All Industries");

  return (
    <div className="my-5 container mx-auto">
      <div className="section-header mb-5 text-center">
        <h2 className="text-2xl font-semibold">Browse For Companies</h2>
        <p className="text-gray-600">Find your dream company</p>
      </div>
      <div className="container grid grid-cols-[350px_auto] gap-8">
        <CategoryList props={{selectedCategory, categories: jobCategories}} />
        {children}
      </div>
    </div>
  );
};

export default Companies;
