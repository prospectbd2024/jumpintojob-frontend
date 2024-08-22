import React from 'react';
import Link from 'next/link';

const ResumeFooter = () => {
    return (
        <footer className="w-full py-5 border-t border-gray-300">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <ul className="flex flex-col md:flex-row gap-2 md:gap-5 items-center">
                        <p className="text-gray-600 text-sm text-center md:text-left">2023 &copy; jobshub</p>
                        <li className="list-none">
                            <Link href="" className="text-blue-500 text-sm transition duration-100 hover:text-black">
                                Do not sell my data
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link href="" className="text-blue-500 text-sm transition duration-100 hover:text-black">
                                Terms and conditions
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col md:flex-row gap-2 md:gap-5 items-center">
                        <li className="list-none">
                            <Link href="/findjobs" className="text-blue-500 text-sm transition duration-100 hover:text-black">
                                Browse jobs
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link href="/companies" className="text-blue-500 text-sm transition duration-100 hover:text-black">
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
