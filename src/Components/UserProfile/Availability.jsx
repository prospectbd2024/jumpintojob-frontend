import React from 'react'
import { useUserProfileContext } from '@/Contexts/UserProfileContext'
function Availability() {
    const {availability, setAvailability} = useUserProfileContext();
    const handleAvailabilityChange = (e) => {
      console.log(e.target.value);
      setAvailability(e.target.value);
      };
  return (
    <div style={{ marginBottom: '20px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
    <label htmlFor="availability" style={{ width: '200px', marginRight: '10px', fontWeight: 'bold' }}>Employment status:</label>
    <select
        id="availability"
        value={availability}
        onChange={handleAvailabilityChange}
        style={{ height: '30px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px', width: '200px' }}
    >
        <option value="readyToJoin">Ready To Join</option>
        <option value="currentlyInJob">Currently In A Job</option>
        <option value="lookingForJob">Looking For Better Job</option>
        {/* Add more options as needed */}
    </select>
</div>
  )
}

export default Availability