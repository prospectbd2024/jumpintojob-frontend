import React from 'react';
import Link from 'next/link';
import Logo from '@/assets/Logo';
import { FaBriefcase, FaChevronDown } from 'react-icons/fa';

const ResumeHeader = () => {
    return (
        <header className="bg-white shadow-md py-4 top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 max-w-screen-xl">
                <div className="flex items-center justify-between">
                    <Link href="/" passHref>
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <Logo className="w-36 h-12 transition-transform duration-300 group-hover:scale-105" fill="var(--primary-color)" />
                            <span className="text-xl font-bold text-gray-800 ml-2 hidden md:block group-hover:text-[var(--primary-color)] transition-colors duration-300">
                                Resume Builder
                            </span>
                        </div>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/templates" className="text-gray-600 hover:text-[var(--primary-color)] transition-colors duration-300">Templates</Link>
                        <div className="relative group">
                            <button className="flex items-center text-gray-600 hover:text-[var(--primary-color)] transition-colors duration-300">
                                Resources <FaChevronDown className="ml-1 text-xs" />
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog</Link>
                                <Link href="/career-advice" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Career Advice</Link>
                            </div>
                        </div>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link href="/findjobs">
                            <button className="px-6 py-2 font-semibold rounded-full bg-[var(--primary-color)] text-white border-none text-sm cursor-pointer transition duration-300 hover:bg-[#2f89c5] hover:shadow-lg flex items-center">
                                <FaBriefcase className="mr-2" />
                                Job Board
                            </button>
                        </Link>
                        {/* <button className="px-4 py-2 font-semibold rounded-full border-2 border-[var(--primary-color)] text-[var(--primary-color)] bg-transparent text-sm cursor-pointer transition duration-300 hover:bg-[var(--primary-color)] hover:text-white">
                            Sign In
                        </button> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ResumeHeader;