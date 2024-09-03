"use client";
import React, { useEffect, useState } from 'react';

const JobCategory = () => {
    const [jobCategory, setJobCategory] = useState([]);

    useEffect(() => {
        fetch('jobsbyindustry.json')
            .then(res => res.json())
            .then(data => setJobCategory(data));
    }, []);

    return (
        <div className="my-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse jobs by industry</h2>
                    <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem, laudantium. Aperiam molestias libero iure officiis.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {jobCategory.map(item => (
                        <div key={item.id} className="border border-gray-300 p-5 rounded-lg flex flex-col items-center text-center cursor-pointer transition-transform transform hover:scale-105">
                            <img src={item.image} alt="logo" className="w-12 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 hover:text-primary">{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobCategory;
