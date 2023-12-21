'use client'
import React, { useCallback, useEffect, useState } from 'react'

function SkillRating({setCurrentSkill,currentSkill,rating,setRating}) {


    const increase_rating = useCallback(()=>{
      // console.log(rating)
      if(rating<5){
        setRating(prev=>prev+0.5)
      }
    },[rating,currentSkill]);
    const decrease_rating = useCallback(()=>{
      // alert(rating)
      if(rating>0){
        setRating(prev=>prev-0.5)
        
      }
    },[rating,currentSkill]);

  useEffect(()=>{
    setCurrentSkill(prev => {return {...prev, rating : rating}})
  },[rating])

  return (
    <div>          
    <label htmlFor="rating">Rate your skill</label>
    <div>
      <button onClick={increase_rating}>+</button>
      <button onClick={decrease_rating}>-</button>
    </div>
    <input
      type="text"
      value={rating}
      readOnly
    />
    
    </div>
  )
}

export default SkillRating