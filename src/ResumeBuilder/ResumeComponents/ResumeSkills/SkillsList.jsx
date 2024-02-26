import { SkillContext } from '@/UserContext/SkillContext';
import { UserContext } from '@/UserContext/UserContext'
import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

function ShowSkillList({onDeleteFunctin,type}) {
  const {resumeData} = useContext(UserContext);

  return (
    <ul className="skills-list">
    {resumeData && resumeData[type]?.map((skill, index) => (
      <li className="skill" key={index}>
        <p>name : {skill.name}, rating : {skill.rating}</p>
        <button onClick={() => onDeleteFunctin(index)}>
          <FaTrashAlt />
        </button>
      </li>
    ))}
  </ul>
  )
}

export default ShowSkillList