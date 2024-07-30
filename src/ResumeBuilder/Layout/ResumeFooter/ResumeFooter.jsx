import React from 'react';
import Link from 'next/link';
import './ResumeFooter.scss'

const ResumeFooter = () => {
    return (
        <footer className='resume-footer'>
            <div className="resume-footer__container container">
                <div className="resume-footer__content">
                    <ul className="resume-footer__content-list">
                        <li className="resume-footer__content-list-item">
                            <p className="resume-footer__content-list-text">2023 &copy; jobshub</p>
                        </li>
                        <li className="resume-footer__content-list-item">
                            <Link href="" className="resume-footer__content-list-link">Do not sell my data</Link>
                        </li>
                        <li className="resume-footer__content-list-item">
                            <Link href="" className="resume-footer__content-list-link">Terms and conditions</Link>
                        </li>
                    </ul>
                    <ul className="resume-footer__content-list">
                        <li className="resume-footer__content-list-item">
                            <Link href="/findjobs" className="resume-footer__content-list-link">Browse jobs</Link>
                        </li>
                        <li className="resume-footer__content-list-item">
                            <Link href="/companies" className="resume-footer__content-list-link">Browse companies</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default ResumeFooter;