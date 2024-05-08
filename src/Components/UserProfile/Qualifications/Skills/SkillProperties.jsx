// SkillProperties.js
import React,{useState,useEffect} from 'react';
import SkillRating from './Rating'; // Import the SkillRating component
import './SkillProperties.css'; // Import the CSS file
import HowSkillLearned from './HowSkillLearned';


function SkillProperties({props}) {
  const {setSkill,selectedSkill} = props;
  const [rating, setRating] = useState(0); // State to track the selected rating
  const [learnedFrom, setLearnedFrom] = useState([]);
  useEffect(()=>{
    if(selectedSkill.name){
      setSkill(prev=>({...prev, rating : rating}))
    }
  },[rating])

  useEffect(()=>{
    if(!selectedSkill.rating){
      setRating(0)
    }
  },[selectedSkill])
  return (
    <div className="skill-properties-container">
      <SkillRating  props={{rating,setRating}}  onChange={()=>{ }} /> {/* Render the SkillRating component */}
       <HowSkillLearned props={{learnedFrom, setLearnedFrom}}/>
    </div>
  );
}

export default SkillProperties;
