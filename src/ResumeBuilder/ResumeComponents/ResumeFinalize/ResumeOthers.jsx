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
            <input type="radio" id="projects" value="projects" name="add" checked={inputType=='projects'}   onChange={handleChange}/>
            <label htmlFor="projects">Add projects</label>
        </li>
        <li>
            <input type="radio" id="certificates" value="certificates" name="add" onChange={handleChange}/>
            <label htmlFor="certificates">Add certificates</label>
        </li>
        <li>
            <input type="radio" value="publications"   id="publications"name="add" onChange={handleChange} />
            <label htmlFor="publications">Add publications</label>
        </li>
        <li>
            <input type="radio" value="hobbies"  id="hobbies" name="add" onChange={handleChange}/>
            <label htmlFor="hobbies">Add hobbies</label>
        </li>
        <li>
            <input type="radio" value="more"  id="more" name="add" onChange={handleChange}/>
            <label htmlFor="more">Other</label>
            {/* <input type="text" value="more" /> */}
        </li>
    </ul>
    <button className='addmore-btn'>Add New</button>
</div>
  )
}

export default ResumeOthers