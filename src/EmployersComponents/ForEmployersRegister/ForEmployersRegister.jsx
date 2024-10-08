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
    const [companyProfile,setCompanyProfile ] = useState({}); 
    
    const [warning, setWarning] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('Employer');
    const router = useRouter();

    const createQueryString = (name, value) => {
        const params = new URLSearchParams();
        params.set(name, value);
        return params.toString();
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const userData = {
            name: companyName,
            company_type: companyType,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
            user_type: userType
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/employer/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
            router.push('/foremployers/signin?' + createQueryString('msg', 'Registration Successful! Please Verify Your Email'));
        } else {
            setWarning(data.message);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-primary-color p-0 sm:p-6 rounded-xl shadow-lg flex items-center flex-col">
            <div className="flex items-center text-xl font-bold m-4 p-4">
                <HiOutlineUserCircle className="mr-2 text-2xl" /> Employer Registration
            </div>

            <div className="bg-white w-full max-w-3xl p-8 md:p-12 rounded-lg border border-secondary-color shadow-md">
                {warning && <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">{warning}</div>}
                <form onSubmit={handleRegistration} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='col-start-1 col-end-2'>
                    <ProfileImage personalInformation={companyProfile} SetPersonalInformation={setCompanyProfile} backgroundImage ={true}   />
                    </div>
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
                                {   
                                jobCategories.map(category =>{
                                    return <option value={category.id} key={category.id}> {category.category_name} </option>;
                                })

                                }
                                
                            </select>
                        </div>
                    </div>

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

                    <div className="md:col-span-2 text-sm mt-4">
                        <p className="text-gray-900">
                            By creating an account or logging in, you agree to the Job Portal's
                            <Link href="/terms" className="text-blue-600"> Terms</Link>, and acknowledge our 
                            <Link href="/cookie" className="text-blue-600"> Cookie</Link> and
                            <Link href="/privacy" className="text-blue-600"> Privacy</Link> policies.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <input type="checkbox" id="termscheck" required className="form-checkbox" />
                            <label htmlFor="termscheck">I agree to the terms and conditions.</label>
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-6">
                        <input
                            type="submit"
                            value="Sign Up"
                            className="w-full py-3 bg-primary-color text-white rounded-md hover:bg-primary-dark transition-all cursor-pointer"
                        />
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-900">
                        Already have an account? <Link href="/signin" className="text-blue-600">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForEmployersRegister;
