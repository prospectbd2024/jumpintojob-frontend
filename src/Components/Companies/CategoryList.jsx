import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CategoryListSkeleton from '@/Skeletons/CategoryListSkeleton';

function CategoryList({ props }) {
  const { categories, selectedCategory, onCategorySelect } = props;
  const router = useRouter();
  const { category } = useParams();
  const categorySlug = category;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories?.length > 0) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  }, [categories]);

  if (loading) {
    return <CategoryListSkeleton />;
  }

  const handleCategoryClick = (slug) => {
    router.push(`/companies/categories/${slug}`);
    if (onCategorySelect) {
      onCategorySelect(); // Close the category list on mobile
    }
  };

  const categoryItem = (cat, isAll = false) => {
    const slug = isAll ? 'all-industries' : cat.category_slug;
    const isActive = categorySlug === slug;

    return (
      <div
        key={isAll ? 'all' : cat.category_name}
        onClick={() => handleCategoryClick(slug)}
        className={`
          cursor-pointer py-3 px-4 rounded-lg text-sm md:text-base mb-2
          transition-all duration-300 ease-in-out
          ${isActive
            ? 'bg-blue-500 text-white shadow-md transform scale-105'
            : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm'
          }
          ${isActive ? 'border-l-4 border-blue-700' : 'border-l-4 border-transparent'}
        `}
      >
        <div className="flex justify-between items-center">
          <span>{isAll ? 'All Industries' : cat.category_name}</span>
          {!isAll && <span className="text-sm font-semibold">{cat.jobCount}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg overflow-hidden">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">Categories</h3>
      <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
        {categoryItem(null, true)}
        {categories.map((cat) => categoryItem(cat))}
        {categoryItem({ category_name: 'Others', category_slug: 'others', jobCount: 0 })}
      </div>
    </div>
  );
}

export default CategoryList;