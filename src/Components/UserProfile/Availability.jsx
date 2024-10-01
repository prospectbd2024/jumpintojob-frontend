import React from 'react'
import { useUserProfileContext } from '@/Contexts/UserProfileContext'

function Availability() {
  const { availability, setAvailability } = useUserProfileContext();

  const handleAvailabilityChange = (e) => {
    // console.log(e.target.value);
    setAvailability(e.target.value);
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  };

  const selectStyle = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23333\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="availability" style={labelStyle}>Employment Status:</label>
      <div style={{ position: 'relative' }}>
        <select
          id="availability"
          value={availability}
          onChange={handleAvailabilityChange}
          style={selectStyle}
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

export default Availability;
