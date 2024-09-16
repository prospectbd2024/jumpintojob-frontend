"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TbBriefcase } from "react-icons/tb";

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);
    useEffect(() => {
        fetch('bannerdata.json')
            .then(res => res.json())
            .then(data => setBannerData(data))
    }, [])

    return (
        <div className='py-8 md:py-12 border-b border-gray-300'>
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-5 px-4">
                <div className="flex-1">
                    <h1 className="text-2xl text-center sm:text-3xl lg:text-4xl text-gray-900 mb-5">
                        Here Is Your <span className="text-primary-color">Career</span> Opportunity
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-900 mb-6 lg:mb-10">
                        JumpIntoJob is a new user-friendly remote work community for job seekers and employees to get their best services.
                    </p>
                    <div className="flex justify-between gap-5 mb-2 lg:mb-10">
                        {bannerData.map(data => (
                            <div key={data.id} className="flex items-center gap-2 w-full">
                                <div className="flex-shrink-0">
                                    {/* Add explicit width, height, and max-width to ensure visibility */}
                                    <img 
                                        src={data.logo} 
                                        alt="" 
                                        className="w-6 h-auto sm:w-8 md:w-8 lg:w-6 max-w-full" 
                                    />
                                </div>
                                <div>
                                    <h5 className="text-sm sm:text-base text-gray-700">{data.title}</h5>
                                    <p className="text-primary font-bold text-lg sm:text-xl">{data.numbers}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-5">
                        <Link href="/jobs">
                            <button className='banner-btn bg-primary-color text-white py-2.5 px-5 rounded flex items-center justify-center gap-2 hover:bg-blue-700 transition'>

                                Find Jobs <TbBriefcase />
                            </button>
                        </Link>
                        <Link href="/foremployers">
                            <button className='banner-btn border border-green-500 text-black py-2 px-4 sm:py-2.5 sm:px-5 rounded flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition'>
                                Post Jobs <TbBriefcase />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-full lg:w-[500px] mt-8 lg:mt-0">
                    <img src="https://img.freepik.com/free-vector/employee-group-portrait-illustration_74855-5495.jpg?w=996&t=st=1691679488~exp=1691680088~hmac=2c6c7540205d3ed36bce0372b17e65b18dc61d40764505cac9e75a785be6bd0b" alt="" className="max-w-full h-auto object-cover rounded-lg shadow-md" />
                </div>
            </div>
        </div>
    );
};

export default Banner;
