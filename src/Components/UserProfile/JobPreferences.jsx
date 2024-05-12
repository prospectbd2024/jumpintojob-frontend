"use client"
import React, { useState } from 'react';

const JobPreferences = () => {
    const [jobType, setJobType] = useState('');
    const [otherPreferences, setOtherPreferences] = useState('');
    const [salaryExpectation, setSalaryExpectation] = useState('');
    const [preferredIndustry, setPreferredIndustry] = useState('');
    const [availability, setAvailability] = useState('');

    const handleJobTypeChange = (e) => {
        setJobType(e.target.value);
    };

    const handleOtherPreferencesChange = (e) => {
        setOtherPreferences(e.target.value);
    };

    const handleSalaryExpectationChange = (e) => {
        setSalaryExpectation(e.target.value);
    };

    const handlePreferredIndustryChange = (e) => {
        setPreferredIndustry(e.target.value);
    };

    const handleAvailabilityChange = (e) => {
        setAvailability(e.target.value);
    };

    const handleSavePreferences = () => {
        // Add logic here to save preferences
    };

    return (
        <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Job Preferences</h2>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="jobType" style={{ width: '150px', marginRight: '10px', fontWeight: 'bold' }}>Type of Job Preferred:</label>
                <select
                    id="jobType"
                    value={jobType}
                    onChange={handleJobTypeChange}
                    style={{ height: '30px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px', maxWidth: '200px' }}
                >
                    <option value="">Select Job Type</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="in-site">In-site</option>
                    <option value="others">Others</option>
                </select>
            </div>
            {jobType === 'others' && (
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="otherPreferences" style={{ width: '150px', marginRight: '10px', fontWeight: 'bold' }}>Other Preferences:</label>
                    <input
                        type="text"
                        id="otherPreferences"
                        value={otherPreferences}
                        onChange={handleOtherPreferencesChange}
                        placeholder="Enter other preferences"
                        style={{ height: '30px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px', width: '200px' }}
                    />
                </div>
            )}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="salaryExpectation" style={{ width: '150px', marginRight: '10px', fontWeight: 'bold' }}>Salary Expectation:</label>
                <input
                    type="text"
                    id="salaryExpectation"
                    value={salaryExpectation}
                    onChange={handleSalaryExpectationChange}
                    placeholder="Enter salary expectation"
                    style={{ height: '30px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px', width: '200px' }}
                />
            </div>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="preferredIndustry" style={{ width: '150px', marginRight: '10px', fontWeight: 'bold' }}>Preferred Industry:</label>
                <input
                    type="text"
                    id="preferredIndustry"
                    value={preferredIndustry}
                    onChange={handlePreferredIndustryChange}
                    placeholder="Enter preferred industry"
                    style={{ height: '30px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px', width: '200px' }}
                />
            </div>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="availability" style={{ width: '150px', marginRight: '10px', fontWeight: 'bold' }}>Availability:</label>
                <input
                    type="text"
                    id="availability"
                    value={availability}
                    onChange={handleAvailabilityChange}
                    placeholder="Enter availability"
                    style={{ height: '30px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px', width: '200px' }}
                />
            </div>
            <button onClick={handleSavePreferences} style={{ background: '#3498DB', color: '#fff', width: '120px', height: '40px', borderRadius: '5px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: '.3s' }}>Save</button>
        </div>
    );
};

export default JobPreferences;
