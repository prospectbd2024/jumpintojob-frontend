"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ResumeHelp = () => {
    const [isClient, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <section className="border-t border-gray-300 py-12">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="flex justify-center">
                            <img
                                src="https://img.freepik.com/free-vector/woman-computer-illustration_33099-601.jpg?w=826&t=st=1693575185~exp=1693575785~hmac=22df57a8c0c7cc2ac254c39e94cd49571a89758f9728f477e2a6ccaeeb0139c2"
                                alt="Resume Creation"
                                className="w-full h-72 object-cover rounded-lg"
                            />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Don't have a resume yet? Create one to make it stand out to employers
                            </h2>
                            <p className="text-gray-600 mb-6">
                                A good professional resume helps you to catch the attention of any recruiters.
                            </p>
                            <Link href="/resumebuilder" className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                                Build Resume
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="https://img.freepik.com/free-vector/business-meeting-brainstorming-men-women-sitting-standing-negotiating-presentation-discussion_575670-246.jpg?w=996&t=st=1693574151~exp=1693574751~hmac=9052844e13684754e17d31826917e85bba7a0a44ccf03b276373e9f3f05b168b"
                                alt="Business Meeting"
                                className="w-full h-72 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ResumeHelp;
