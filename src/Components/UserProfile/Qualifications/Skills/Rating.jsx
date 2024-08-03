import React, { useState, useEffect } from 'react';
import CustomSVG from './CustomSvg';

function Rating({ props, onChange }) {
  const { rating, setRating, mode } = props;
  const [hoveredRating, setHoveredRating] = useState(0); // State to track the hovered rating
  const [isHovering, setHovering] = useState(false);

  // Function to handle click on a star
  const handleClick = (value) => {
    if (isAllowed()) {
      setRating(value); // Update the rating state
      onChange(value); // Call the onChange callback with the selected rating
    }
  };

  // Function to handle mouse enter on a star
  const handleMouseEnter = (value) => {
    if (isAllowed()) {
      setHoveredRating(value); // Update the hoveredRating state
    }
  };

  // Function to handle mouse leave from a star
  const handleMouseLeave = () => {
    if (!isHovering && isAllowed()) {
      setHoveredRating(0); // Reset the hoveredRating state
    }
  };

  useEffect(() => {
    if (isAllowed()) {
      handleMouseLeave();
    }
  }, [isHovering]);

  const isAllowed = () => {
    return mode === 'rw';
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`text-lg font-bold ${isAllowed() ? 'block' : 'hidden'}`}>
        Skill rating<span className="text-red-500">*</span>
      </div>
      <div
        className="flex space-x-1"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
          >
            <CustomSVG
              className={`${
                value % 1 !== 0 ? 'scale-x-[-1]' : ''
              }`}
              pathClassName={`${value <= (hoveredRating || rating) ? 'fill-yellow-500' : 'fill-gray-300'}`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Rating;
