'use client'
import React, { useCallback, useEffect, useState } from 'react'

function SkillRating({setCurrentSkill,currentSkill,rate_title}) {


    const increase_rating = useCallback(()=>{

      if(currentSkill.rating<5){
        setCurrentSkill(prev => {return {...prev, rating : prev.rating+0.5}})
        console.log(currentSkill)

      }
    },[currentSkill]);
    const decrease_rating = useCallback(()=>{
      if(currentSkill.rating>0){
        setCurrentSkill(prev => {return {...prev, rating : prev.rating-0.5}})
        
      }
    },[currentSkill]);
  return (
    <div>          
    <label htmlFor="rating">{rate_title}</label>
    <div>
      <button onClick={increase_rating}>+</button>
      <button onClick={decrease_rating}>-</button>
    </div>
    <input
      type="text"
      value={currentSkill.rating}
      readOnly
    />
    
    </div>
  )
}

export default SkillRating