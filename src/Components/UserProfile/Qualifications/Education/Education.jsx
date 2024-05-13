"use client"
import { FaTrashAlt } from "react-icons/fa"; 
import React,{useCallback,useState} from "react";
import { HiAcademicCap } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import AddEducation from "@/ResumeBuilder/ResumeComponents/ResumeEducation/AddEducation";
import "./Education.css"; // Import CSS file
import ModalBox from "../ModalBox";
import AddButton from "@/Components/AddButton/AddButton";

const Education = ({ props }) => {

  const { educations,setEducations } = props;
  const [education,setEducation] = useState({id : false});
  const [modal,manageModal] = useState({display :  'none' ,title : 'Loading' , state : 'new' });
  const [educationErrors, setEducationErrors] = useState({});

  const removeEduction = useCallback(
    (id) => {
      setEducations(prev=>{
       return prev.filter((education,index)=>{
        return index!=id;
       })
      })

    },
    [educations],
  )


const showModal =useCallback(( title ,state,index)=>{
  if(state=='update'){
    setEducation(educations[index])
  }
  manageModal(prev => 
    ({
      title : title ,display : 'block',state : state , index : index
    })
  )
},[education])



const closeModal=useCallback (()=>{
  setEducation({})
  setEducationErrors({})
  manageModal(
    {
     display : 'none'
    }
  )
},[education])


const saveChanges =useCallback(()=>{
  validation()
  if (validation()){
    if(modal.state=='update'){
      updateEducation(modal.index, education)
    }
    else{
      setEducations((prev)=>{return [
        ...prev,education
      ]})
    }
    closeModal();
  }
  else{
    console.log(educationErrors);
  }

},[education,educationErrors])

const updateEducation= useCallback((index,education)=>{

  let temp = educations.map((element,i)=>{
    if(i==index){
      return education;
    }
    return element
  })
  setEducations(temp)

},[educations])

const validation = useCallback(()=>{

  const required = ['institution_name','degree','field_study'];
  let flag = true;

  required.forEach(element => {
    if(!education[element]){
      setEducationErrors((prev)=>{
        return {
          ...prev,[element] : 1
        }
      })
       flag= false;
    }
    else{
      setEducationErrors((prev)=>{
        return {
          ...prev,[element] : 0
        }
      })
    }
  });

  return flag;
},[education,educationErrors])



  return (
    <>
      {educations && educations.length > 0 ? (
        <>
          <div className="header">
            <HiAcademicCap /> Educations
          </div>
          {educations.map((education,index) => (
            <div className="education-container" key={education.institution_name}>
              <div className="top-right-icons">
                <FaTrashAlt className="minus-icon" onClick={()=>{removeEduction(index)}}/>
              </div>
              <p className="institution-name">{education.institution_name}</p>
              <p>{education.institution_location}</p>
              <p><span className="label">Degree:</span> {education.degree}</p>
              <p><span className="label">Field of Study:</span> {education.field_study}</p>
              <p><span className="label">Start Year:</span> {education.education_starting_year}</p>
              {
                education.education_graduation_year &&

              <p><span className="label">Graduation Year:</span> {education.education_graduation_year}</p>
              }
              <p><span className="label">Achievements:</span> {education.education_achievements}</p>
              <div className="bottom-right-icons">
                <FaPencilAlt
                  className="edit-icon"
                  onClick={() => {
                    showModal('Edit Education','update',index)
                  }}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className='no-educations'>Please add education</div>
      )}
      <div>
        <AddButton onClick={()=>showModal('Add Education','add')}/>
      </div>
      {/* <div className="add-education" onClick={}>
        <p className='add-education-text'>Add Education</p>
        <button className="add-button">+</button>
      </div> */}
      <ModalBox props={{...modal , onSave: saveChanges, onClose : closeModal }}  >
            <AddEducation props={{ education, setEducation,saveChanges,educationErrors }} />
      </ModalBox>

    </>
  );
};

export default Education;
