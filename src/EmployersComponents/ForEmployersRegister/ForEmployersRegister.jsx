"use client";
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail, HiOutlineUserCircle } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCategoryContext } from '@/Contexts/CategoryContext';
import ProfileImage from '@/ResumeBuilder/ResumeComponents/ResumeHeading/ProfileImage';

const ForEmployersRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyType, setCompanyType] = useState('');
    const { jobCategories } = useCategoryContext(); 
    const [companyProfile, setCompanyProfile] = useState({}); 
    const [warning, setWarning] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('Employer');
    const router = useRouter();
    const [backgroundImage, setBackgroundImage] = useState(''); // State for background image
    const [companyImage, setCompanyImage] = useState(null); // State for company image

    const createQueryString = (name, value) => {
        const params = new URLSearchParams();
        params.set(name, value);
        return params.toString();
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const userData = new FormData(); // Use FormData to include images

        userData.append('name', companyName);
        userData.append('company_type', companyType);
        userData.append('email', email);
        userData.append('password', password);
        userData.append('password_confirmation', confirmPassword);
        userData.append('user_type', userType); 
        if (companyImage) {
            userData.append('logo', companyImage); // Send company profile image if available
        }
        if (companyImage) {
            userData.append('cover_image', backgroundImage); // Add company image to FormData
        } 
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/employer/signup`, {
            method: 'POST',
            body: userData,
        });

        const data = await response.json();
        if (response.ok) {
            router.push('/foremployers/signin?' + createQueryString('msg', 'Registration Successful! Please Verify Your Email'));
        } else {
            setWarning(data.message);
        }
    };

    const handleCompanyImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCompanyImage(reader.result); // Set the background image for preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBackgroundImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackgroundImage(reader.result); // Set the background image for preview
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div 
            className="bg-gradient-to-br from-blue-50 to-primary-color p-0 sm:p-6 rounded-xl shadow-lg flex items-center flex-col"
             
        >
            <div className="flex items-center text-xl font-bold m-4 p-4">
                <HiOutlineUserCircle className="mr-2 text-2xl" /> Employer Registration
            </div>

            <div className="bg-white w-full max-w-3xl p-8 md:p-12 rounded-lg border border-secondary-color shadow-md">
                {warning && <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">{warning}</div>}
                
                <form onSubmit={handleRegistration} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className='col-span-full'></div>

                    {/* Company Name Field */}
                    <div className="flex flex-col">
                        <label htmlFor="company_name" className="text-base font-bold mb-2">Company Name</label>
                        <div className="flex items-center border p-2 rounded-md">
                            <HiOutlineUserCircle className="mr-2 text-blue-600" />
                            <input
                                type="text"
                                placeholder="Microsoft Corp."
                                name="company_name"
                                id="company_name"
                                required
                                value={companyName}
                                onChange={e => setCompanyName(e.target.value)}
                                className="w-full border-none outline-none text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Company Type Field */}
                    <div className="flex flex-col">
                        <label htmlFor="company_type" className="text-base font-bold mb-2">Company Type</label>
                        <div className="flex items-center border p-2 rounded-md">
                            <HiOutlineUserCircle className="mr-2 text-blue-600" />
                            <select
                                name="company_type"
                                id="company_type"
                                required
                                value={companyType}
                                onChange={e => setCompanyType(e.target.value)}
                                className="w-full border-none outline-none text-gray-900"
                            >
                                <option value="">Select Type</option>
                                {jobCategories.map(category => (
                                    <option value={category.id} key={category.id}>{category.category_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* User Type Field */}
                    <div className="flex flex-col">
                        <label htmlFor="user_type" className="text-base font-bold mb-2">User Type</label>
                        <div className="flex items-center border p-2 rounded-md">
                            <HiOutlineUserCircle className="mr-2 text-blue-600" />
                            <input
                                type="text"
                                name="user_type"
                                id="user_type"
                                required
                                value={userType}
                                readOnly
                                className="w-full border-none outline-none text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-base font-bold mb-2">Email</label>
                        <div className="flex items-center border p-2 rounded-md">
                            <HiOutlineMail className="mr-2 text-blue-600" />
                            <input
                                type="email"
                                placeholder="microsoft@info.com"
                                name="email"
                                id="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full border-none outline-none text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-base font-bold mb-2">Password</label>
                        <div className="flex items-center border p-2 rounded-md">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                name="password"
                                id="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full border-none outline-none text-gray-900"
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                {showPassword ? <HiOutlineEye className="text-blue-600" /> : <HiOutlineEyeOff className="text-blue-600" />}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col">
                        <label htmlFor="confirm_password" className="text-base font-bold mb-2">Confirm Password</label>
                        <div className="flex items-center border p-2 rounded-md">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                name="confirm_password"
                                id="confirm_password"
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="w-full border-none outline-none text-gray-900"
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                {showPassword ? <HiOutlineEye className="text-blue-600" /> : <HiOutlineEyeOff className="text-blue-600" />}
                            </div>
                        </div>
                    </div>

                    {/* Company Image Upload */}
                    <div className="flex flex-col">
                        <label htmlFor="company_image" className="text-base font-bold mb-2">Upload Company Image</label>
                        <input
                            type="file"
                            name="company_image"
                            id="company_image"
                            accept="image/*"
                            onChange={handleCompanyImageChange}
                            className="p-2 rounded-md border border-gray-300"
                        />
                    </div>

                    {/* Background Image Upload */}
                    <div className="flex flex-col">
                        <label htmlFor="background_image" className="text-base font-bold mb-2">Upload Background Image</label>
                        <input
                            type="file"
                            name="background_image"
                            id="background_image"
                            accept="image/*"
                            onChange={handleBackgroundImageChange}
                            className="p-2 rounded-md border border-gray-300"
                        />
                    </div>

                    <div className="col-span-full">
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                            Register
                        </button>
                    </div>

                    <div className="flex justify-between mt-6">
                        <Link href="/foremployers/signin" className="text-blue-600 hover:underline">Already have an account? Sign In</Link>
                        <button type="button" className="flex items-center text-blue-600 hover:underline">
                            <FcGoogle className="mr-2" /> Continue with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForEmployersRegister;
