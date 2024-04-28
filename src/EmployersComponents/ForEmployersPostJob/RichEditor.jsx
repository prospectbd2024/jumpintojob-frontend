import React, { useState } from 'react';


const RichEditor = ({jobData, setJobData}) => {


    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '50px' }}>
                <label style={{ fontSize: '15px', color: '#061421' }} htmlFor="richtext">Job Details</label>
                <textarea style={{ padding: '8px', border: '1px solid #3498db5c', borderRadius: '4px', resize: 'none', outline: 'none' }} name="" id="richtext" cols="30" rows="7" placeholder='Type details' onChange={(e) => setJobData({...jobData, 'description': e.target.value})} defaultValue={jobData.description} required></textarea>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '50px' }}>
                <label style={{ fontSize: '15px', color: '#061421' }} htmlFor="richtext">Responsibilities</label>
                <textarea style={{ padding: '8px', border: '1px solid #3498db5c', borderRadius: '4px', resize: 'none', outline: 'none' }} name="" id="richtext" cols="30" rows="6" placeholder='Type details responsibilities' onChange={(e) => setJobData({...jobData, 'responsibilities': e.target.value})} defaultValue={jobData.responsibilities} required></textarea>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '50px' }}>
                <label style={{ fontSize: '15px', color: '#061421' }} htmlFor="richtext">Educational Requirements</label>
                <textarea style={{ padding: '8px', border: '1px solid #3498db5c', borderRadius: '4px', resize: 'none', outline: 'none' }} name="" id="richtext" cols="30" rows="6" placeholder='Type Educational Requirements' onChange={(e) => setJobData({...jobData, 'educational_requirements': e.target.value})} defaultValue={jobData.educational_requirements} required></textarea>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '50px' }}>
                <label style={{ fontSize: '15px', color: '#061421' }} htmlFor="richtext">Required Experience</label>
                <textarea style={{ padding: '8px', border: '1px solid #3498db5c', borderRadius: '4px', resize: 'none', outline: 'none' }} name="" id="richtext" cols="30" rows="6" placeholder='Type Required Experience' onChange={(e) => setJobData({...jobData, 'experience': e.target.value})} defaultValue={jobData.experience} required></textarea>
            </div>
        </div>
    );
};

export default RichEditor;