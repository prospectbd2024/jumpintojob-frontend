'use client'
import React from 'react';
import Link from 'next/link';

const ForEmployersJobBanner = () => {
    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="px-6 py-12 sm:px-12 sm:py-16 text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                            Ready to start hiring?
                        </h2>
                        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                            Begin posting your jobs on JobHubGlobal today and find your next star employee.
                        </p>
                        <Link href="/foremployers/postjobs">
                            <button className="inline-block bg-white text-green-600 font-bold text-lg px-8 py-3 rounded-full shadow-md transition duration-300 hover:bg-green-50 hover:text-green-700 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">
                                Post a job now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForEmployersJobBanner;