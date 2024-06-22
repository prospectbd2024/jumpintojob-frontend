"use client";
import React from 'react'
import {useRouter,useParams} from 'next/navigation'
 
function CategoryList({props}) {
    const {categories, selectedCategory} = props;
    const router = useRouter();

    const { category } = useParams();
    const categorySlug = category;
 
  return (
    <div className="companies-tablist">
    <div
     style={{textDecoration :'none' , marginTop : '10px'}}
 
    onClick={()=>{
      router.push('/companies/categories/all-industries');
    }}
      key={"all"}
      className={`${
        selectedCategory == "all"
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
          onClick={()=>{
            router.push('/companies/categories/'+category.category_slug);
          }}
          className={`${
            categorySlug ==category.category_slug
              ? "company-category-selected"
              : "company-tab"
          }`}
        >
          
          {category.category_name}  ({category.jobCount})
        </div>
      );
    })}
    <div
      key={"others"}
      href='/companies/categories/others'
      
      onClick={()=>{
        router.push('/companies/categories/others');
      }}
      className={`${
        selectedCategory == "others"
          ? "company-category-selected"
          : "company-tab"
      }`}
    >
        Others 
    </div>
  </div>
  )
}

export default CategoryList
