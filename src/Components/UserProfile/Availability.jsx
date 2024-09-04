import React from 'react'
import { useUserProfileContext } from '@/Contexts/UserProfileContext'

function Availability() {
  const { availability, setAvailability } = useUserProfileContext();

  const handleAvailabilityChange = (e) => {
    console.log(e.target.value);
    setAvailability(e.target.value);
  };

  return (
    <div className="mb-5 mt-2 flex flex-col sm:flex-row items-center">
      <label
        htmlFor="availability"
        className="w-full sm:w-52 mr-0 sm:mr-3 font-bold text-base sm:text-lg"
      >
        Employment status:
      </label>
      
      <div className='border border-secondary-color rounded-md w-full sm:w-auto'>
        <select
          id="availability"
          value={availability}
          onChange={handleAvailabilityChange}
          className="h-8 px-3 border border-gray-300 rounded-md w-full sm:w-52 text-md"
        >
          <option value="readyToJoin">Ready To Join</option>
          <option value="currentlyInJob">Currently In A Job</option>
          <option value="lookingForJob">Looking For Better Job</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  )
}

export default Availability
