import React from 'react'
import './NavButtons.scss'
function NavButtons({props , hideNext   , hidePrev   }) {
    const {setCurrentStep}= props; 
  
  return (
    <div className="resume-navigations">
    {
    !hidePrev   && <button className='resume-navigations__button resume-navigations__button--prev' onClick={() => setCurrentStep(currentStep => currentStep - 1)}>Previous</button>
   } 
   {
    !hideNext && <button className='resume-navigations__button resume-navigations__button--next' onClick={() => setCurrentStep(currentStep => currentStep + 1)}>Next</button>
   } 
   
    
</div>
 
  )
}

export default NavButtons