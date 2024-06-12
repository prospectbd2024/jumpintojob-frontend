'use client'
import AddButton from '@/Components/Buttons/AddButton'
import ModalBox from '@/Components/UserProfile/Qualifications/ModalBox'
import React, { useState,useCallback,useEffect } from 'react'
import './ResumeOthers.css'
import AddMore from './AddMore'
import {FaTrashAlt} from 'react-icons/fa'
import { useResumeContext } from '@/Contexts/ResumeContext'
import Availability from '@/Components/UserProfile/Availability'


function ResumeOthers() {

    const { more, manageMore} = useResumeContext();
    const [  formData, setFormData] = useState({})
    
    const [inputType,setInputType] = useState("Project")
    const handleChange = (e)=>{
        setInputType(e.target.value)
    }

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
        setFormData({})
        manageModal({ display: "none" });
      }, []);
    

    const [modal, manageModal] = useState({
        display: "none",
        title: "Loading",
        state: "new",
      });
      const removeItem = useCallback(
        (id) => {
          manageMore(prev=>{
           return prev.filter((element,index)=>{
            return index!=id;
           })
          })
    
        }
      )
    
      const onSave =()=>{
        manageMore(prev => ([...prev,formData])) 
        closeModal()
      }


  return (
    <div>
      <h3 style={{display: 'block',
fontSize: '1.17em',
marginBlockStart: '1em',
marginBlockEnd: '1em',
marginInlineStart: '0px',
marginInlineEnd: '0px',
fontWeight: 'bold',
unicodeBidi: 'isolate'}}>Others</h3>
      <div>
      {more.map((el,index) => (
            <div className="education-container" key={index}>
              <div className="top-right-icons-container">
                <div className="top-right-icons">
                <FaTrashAlt className="minus-icon" onClick={()=>{removeItem(index)}}/>
                </div>
              </div>
              <p className="institution-name">{el.type} Title :  {el.title}</p>
              <p hidden={!el.startDate} ><span className="label">Start Year:</span> {el.startDate}</p>
              <p hidden={!el.endDate || el.present}><span className="label">End Year:</span> {el.endDate}</p>
              <p hidden={!el.date}><span className="label">Date:</span> {el.date}</p>
              <p hidden={!el.journal}><span className="label">Journal:</span> {el.journal}</p>
              <p hidden={!el.description}><span className="label">Descriptions:</span> {el.description}</p>
              <p hidden={!el.abstract}><span className="label">Abstract:</span> {el.abstract}</p>
            </div>
          ))}
      </div>
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
        <li>
          <Availability />
        </li>
    </ul>
    <ModalBox props={{ ...modal, onSave: onSave, onClose: closeModal }}>
        <AddMore  props={{inputType,formData, setFormData}} />
      </ModalBox>
    <div>
        <AddButton onClick={()=>showModal('Add '+inputType,'add')}/>
     </div>
</div>
  )
}

export default ResumeOthers