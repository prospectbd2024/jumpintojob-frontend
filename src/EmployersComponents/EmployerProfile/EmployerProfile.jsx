import AboutMe from '@/Components/UserProfile/AboutMe';
import React from 'react';


const EmployerProfile = () => {
    return (
        <div className='employer-profile'>
            <div className="employer-profile-container container">
            <h2>Employer Profile</h2>
            <div style={{paddingBlock : '20px'}}>

            <AboutMe/>
            </div>
            </div>
        </div>
    );
};

export default EmployerProfile;