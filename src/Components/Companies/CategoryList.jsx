import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; 
import CategoryListSkeleton from '@/Skeletons/CategoryListSkeleton';

function CategoryList({ props }) {
  const { categories, selectedCategory } = props;
  const router = useRouter();
  const { category } = useParams();
  const categorySlug = category;

  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Simulate loading delay (replace with actual data fetching logic)
    if(categories?.length>0){
      setLoading(false)
    }else{
          setTimeout(() => {
            setLoading(false); // Set loading to false after delay
          }, 4000); // Example delay of 2 seconds (2000 milliseconds)
    }
  }, [categories]);

  if (loading) {
    return <CategoryListSkeleton />; // Render skeleton loading while fetching data
  }

  return (
    <div className="companies-tablist">
      {/* Your existing category list rendering logic */}
      {/* Example skeleton loader would be replaced with your actual category list */}
      <div style={{ textDecoration: 'none', marginTop: '10px' }}>
        {/* Example: Render all industries */}
        <div
          onClick={() => {
            router.push('/companies/categories/all-industries');
          }}
          className={`${
            selectedCategory == 'all' ? 'company-category-selected' : 'company-tab'
          }`}
        >
          All Industries
        </div>

        {/* Render categories dynamically */}
        {categories.map((category) => (
          <div
            key={category.category_name}
            onClick={() => {
              router.push('/companies/categories/' + category.category_slug);
            }}
            className={`${
              categorySlug == category.category_slug
                ? 'company-category-selected'
                : 'company-tab'
            }`}
          >
            {category.category_name} ({category.jobCount})
          </div>
        ))}

        {/* Example: Render 'Others' category */}
        <div
          onClick={() => {
            router.push('/companies/categories/others');
          }}
          className={`${
            selectedCategory == 'others' ? 'company-category-selected' : 'company-tab'
          }`}
        >
          Others
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
