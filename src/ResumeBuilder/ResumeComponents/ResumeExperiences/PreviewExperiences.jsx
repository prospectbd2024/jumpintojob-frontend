"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const PreviewExperiences = ({props}) => {



    const {resumeData ,setResumeData,state,setState} = props;
    useEffect(() => {
        if(state.type =='delete')
              {
                deleteExperience(state.id)
                // console.log(state)
                setState({...state, type : 'list-view'})

    
              }

        
       }, [state])
    
    

        const deleteExperience = useCallback((id)=>{
        const filterd_experiences = resumeData.experiences.filter((item) => item.id !=id );
        console.log(filterd_experiences)
        setResumeData( {...resumeData, experiences : filterd_experiences})
    
    });



    return <div>
    {resumeData && resumeData.experiences.map((experience,key) =>{

        
        
        const {job_title, company, job_city, job_country, job_starting_year, job_ending_year,id} = experience;
    if (id==0){
        return <div key={id}></div> // if item is demo education 
    }
        return (
            <div className='preview-education' key={key}>
            <div className='preview-number'>
                <h2>{key}</h2>
            </div>
            <div className='preview-content'>
                <h4>{job_title}</h4>
                <p>{company}</p>

                <div>
                    <p>{job_city} {job_country}</p>
                    <p>{job_starting_year} - {job_ending_year}</p>
                </div>
            </div>
            <div className='preview-actions'>
                <button className='edit' onClick={() => setState({...state,type: 'update', id : id}) }><FaPencilAlt /></button>
                <button className='delete' onClick={() => setState({...state,type: 'delete', id : id})}><FaTrashAlt /></button>
            </div>
        </div>
    );
}
)}</div>
};

export default PreviewExperiences;