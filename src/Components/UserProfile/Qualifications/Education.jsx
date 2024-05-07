"use client"
import React,{useCallback,useState,useEffect} from "react";
import { HiAcademicCap, HiX, HiMinus } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
// import EducationFields from "@/ResumeBuilder/ResumeComponents/ResumeEducation/EducationFields";
import AddEducation from "@/ResumeBuilder/ResumeComponents/ResumeEducation/AddEducation";
import "./Education.css"; // Import CSS file
import { useModalContext } from "@/Contexts/ModalContext";
import ModalBox from "./ModalBox";

const Education = ({ props }) => {

  const { educations,setEducations } = props;
  const [education,setEducation] = useState({id : false});
  const [modal,manageModal] = useState({display :  'none' ,title : 'Loading' , onSave:()=>{} ,onClose: ()=>{} });
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


const showModal =useCallback(( title )=>{
  manageModal(prev => 
    ({
      title : title ,display : 'block'
    })
  )
},[education])



const closeModal=useCallback (()=>{
  manageModal(
    {
     display : 'none'
    }
  )
},[education])


const saveChanges =useCallback(()=>{
  validation()
  
  console.log(education,educationErrors,validation());
  
},[education,educationErrors])

const validation = useCallback(()=>{
  if(!education?.institution_name){
    setEducationErrors((prev)=>{
      return {
        ...prev,institution_name : 1
      }
    })
    return false
  }
  else{
    setEducationErrors((prev)=>{
      return {
        ...prev,institution_name : 0
      }
    })
  }
  if(!education?.degree){
    setEducationErrors((prev)=>{
      return {
        ...prev,degree : 1
      }
    })
    return false
  }else{
    setEducationErrors((prev)=>{
      return {
        ...prev,degree : 0
      }
    })
    
  }
  if(!education?.field_study){
    setEducationErrors((prev)=>{
      return {
        ...prev,field_study : 1
      }
    })
    return false
  }
  else{
    setEducationErrors((prev)=>{
      return {
        ...prev,field_study : 0
      }
    })
  }
  return true
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
                <HiMinus className="minus-icon" onClick={()=>{removeEduction(index)}} />
              </div>
              <p className="institution-name">{education.institution_name}</p>
              <p>{education.institution_location}</p>
              <p><span className="label">Degree:</span> {education.degree}</p>
              <p><span className="label">Field of Study:</span> {education.field_study}</p>
              <p><span className="label">Start Year:</span> {education.education_starting_year}</p>
              <p><span className="label">Graduation Year:</span> {education.education_graduation_year}</p>
              <p><span className="label">Achievements:</span> {education.education_achievements}</p>
              <div className="bottom-right-icons">
                <FaPencilAlt
                  className="edit-icon"
                  onClick={() => {
                    manageModal({
                      title: "Edit Education",
                      display: "block",
                      body: (
                        <AddEducation props={{education,setEducation }} />
                      ),
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className='no-educations'>Please add education</div>
      )}

      <div className="add-education" onClick={()=>showModal('Add Education')}>
        <p className='add-education-text'>Add Education</p>
        <button className="add-button">+</button>
      </div>
      <ModalBox props={modal} onSave={saveChanges}  onClose={closeModal}>
            <AddEducation props={{ education, setEducation,saveChanges,educationErrors }} />
      </ModalBox>

    </>
  );
};

export default Education;
