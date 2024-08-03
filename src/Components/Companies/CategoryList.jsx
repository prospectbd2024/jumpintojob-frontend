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
    if (categories?.length > 0) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false); // Set loading to false after delay
      }, 4000); // Example delay of 4 seconds
    }
  }, [categories]);

  if (loading) {
    return <CategoryListSkeleton />; // Render skeleton loading while fetching data
  }

  return (
    <div className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg bg-white p-4 rounded-lg shadow-md sticky top-16 overflow-auto">
      <div className="space-y-2">
        <div
          onClick={() => {
            router.push('/companies/categories/all-industries');
          }}
          className={`cursor-pointer py-3 px-4 rounded-lg text-base ${
            selectedCategory === 'all'
              ? 'border-l-4 border-blue-500 text-blue-500 bg-gray-100 shadow-md'
              : 'border-l-4 border-transparent text-gray-700 hover:border-blue-500 hover:text-blue-500 hover:bg-gray-50 transition-colors'
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
            className={`cursor-pointer py-3 px-4 rounded-lg text-base ${
              categorySlug === category.category_slug
                ? 'border-l-4 border-blue-500 text-blue-500 bg-gray-100 shadow-md'
                : 'border-l-4 border-transparent text-gray-700 hover:border-blue-500 hover:text-blue-500 hover:bg-gray-50 transition-colors'
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
          className={`cursor-pointer py-3 px-4 rounded-lg text-base ${
            selectedCategory === 'others'
              ? 'border-l-4 border-blue-500 text-blue-500 bg-gray-100 shadow-md'
              : 'border-l-4 border-transparent text-gray-700 hover:border-blue-500 hover:text-blue-500 hover:bg-gray-50 transition-colors'
          }`}
        >
          Others
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
