'use client'
import AddButton from '@/Components/Buttons/AddButton'
import ModalBox from '@/Components/UserProfile/Qualifications/ModalBox'
import React, { useState,useCallback } from 'react'
import './ResumeOthers.css'
import AddMore from './AddMore'



function ResumeOthers() {
    const [inputType,setInputType] = useState('Project') 

    const handleChange = (e)=>{
        setInputType(e.target.value)
    }
    const [more,manageMore] = useState([]);
    const showModal = useCallback(
        (title, state, index) => {

          manageModal({
            title: title,
            display: "block",
            state: state,
            index: index,
          });
        },
        []
      );
      const closeModal = useCallback(() => {

        manageModal({ display: "none" });
      }, []);
    

    const [modal, manageModal] = useState({
        display: "none",
        title: "Loading",
        state: "new",
      });

  return (
    <div>
    <ul className="addmore">
        <li>
            <input type="radio" id="projects" value="Project" name="add" checked={inputType=='Project'}   onChange={handleChange}/>
            <label htmlFor="projects">Add projects</label>
        </li>
        <li>
            <input type="radio" id="certificates" value="Certificate" name="add" onChange={handleChange}/>
            <label htmlFor="certificates">Add certificates</label>
        </li>
        <li>
            <input type="radio" value="Publication"   id="publications"name="add" onChange={handleChange} />
            <label htmlFor="publications">Add publications</label>
        </li>
        <li>
            <input type="radio" value="Other"  id="more" name="add" onChange={handleChange}/>
            <label htmlFor="more">Other</label>
            {/* <input type="text" value="more" /> */}
        </li>
    </ul>
    <div>
        <AddButton onClick={()=>showModal('Add '+inputType,'add')}/>
      </div>
    <ModalBox props={{ ...modal, onSave: ()=>{console.log("hi there");}, onClose: closeModal }}>
        <AddMore  props={{inputType,more,manageMore}} />
      </ModalBox>
</div>
  )
}

export default ResumeOthers