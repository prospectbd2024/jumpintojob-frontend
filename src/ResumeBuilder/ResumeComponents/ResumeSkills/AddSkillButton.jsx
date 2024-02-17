import { SkillContext } from '@/UserContext/SkillContext';
import React, { useCallback, useContext } from 'react'
import { HiPlus } from 'react-icons/hi'

function AddSkillButton() {
    const {handleShowModal} = useContext(SkillContext);

    const showSkillModal = useCallback(()=>{
        handleShowModal(true)
        console.log('yes')

    },[]);
  return (
    <div className="add-new-skill" onClick={showSkillModal}>
    <h4>Add skill</h4>
    <button>
      <HiPlus />
    </button>
  </div>
  )
}

export default AddSkillButton