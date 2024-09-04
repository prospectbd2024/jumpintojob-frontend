import React, { useState, useEffect } from 'react';
import CustomSVG from './CustomSvg';

function Rating({ props, onChange }) {
  const { rating, setRating, mode } = props;
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isHovering, setHovering] = useState(false);

  const handleClick = (value) => {
    if (isAllowed()) {
      setRating(value);
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (isAllowed()) {
      setHoveredRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!isHovering && isAllowed()) {
      setHoveredRating(0);
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
    <div className="flex items-center space-x-0 sm:space-x-1">
      <div className={`text-lg font-bold ${isAllowed() ? 'block' : 'hidden'}`}>
        <p className='text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl'>
          Skill rating<span className="text-red-500">*</span>
        </p>
      </div>
      <div
        className="flex justify-center sm:justify-start"
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
              className={`w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6  ${
                value % 1 !== 0 ? '' : 'scale-x-[-1]'
              } ${value <= (hoveredRating || rating) ? 'fill-yellow-300' : 'fill-white'}`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Rating;