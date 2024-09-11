"use client";
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail, HiOutlineUserCircle } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ForEmployersRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyType, setCompanyType] = useState('');
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
            'name': companyName,
            'company_type': companyType,
            'email': email,
            'password': password,
            'password_confirmation': confirmPassword,
            'user_type': userType
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/employer/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
            router.push('/foremployers/signin?' + createQueryString('msg', "Registration Successful! Please Verify Your Email"));
        } else {
            setWarning(data.message);
        }
    };

    return (
        <div className="flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 relative">
                <h2 className="text-2xl md:text-3xl font-medium text-gray-900">Register Account</h2>
                <span className="text-gray-400 text-7xl absolute inset-0 flex justify-center top-10 md:top-8 -z-10">.</span>
            </div>

            <div className="bg-white w-full max-w-3xl p-8 md:p-12 rounded-lg border border-blue-100 shadow-md">
                {warning && <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">{warning}</div>}
                <form onSubmit={handleRegistration} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="company_name" className="text-gray-900">Company Name</label>
                        <div className="flex items-center gap-2 border border-blue-100 p-2 rounded">
                            <HiOutlineUserCircle className="text-blue-600" />
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

                    <div className="flex flex-col gap-2">
                        <label htmlFor="company_type" className="text-gray-900">Company Type</label>
                        <div className="flex items-center gap-2 border border-blue-100 p-2 rounded">
                            <HiOutlineUserCircle className="text-blue-600" />
                            <select
                                name="company_type"
                                id="company_type"
                                required
                                value={companyType}
                                onChange={e => setCompanyType(e.target.value)}
                                className="w-full border-none outline-none text-gray-900"
                            >
                                <option value="">Select Type</option>
                                {/* Add your options here */}
                                <option value="Technology and IT">Technology and IT</option>
                                <option value="Retail and Consumer Goods">Retail and Consumer Goods</option>
                                {/* Other options... */}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="user_type" className="text-gray-900">User Type</label>
                        <div className="flex items-center gap-2 border border-blue-100 p-2 rounded">
                            <HiOutlineUserCircle className="text-blue-600" />
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

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-900">Email</label>
                        <div className="flex items-center gap-2 border border-blue-100 p-2 rounded">
                            <HiOutlineMail className="text-blue-600" />
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

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-900">Password</label>
                        <div className="flex items-center gap-2 border border-blue-100 p-2 rounded relative">
                            <input
                                type={showPassword ? "text" : "password"}
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

                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirm_password" className="text-gray-900">Confirm Password</label>
                        <div className="flex items-center gap-2 border border-blue-100 p-2 rounded relative">
                            <input
                                type={showPassword ? "text" : "password"}
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

                    <div className="md:col-span-2 text-gray-900 text-sm mt-4">
                        <p>
                            By creating an account or logging in, you understand and agree to Job Portal's
                            <Link href="/terms" className="text-blue-600"> Terms</Link>.
                            You also acknowledge our <Link href="/cookie" className="text-blue-600">Cookie</Link> and
                            <Link href="/privacy" className="text-blue-600"> Privacy</Link> policies.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <input type="checkbox" id="termscheck" required className="form-checkbox" />
                            <label htmlFor="termscheck">I will agree to the company's terms & conditions.</label>
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-6">
                        <input
                            type="submit"
                            value="Sign Up"
                            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all cursor-pointer"
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
