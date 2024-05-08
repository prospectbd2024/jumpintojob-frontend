import { FaStarHalf } from "react-icons/fa"; 
import { FaRegStarHalf } from "react-icons/fa"; 
import HalfStar from "@/assets/star-half-icon.svg";
// SkillRating.js
import React, { useState,useEffect } from 'react';
import './SkillRating.css'; // Import the CSS file for styling
import CustomSVG from "./CustomSvg";

function Rating({ props,onChange }) {
  const {rating,setRating,mode} = props;
  const [hoveredRating, setHoveredRating] = useState(0); // State to track the hovered rating
  const [isHovering,setHovering] = useState(false);

  // Function to handle click on a star
  const handleClick = (value) => {
    if(isAllowed()){
      setRating(value); // Update the rating state
      onChange(value); // Call the onChange callback with the selected rating
    }
  };

  // Function to handle mouse enter on a star
  const handleMouseEnter = (value) => {
    if(isAllowed()){
      setHoveredRating(value); // Update the hoveredRating state
    }
  };

  // Function to handle mouse leave from a star
  const handleMouseLeave = () => {
      if(!isHovering && isAllowed()){
        setHoveredRating(0); // Reset the hoveredRating state
      }
  };

  useEffect(()=>{
    if(isAllowed()){
      handleMouseLeave();
    }
  },[isHovering])

  const isAllowed=()=>{
    return mode=='rw';
  }
  return (
    <div className="skill-rating">
      <div  style={{display : isAllowed()?'block': 'none'}} className='title'>Skill rating<span style={{color: 'red'}}>*</span></div>
      {/* Render 5 stars */}
      <div onMouseEnter={()=>{setHovering(true)} }  onMouseLeave={()=>{setHovering(false)}}>
        {[0.5,1,1.5, 2,2.5, 3,3.5, 4,4.5, 5].map((value) => (
        <span className='skill-star'  key={value}             onClick={() => handleClick(value)}
        onMouseEnter={() => handleMouseEnter(value)}
        onMouseLeave={handleMouseLeave}>
            <CustomSVG 
            className={`${value%1!=0? 'first-half-star' : 'second-half-star'} ` }   pathClassName={`${value <= (hoveredRating || rating) ? 'star-filled' : 'star-empty'}`}  />
        </span>
          
        ))}
      </div>
    </div>
  );
}

export default Rating;