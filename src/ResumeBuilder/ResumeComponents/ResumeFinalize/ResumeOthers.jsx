import React from 'react'

function ResumeOthers() {
  return (
    <div>
    <ul className="addmore">
        <li>
            <input type="radio" id="projects" name="add" />
            <label htmlFor="projects">Add projects</label>
        </li>
        <li>
            <input type="radio" id="certificates" name="add" />
            <label htmlFor="certificates">Add certificates</label>
        </li>
        <li>
            <input type="radio" id="publications" name="add" />
            <label htmlFor="publications">Add publications</label>
        </li>
        <li>
            <input type="radio" id="hobbies" name="add" />
            <label htmlFor="hobbies">Add hobbies</label>
        </li>
        <li>
            <input type="radio" id="more" name="add" />
            <label htmlFor="more">Other</label>
            <input type="text" id="more" />
        </li>
    </ul>
    <button className='addmore-btn'>Add New</button>
</div>
  )
}

export default ResumeOthers