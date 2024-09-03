import AboutMe from '@/Components/UserProfile/AboutMe';
import React from 'react';

const EmployerProfile = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Employer Profile</h2>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <AboutMe />
                </div>
            </div>
        </div>
    );
};

export default EmployerProfile;
