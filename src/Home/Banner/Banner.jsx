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
        <div className='py-12 border-b border-gray-300'>
            <div className="container mx-auto flex items-center gap-5">
                <div className="flex-1">
                    <h1 className="text-4xl text-gray-900 mb-5">Here Is Your <span className="text-primary">Career</span> Opportunity</h1>
                    <p className="text-lg text-gray-900 mb-10">JumpIntoJob is a new user friendly remote work community for job seekers and employees to get their best services.</p>
                    <div className="flex justify-between gap-5 mb-10">
                        {bannerData.map(data => (
                            <div key={data.id} className="flex items-center gap-5">
                                <div>
                                    <img src={data.logo} alt="" className="w-8" />
                                </div>
                                <div>
                                    <h5 className="text-base text-gray-700">{data.title}</h5>
                                    <p className="text-primary font-bold text-xl">{data.numbers}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-5">
                        <Link href="/jobs">
                            <button className='banner-btn bg-primary text-white py-2.5 px-5 rounded flex items-center justify-center gap-2 hover:bg-blue-700 transition'>
                                Find Jobs <TbBriefcase />
                            </button>
                        </Link>
                        <Link href="/foremployers">
                            <button className='banner-btn border border-green-500 text-black py-2.5 px-5 rounded flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition'>
                                Post Jobs <TbBriefcase />
                            </button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src="https://img.freepik.com/free-vector/employee-group-portrait-illustration_74855-5495.jpg?w=996&t=st=1691679488~exp=1691680088~hmac=2c6c7540205d3ed36bce0372b17e65b18dc61d40764505cac9e75a785be6bd0b" alt="" className="max-w-full" />
                </div>
            </div>
        </div>
    );
};

export default Banner;
