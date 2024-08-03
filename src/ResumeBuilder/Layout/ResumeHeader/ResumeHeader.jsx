import React from 'react';
import Link from 'next/link';
import Logo from '@/assets/Logo';

const ResumeHeader = () => {
    return (
        <header className="border-b border-gray-300 py-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Logo className="w-36 h-12" fill="var(--primary-color)" />
                        <span className="text-lg font-bold text-[var(--primary-color)] ml-4">Resume Builder</span>
                    </div>
                    <div>
                        <Link href="/findjobs">
                            <button className="w-32 h-11 font-bold rounded bg-[var(--primary-color)] text-white border-none text-base cursor-pointer transition duration-200 hover:bg-[#2f89c5]">
                                Job Board
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ResumeHeader;
