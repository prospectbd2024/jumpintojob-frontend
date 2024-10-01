import React from 'react';
import { HiArrowSmRight } from 'react-icons/hi';
import Link from 'next/link';

const FeatureItem = ({ icon, title }) => (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
        <img src={icon} alt={title} className="w-12 h-12 p-2 bg-green-100 rounded-full" />
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
    </div>
);

const ForEmployersWhyUs = () => {
    const features = [
        { icon: "https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/job2.svg", title: "No Charge" },
        { icon: "https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/companies.svg", title: "Verified Candidates" },
        { icon: "https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/job2.svg", title: "Remote Workers" },
        { icon: "https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/job2.svg", title: "Quality Candidates" },
    ];

    return (
        <div className="py-16 sm:py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            Why Job Portal Is A Good Choice For Your Company
                        </h2>
                        <p className="text-xl text-gray-600">
                            We offer a range of benefits that make us the preferred choice for companies looking to hire top talent efficiently and effectively.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <FeatureItem key={index} {...feature} />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/foremployers/postjobs">
                                <button className="bg-green-500 text-white py-3 px-6 rounded-full font-bold flex items-center gap-2 hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                                    Post a Job <HiArrowSmRight className="text-2xl" />
                                </button>
                            </Link>
                            <Link href="/foremployers/register">
                                <button className="bg-blue-500 text-white py-3 px-6 rounded-full font-bold flex items-center gap-2 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                                    Create Account <HiArrowSmRight className="text-2xl" />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                        <img
                            className="w-full h-[300px] object-cover rounded-lg shadow-md col-span-2"
                            src="https://media.istockphoto.com/id/635978146/photo/find-new-ways-to-stimulate-your-mind.jpg?s=612x612&w=0&k=20&c=ALL_ZWqBzoLjgjInuc7a-rGc44gmQJZoX7ZmpW8hyJI="
                            alt="Stimulate Your Mind"
                        />
                        <img
                            className="w-full h-[200px] object-cover rounded-lg shadow-md"
                            src="https://media.istockphoto.com/id/598134426/photo/coworkers-in-synch.jpg?s=612x612&w=0&k=20&c=U6d_51KMV53bGW97WZosrLHCHYmsq6WNE5D52ENo8Ic="
                            alt="Coworkers"
                        />
                        <img
                            className="w-full h-[200px] object-cover rounded-lg shadow-md"
                            src="https://img.freepik.com/free-photo/front-distanced-view-young-beautiful-lady-grey-shirt-talking-discussing-something-with-young-man-inside-office-during-daytime-building-job-activity_140725-15733.jpg?w=360&t=st=1693581041~exp=1693581641~hmac=1873ad2bae465c0bf918ae7f1e4ce5a3a808bf78b009c3544e37d294bba6ef43"
                            alt="Office Discussion"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForEmployersWhyUs;