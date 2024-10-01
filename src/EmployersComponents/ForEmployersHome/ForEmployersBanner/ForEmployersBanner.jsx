import React from 'react';
import Link from 'next/link';

const ForEmployersBanner = () => {
    return (
        <div className="py-16 md:py-24 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="lg:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Discover Exceptional Talent for Your Company
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl">
                            Every candidate on our Job Portal has been thoroughly vetted by our dedicated team, ensuring quality and reliability.
                        </p>
                        <Link href="/foremployers/postjobs" className="inline-block">
                            <button className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                Post a Job
                            </button>
                        </Link>
                        
                    </div>
                    <div className="lg:w-1/2 mt-10 lg:mt-0">
                        <img 
                            src="https://img.freepik.com/free-vector/tiny-hr-manager-looking-candidate-job-interview-magnifier-computer-screen-flat-vector-illustration-career-employment_74855-8619.jpg?w=996&t=st=1692890834~exp=1692891434~hmac=7cb64c2ca8523b11d259492f42f6bcd82f7eef0cfd6cceb7f355f62ca320f8b0" 
                            alt="Employers Banner" 
                            className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForEmployersBanner;


/* 
<Link href="/foremployers/postjobs">
                                <button className="bg-green-500 text-white py-3 px-6 rounded-full font-bold flex items-center gap-2 hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                                    Post a Job 
                                </button>
                            </Link>
*/