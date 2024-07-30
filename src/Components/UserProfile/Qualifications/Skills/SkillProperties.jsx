import React, {useState, useEffect} from 'react';
import SkillRating from './Rating';
import './SkillProperties.css';
import HowSkillLearned from './HowSkillLearned';

function SkillProperties({props}) {
  const {setSkill, selectedSkill} = props;
  const [rating, setRating] = useState(0);
  const [learnedFrom, setLearnedFrom] = useState([]);

  useEffect(() => {
    if(selectedSkill.name){
      setSkill(prev => ({...prev, rating: rating}));
    }
  }, [rating, selectedSkill.name, setSkill]);

  useEffect(() => {
    setSkill(prev => ({...prev, learnedFrom: learnedFrom}));
  }, [learnedFrom, setSkill]);

  useEffect(() => {
    if(!selectedSkill.rating){
      setRating(0);
    }
    if(!selectedSkill.learnedFrom){
      setLearnedFrom([]);
    }
  }, [selectedSkill]);

  return (
    <div className="skill-properties-container">
      <SkillRating props={{rating, setRating, mode: 'rw'}} onChange={() => {}} />
      <HowSkillLearned props={{learnedFrom, setLearnedFrom}} />
    </div>
  );
}

export default SkillProperties;