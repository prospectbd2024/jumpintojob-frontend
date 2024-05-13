import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon from react-icons library

function AddButton({ onClick }) {
  return (
    <div style={{ display :"flex" , justifyContent : 'space-between', paddingTop : '20px' }} onClick={onClick}>
      <div  style={styles.container} >
      Add
      </div>
        <div>
        <FaPlus style={styles.icon} />
        </div>
    </div>
  );
}

const styles = {
  container: {
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  icon: {
    marginRight: '5px',
  },
};

export default AddButton;
