'use client'
import React, { useState } from 'react'




function ResumeOthers() {
    const [inputType,setInputType] = useState('projects') 

    const handleChange = (e)=>{
        setInputType(e.target.value)
        console.log(inputType)
    }




  return (
    <div>
    <ul className="addmore">
        <li>
            <input type="radio" value="projects" name="add" checked={inputType=='projects'}   onChange={handleChange}/>
            <label htmlFor="projects">Add projects</label>
        </li>
        <li>
            <input type="radio" value="certificates" name="add" onChange={handleChange}/>
            <label htmlFor="certificates">Add certificates</label>
        </li>
        <li>
            <input type="radio" value="publications" name="add" onChange={handleChange} />
            <label htmlFor="publications">Add publications</label>
        </li>
        <li>
            <input type="radio" value="hobbies" name="add" onChange={handleChange}/>
            <label htmlFor="hobbies">Add hobbies</label>
        </li>
        <li>
            <input type="radio" value="more" name="add" onChange={handleChange}/>
            <label htmlFor="more">Other</label>
            {/* <input type="text" value="more" /> */}
        </li>
    </ul>
    <button className='addmore-btn'>Add New</button>
</div>
  )
}

export default ResumeOthers