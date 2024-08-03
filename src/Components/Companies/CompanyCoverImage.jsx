import React from 'react';

function CompanyCoverImage({ company }) {
  return (
    <img
      src={company.cover_image}
      alt={company.cover_image ? `${company.name} cover image` : "Company cover image"}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://www.shutterstock.com/shutterstock/photos/2155242945/display_1500/stock-vector-image-coming-soon-no-photo-no-thumbnail-image-available-missing-picture-icon-vector-illustration-2155242945.jpg";
      }}
    />
  );
}

export default CompanyCoverImage;
