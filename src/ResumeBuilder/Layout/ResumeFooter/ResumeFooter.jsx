import React from 'react';
import Link from 'next/link';

const ResumeFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 bg-gradient-to-r from-primary-color to-indigo-600 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <ul className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                        <li className="text-gray-300 text-sm">
                            {currentYear} &copy; jobshub
                        </li>
                        <li className="list-none">
                            <Link href="" className="text-gray-300 text-sm transition duration-300 hover:text-white">
                                Do not sell my data
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link href="" className="text-gray-300 text-sm transition duration-300 hover:text-white">
                                Terms and conditions
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                        <li className="list-none">
                            <Link href="/findjobs" className="text-gray-300 text-sm transition duration-300 hover:text-white">
                                Browse jobs
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link href="/companies" className="text-gray-300 text-sm transition duration-300 hover:text-white">
                                Browse companies
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default ResumeFooter;