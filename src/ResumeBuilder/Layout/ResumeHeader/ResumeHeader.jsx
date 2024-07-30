import React from 'react';
import Link from 'next/link';
import './ResumeHeader.scss';
import Logo from '@/assets/Logo';

const ResumeHeader = () => {
    return (
        <header className='resume-header'>
            <div className="resume-header-container container">
                <div className="resume-header-content">
                    <div className="resume-header-title">
                        <Logo className='jump-job-logo' fill='var(--primary-color)' />
                        <span className='title'>Resume Builder</span>
                    </div>
                    <div className="resume-header-button">
                        <Link href="/findjobs"><button>Job Board</button></Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ResumeHeader;
