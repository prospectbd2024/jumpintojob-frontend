"use client"
import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaSave, FaTimes } from "react-icons/fa";
import { HiOutlineEye } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { useCategoryContext } from '@/Contexts/CategoryContext';

const PostJobReview = ({ setShowReview, jobData: initialJobData }) => {
    const [jobData, setJobData] = useState(initialJobData);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState('');
    const { jobCategories } = useCategoryContext();

    useEffect(() => {
        // Find the category name based on the category_id
        const category = jobCategories.find(cat => cat.id.toString() === jobData.category_id?.toString());
        if (category) {
            setJobData(prevData => ({ ...prevData, category_name: category.category_name }));
        }
    }, [jobData.category_id, jobCategories]);

    const handlePostJob = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userData'))?.data?.access_token;
            if (!token) {
                throw new Error('No access token found');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/circular/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(jobData)
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log("Job post successful:", data);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Job post successful!',
                    showConfirmButton: false,
                    timer: 1500
                });
                // You might want to redirect or clear the form here
            } else {
                console.log("Job post failed:", data);
    
                if (response.status === 422) {
                    console.log("Validation errors:", data.errors);
                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        text: Object.values(data.errors).flat().join('\n'),
                    });
                } else {
                    console.log("Something is wrong:", data.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message || 'An error occurred while posting the job.',
                    });
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again later.',
            });
        }
    };

    const handleEdit = (field) => {
        setEditingField(field);
        setTempValue(jobData[field]);
    };

    const handleSave = () => {
        setJobData({ ...jobData, [editingField]: tempValue });
        setEditingField(null);
    };

    const handleCancel = () => {
        setEditingField(null);
    };

    const renderField = (label, field) => (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-semibold mb-3 text-primary-color">{label}</h4>
            {editingField === field ? (
                <div className="flex flex-col">
                    {field === 'description' || field === 'responsibilities' || field === 'educational_requirements' || field === 'experience' ? (
                        <textarea
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-full p-3 border-2 border-indigo-200 rounded-md mb-3 focus:border-indigo-500 focus:outline-none transition-colors duration-300"
                            rows="4"
                        />
                    ) : (
                        <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-full p-3 border-2 border-indigo-200 rounded-md mb-3 focus:border-indigo-500 focus:outline-none transition-colors duration-300"
                        />
                    )}
                    <div className="flex justify-end">
                        <button 
                            onClick={handleSave} 
                            className="bg-primary-color text-white px-4 py-2 rounded-md mr-2 hover:bg-indigo-400 transition-colors duration-300"
                        >
                            <FaSave className="inline-block mr-2" /> Save
                        </button>
                        <button 
                            onClick={handleCancel} 
                            className="bg-white text-black px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors border border-gray-400 duration-300"
                        >
                            <FaTimes className="inline-block mr-2" /> Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <p className="text-gray-700 text-lg">{jobData[field]}</p>
                    <button 
                        onClick={() => handleEdit(field)} 
                        className="text-primary-color hover:text-indigo-700 transition-colors duration-300"
                    >
                        <FaPencilAlt className="text-xl" />
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-4xl mx-[20px] sm:mx-auto md:mx-auto my-[20px] p-8 bg-white rounded-xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-8 text-center text-primary-color">Review Job Details</h3>
            <div className="space-y-6">
                {renderField('Job Title', 'title')}
                {renderField('Job Category', 'category_name')}
                {renderField('Vacancy', 'vacancies')}
                {renderField('Location Type', 'location_type')}
                {renderField('Address', 'location')}
                {renderField('Job Type', 'employment_type')}
                {renderField('Estimated Salary', 'salary')}
                {renderField('Deadline', 'deadline')}
                {renderField('Details Description', 'description')}
                {renderField('Details Responsibilities', 'responsibilities')}
                {renderField('Educational Requirements', 'educational_requirements')}
                {renderField('Experience', 'experience')}
            </div>
            <div className="flex justify-between mt-10">
                <button 
                    className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setShowReview(false)}
                >
                    Back
                </button>
                <div>
                    {/* <button className="bg-indigo-500 text-white px-6 py-3 rounded-full mr-4 hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105">
                        <HiOutlineEye className="inline-block mr-2" /> Preview
                    </button> */}
                    <button 
                        className="bg-primary-color text-white px-6 py-3 rounded-full hover:bg-indigo-400 transition-all duration-300 transform hover:scale-105"
                        onClick={handlePostJob}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostJobReview;