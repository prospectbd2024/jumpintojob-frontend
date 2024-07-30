import React from 'react';
import Link from 'next/link';
import './ResumeHeader.scss';
import Logo from '@/assets/Logo';

const ResumeHeader = () => {
    return (
        <header className='resume-header'>
            <div className="resume-header__container u-container">
                <div className="resume-header__content">
                    <div className="resume-header__title-box">
                        <Logo   fill='var(--primary-color)' style={ {width: '150px' ,height: '50px' } } />
                        <h3 className='resume-header__title'>Resume Builder</h3>
                    </div>
                    <div className="resume-header__button">
                        <Link href="/findjobs"><button className='resume-header__button--text' >Job Board</button></Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ResumeHeader;
