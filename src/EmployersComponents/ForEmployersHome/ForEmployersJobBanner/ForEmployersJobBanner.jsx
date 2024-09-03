import React from 'react';
import Link from 'next/link';

const ForEmployersJobBanner = () => {
    return (
        <div className="py-20">
            <div className="container mx-auto bg-gradient-to-br from-primary-color to-[#a3ffc8] w-3/5 text-center py-16 rounded-lg">
                <h2 className="text-[#134e84] mb-2 text-4xl font-medium">Ready to start hiring?</h2>
                <p className="text-[#061421] mb-6">Begin posting your jobs on JobHubGlobal today.</p>
                <Link href="/foremployers/postjobs">
                    <button className="text-white bg-[#2ECC71] border-none w-48 h-12 font-bold text-lg rounded-full cursor-pointer transition-all duration-300 hover:bg-[#28b663]">
                        Post a job now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ForEmployersJobBanner;
