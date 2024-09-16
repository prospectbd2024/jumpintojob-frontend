import React from 'react';
import Link from 'next/link';

const ForEmployersBanner = () => {
    return (
        <div className="py-12 border-b border-gray-400">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Discover Exceptional Employees for Your Company Through Our Job Portal
                    </h2>
                    <p className="text-lg text-gray-600">
                        Every single candidate available on our Job Portal has undergone a comprehensive verification process conducted by our dedicated team at Job Portal.
                    </p>
                    <button className="bg-green-500 text-white font-bold py-3 px-6 rounded hover:bg-green-600 transition duration-300">
                        <Link href="#">
                            Post a Job
                        </Link>
                    </button>
                </div>
                <div>
                    <img src="https://img.freepik.com/free-vector/tiny-hr-manager-looking-candidate-job-interview-magnifier-computer-screen-flat-vector-illustration-career-employment_74855-8619.jpg?w=996&t=st=1692890834~exp=1692891434~hmac=7cb64c2ca8523b11d259492f42f6bcd82f7eef0cfd6cceb7f355f62ca320f8b0" alt="Employers Banner" className="max-w-full" />
                </div>
            </div>
        </div>
    );
};

export default ForEmployersBanner;
