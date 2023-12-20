'use client'
import React, { useState } from 'react'

function SkillRating({props}) {
    const {setCurrentSkill,currentSkill} =props;

    const [rating,setRating] = useState(0)
  return (
    <div>          
    <label htmlFor="rating">Rate your skill</label>
    <input
      type="text"
      value={rating}
      onChange={(e) => setCurrentSkill(e.target.value)}
    />
    </div>
  )
}

export default SkillRating