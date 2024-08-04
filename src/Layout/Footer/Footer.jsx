import React from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-white text-gray-900 py-12">
            <div className='container mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="text-center mb-8 lg:mb-0">
                        <h2 className="text-xl mb-4">Jump Into Job</h2>
                        <p className="mb-4">With Jump Into Job you can browse for jobs, view local and national salary information, discover companies, and learn about the job market in a specific city.</p>
                        <ul className='flex justify-center space-x-4'>
                            <li><a href="#"><FaFacebook /></a></li>
                            <li><a href="#"><FaInstagramSquare /></a></li>
                            <li><a href="#"><FaTwitterSquare /></a></li>
                            <li><a href="#"><FaYoutubeSquare /></a></li>
                        </ul>
                    </div>
                    <div className="text-center mb-8 lg:mb-0">
                        <h2 className="text-xl mb-4">Job Type</h2>
                        <ul>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Part Time Job</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Full Time Job</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Internship</a></li>
                        </ul>
                    </div>
                    <div className="text-center mb-8 lg:mb-0">
                        <h2 className="text-xl mb-4">Job Categories</h2>
                        <ul>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Internship</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Freelance</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Overseas</a></li>
                        </ul>
                    </div>
                    <div className="text-center mb-8 lg:mb-0">
                        <h2 className="text-xl mb-4">Career Blogs</h2>
                        <ul>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Job Interview</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Interview Tips</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Job Search</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Career Plan</a></li>
                        </ul>
                    </div>
                    <div className="text-center mb-8 lg:mb-0">
                        <h2 className="text-xl mb-4">Quick Links</h2>
                        <ul>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">FAQ</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Contact Us</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">Privacy</a></li>
                            <li><a href="#" className="text-gray-900 hover:text-gray-600">About Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-white py-2 mt-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 - JumpIntoJob</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
