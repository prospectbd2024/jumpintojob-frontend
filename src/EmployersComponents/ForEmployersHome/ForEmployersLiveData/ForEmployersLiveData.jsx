'use client'
import React, { useEffect, useState } from 'react';

const ForEmployersLiveData = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        fetch('bannerdata.json')
            .then(res => res.json())
            .then(data => setBannerData(data))
    }, []);

    return (
        <div className="bg-white py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bannerData.map(data => (
                        <div key={data.id} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
                            <div className="flex-shrink-0">
                                <img src={data.logo} alt="" className="w-12 h-12" />
                            </div>
                            <div>
                                <h5 className="text-lg font-semibold text-gray-800">{data.title}</h5>
                                <p className="text-2xl font-bold text-green-600">{data.numbers}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ForEmployersLiveData;