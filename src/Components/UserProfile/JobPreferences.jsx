"use client"
import { useUserProfileContext } from '@/Contexts/UserProfileContext';
import React from 'react';
import SaveProfileButton from '../Buttons/SaveProfileButton';
import Availability from './Availability';

const JobPreferences = () => {
    const { jobType, setJobType, otherPreferences,
        setOtherPreferences, salaryExpectation,
        setSalaryExpectation, currency,
        setCurrency } = useUserProfileContext();

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
    };

    const headerStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    };

    const formGroupStyle = {
        marginBottom: '20px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px 12px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
    };

    const selectStyle = {
        ...inputStyle,
        appearance: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23333\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <div style={containerStyle} className=''>
            <h2 style={headerStyle}>Job Preferences</h2>
            
            <div style={formGroupStyle}>
                <label htmlFor="jobType" style={labelStyle}>Type of Job Preferred:</label>
                <select
                    id="jobType"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    style={selectStyle}
                >
                    <option value="">Select Job Type</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="in-site">In-site</option>
                    <option value="others">Others</option>
                </select>
            </div>

            {jobType === 'others' && (
                <div style={formGroupStyle}>
                    <label htmlFor="otherPreferences" style={labelStyle}>Other Preferences:</label>
                    <input
                        type="text"
                        id="otherPreferences"
                        value={otherPreferences}
                        onChange={(e) => setOtherPreferences(e.target.value)}
                        placeholder="Enter other preferences"
                        style={inputStyle}
                    />
                </div>
            )}

            <div style={formGroupStyle}>
                <label htmlFor="salaryExpectation" style={labelStyle}>Salary Expectation:</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        id="salaryExpectation"
                        value={salaryExpectation}
                        onChange={(e) => setSalaryExpectation(e.target.value)}
                        placeholder="Enter salary expectation"
                        style={{ ...inputStyle, flexGrow: 1 }}
                    />
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        style={{ ...selectStyle, width: '100px' }}
                    >
                        <option value="BDT">BDT</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
            </div>

            <Availability />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <SaveProfileButton />
            </div>
        </div>
        </div>
    );
};

export default JobPreferences;