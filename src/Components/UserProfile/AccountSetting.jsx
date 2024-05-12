"use client"
import React, { useState } from 'react';

const AccountSetting = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle changing password
  const handleChangePassword = () => {
    // Add validation logic here
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password don't match.");
      return;
    }
    
    // Add logic here to handle changing password
    console.log('Changing password...');
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Account Settings</h2>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
        <label htmlFor="oldPassword" style={{ width: '150px', marginRight: '1rem', fontSize: '1rem' }}>Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          style={{ fontSize: '1rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }}
        />
      </div>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
        <label htmlFor="newPassword" style={{ width: '150px', marginRight: '1rem', fontSize: '1rem' }}>New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ fontSize: '1rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }}
        />
      </div>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
        <label htmlFor="confirmPassword" style={{ width: '150px', marginRight: '1rem', fontSize: '1rem' }}>Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ fontSize: '1rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }}
        />
      </div>
      <div>
        <button onClick={handleChangePassword} style={{ background: '#3498DB', color: '#fff', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: '.3s' }}>Change Password</button>
      </div>
    </div>
  );
};

export default AccountSetting;
