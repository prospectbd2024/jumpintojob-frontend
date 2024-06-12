"use client"
import { useUserProfileContext } from '@/Contexts/UserProfileContext';
import React, { useState } from 'react';
import SaveProfileButton from '../Buttons/SaveProfileButton';
import Availability from './Availability';

const JobPreferences = () => {

    const { jobType, setJobType, otherPreferences,
        setOtherPreferences, salaryExpectation,
        setSalaryExpectation, currency,
        setCurrency, preferredIndustry,
        setPreferredIndustry, availability, setAvailability } = useUserProfileContext();

    const handleJobTypeChange = (e) => {
        setJobType(e.target.value);
    };

    const handleOtherPreferencesChange = (e) => {
        setOtherPreferences(e.target.value);
    };

    const handleSalaryExpectationChange = (e) => {
        setSalaryExpectation(e.target.value);
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const handlePreferredIndustryChange = (e) => {
        setPreferredIndustry(e.target.value);
    };


    return (
        <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 2fr' }}>Job Preferences</h2>
            <div style={{ marginTop: '60px' }}>

                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="jobType" style={{ width: '200px', marginRight: '10px', fontWeight: 'bold' }}>Type of Job Preferred:</label>
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
                        <label htmlFor="otherPreferences" style={{ width: '200px', marginRight: '10px', fontWeight: 'bold' }}>Other Preferences:</label>
                        <input
                            type="text"
                            id="otherPreferences"
                            value={otherPreferences}
                            onChange={handleOtherPreferencesChange}
                            placeholder="Enter other preferences"
                            style={{ height: '30px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px', width: '180px' }}
                        />
                    </div>
                )}
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="salaryExpectation" style={{ width: '200px', marginRight: '10px', fontWeight: 'bold' }}>Salary Expectation:</label>
                    <div style={{ display: 'flex', gap: '0px 20px' }}>


                        <input
                            type="text"
                            id="salaryExpectation"
                            value={salaryExpectation}
                            onChange={handleSalaryExpectationChange}
                            placeholder="Enter salary expectation"
                            style={{ height: '30px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px', width: '180px' }}
                        />
                        {/* Currency Selector */}
                        <select
                            value={currency}
                            onChange={handleCurrencyChange}
                            style={{ height: '30px', marginLeft: '10px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px' }}
                        >
                            <option value="BDT">BDT</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            {/* Add more currencies as needed */}
                        </select>
                    </div>
                </div>
                {/* <div  style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="preferredIndustry" style={{ width: '200px', marginRight: '10px', fontWeight: 'bold' }}>Preferred Industry:</label>
                    <input
                        type="text"
                        id="preferredIndustry"
                        value={preferredIndustry}
                        onChange={handlePreferredIndustryChange}
                        placeholder="Enter preferred industry"
                        style={{ height: '30px', padding: '0 10px', fontSize: '16px', border: '1px solid #80808057', borderRadius: '5px', width: '180px' }}
                    />
                </div> */}
                 <Availability />
            <div style={{display: 'flex',justifyContent: 'flex-end',marginTop: '20px'}}>
            <SaveProfileButton/>
            </div>
            </div>
        </div>
    );
};

export default JobPreferences;
