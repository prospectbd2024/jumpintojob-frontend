import React from 'react'

function SkillListView({skills,onSkillClick}) {

  return (
    <ul>
    {skills &&
      skills?.map((skill,index) => {
        return (
          <div key={index}>
            <li onClick={() =>{ onSkillClick(skill)}}   style={{'cursor' : 'pointer' ,'listStyle' : 'none'}} >{skill.name}  </li>
          </div>
        );
      })}
  </ul>
  )
}

export default SkillListView