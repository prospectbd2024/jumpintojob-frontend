'use client'
import { useEffect, useState } from "react";
import SkillListView from "./SkillListView";

const SuggestedSkills = ({onSkillClick}) =>{

  const [suggestedSkills,setSuggestedSkills] =useState([]);

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`).then((res) => res.json()).then(
      (data)=>{
        setSuggestedSkills(data.data)
      }
    )
  },[])
  
  
  return (



  <div className="suggested-skills">
    <p>Suggested based on your profile</p>
    <SkillListView skills={suggestedSkills} onSkillClick={onSkillClick} />
  </div>
);}



export default SuggestedSkills;
