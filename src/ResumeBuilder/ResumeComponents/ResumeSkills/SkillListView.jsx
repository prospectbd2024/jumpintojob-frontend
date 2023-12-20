import React from 'react'

function SkillListView({suggestedSkills, setSuggestedSkills,handleSkillSave,putCurrentSkill}) {

  return (
    <ul>
    {suggestedSkills &&
      suggestedSkills.map((skill,index) => {
        return (
          <div key={index}>
            <li onClick={() => putCurrentSkill(skill)}   style={{'cursor' : 'pointer'}} >{skill.name} </li>
          </div>
        );
      })}
  </ul>
  )
}

export default SkillListView