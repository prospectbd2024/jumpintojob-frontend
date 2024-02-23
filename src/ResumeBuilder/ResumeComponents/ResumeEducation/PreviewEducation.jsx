import React, { useCallback, useEffect } from 'react';
import './PreviewEducation.css'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const PreviewEducation = ({ props }) => {
    const {resumeData,state, setState,setResumeData} = props;
    
   useEffect(() => {

    if(state.type =='delete')
          {
            deleteEducation(state.id)
            setState({ ...state,type : 'list-view'})

          }   
    
   }, [state])

    const deleteEducation = useCallback((id)=>{
    const educations = resumeData.educations.filter((item) => item.id !=id );
    setResumeData({...resumeData,educations: educations})
    console.log(educations)
  
      });
     

    return <div >
    {/* {console.log(resumeData)} */}
   
   {resumeData && resumeData.educations.map((education,key)=>{
        const { institution_name, institution_location, degree, education_starting_year, education_graduation_year, field_study,id } = education;
        if (id==0){
            return <div key={id}></div>  //if item is in the  demo data structure 
        }
        return (
            <div className='preview-education' key={id}>
                <div className='preview-number'>
                    <h2>{key}</h2>
                </div>
                <div className='preview-content'>
                    <h4>{degree} in {field_study}</h4>
                    <p>{institution_name}</p>
    
                    <div> 
                        <p>{institution_location}</p>
                        <p>{education_starting_year} - {education_graduation_year}</p>
                    </div>
                </div>
                <div className='preview-actions'>
                    <button className='edit' onClick={() => setState({...state, type : 'update', id : id })}><FaPencilAlt /></button>
                    <button className='delete' onClick={() => setState({...state,type :'delete', id :  id
                
                })}><FaTrashAlt /></button>
                </div>
            </div>
        );
    })}
    
</div> 
};

export default PreviewEducation;