import React from 'react'

function CategoryList({props}) {
    const {categories,handleCategoryChange, selectedCategory} = props;
  return (
    <div className="companies-tablist">
    <div
      key={"all"}
      onClick={() => handleCategoryChange("all")}
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
      onClick={() => handleCategoryChange("others")}
      className={`${
        selectedCategory == "others"
          ? "company-category-selected"
          : "company-tab"
      }`}
    >
      Other
    </div>
  </div>
  )
}

export default CategoryList
