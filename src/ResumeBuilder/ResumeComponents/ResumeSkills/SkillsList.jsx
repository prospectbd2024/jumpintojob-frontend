import { SkillContext } from '@/Contexts/SkillContext';
import { UserContext } from '@/Contexts/UserContext'
import React, { useContext } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

function ShowSkillList({onDeleteFunctin,type}) {
  const {userProfileData} = useContext(UserContext);

  return (
    <ul className="skills-list">
    {userProfileData && userProfileData[type]?.map((skill, index) => (
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