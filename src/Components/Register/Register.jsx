"use client";
import React, { useState, useEffect } from "react";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlineUserCircle,
} from "react-icons/hi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "../Login/SocialLogin";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const params = useSearchParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("Job Seeker");
  const router = useRouter();
  const [message, setMessage] = useState(undefined);
  const [warning, setWarning] = useState({ warning: false, message: "" });
  const [errors, setErrors] = useState( null);

  useEffect(() => {
    setMessage(params.get("msg"));
    if (params.get("error")) {
      setWarning({ warning: "error", message: params.get("error") });
    }
  }, []);

  const handleRegistration = async (e) => {
    e.target.reset();
    e.preventDefault();
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      user_type: userType,
    };
    const createQueryString = (name, value) => {
      const params = new URLSearchParams();
      params.set(name, value);
      return params.toString();
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/job-seeker/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();
    if (response.ok) {
      router.push(
        "/signin" +
          "?" +
          createQueryString("msg", "Registration Successful! Please Verify Your Email")
      );
    } else {
      setErrors(data.errors)
    }
  };

  return (
    <div className="flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 relative">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900">
          Register Account
        </h2>
        <span className="text-gray-400 text-7xl absolute inset-0 flex justify-center top-10 md:top-8 -z-10">
          .
        </span>
      </div>

      <div className="bg-white w-full max-w-3xl p-8 md:p-12 rounded-lg border border-blue-100 shadow-md">
        {warning.warning === "error" && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {warning.message}
          </div>
        )}
        <form onSubmit={handleRegistration} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="first_name" className="text-gray-900">
              First Name
            </label>
            <div className="flex items-center gap-2 border border-blue-100 p-2 rounded">
              <HiOutlineUserCircle className="text-blue-600" />
              <input
                type="text"
                placeholder="David"
                name="firstName"
                id="first_name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border-none outline-none text-gray-900"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="last_name" className="text-gray-900">
              Last Name
            </label>
            <div className="flex items-center gap-2 border border-blue-100 p-2 rounded">
              <HiOutlineUserCircle className="text-blue-600" />
              <input
                type="text"
                placeholder="Warner"
                name="lastName"
                id="last_name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border-none outline-none text-gray-900"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="user_type" className="text-gray-900">
              User Type
            </label>
            <div className="flex items-center gap-2 border border-blue-100 p-2 rounded">
              <HiOutlineUserCircle className="text-blue-600" />
              <input
                type="text"
                placeholder="Job Seeker"
                name="userType"
                id="user_type"
                required
                value={userType}
                readOnly
                className="w-full border-none outline-none text-gray-900"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-900">
              Email
            </label>
            <div className="flex items-center gap-2 border border-blue-100 p-2 rounded">
              <HiOutlineMail className="text-blue-600" />
              <input
                type="text"
                placeholder="warner22@info.com"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-none outline-none text-gray-900"
              />
            </div>
            {errors  && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-900">
              Password
            </label>
            <div className="flex items-center gap-2 border border-blue-100 p-2 rounded relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-none outline-none text-gray-900"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <HiOutlineEye className="text-blue-600" />
                ) : (
                  <HiOutlineEyeOff className="text-blue-600" />
                )}
              </div>
              
            </div>
            {errors  && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm_password" className="text-gray-900">
              Confirm Password
            </label>
            <div className="flex items-center gap-2 border border-blue-100 p-2 rounded relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirm_password"
                id="confirm_password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-none outline-none text-gray-900"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <HiOutlineEye className="text-blue-600" />
                ) : (
                  <HiOutlineEyeOff className="text-blue-600" />
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 text-gray-900 text-sm mt-4">
            <p>
              By creating an account or logging in, you understand and agree to
              Job Portal's{" "}
              <Link href="/terms" className="text-blue-600">
                Terms
              </Link>
              . You also acknowledge our{" "}
              <Link href="/cookie" className="text-blue-600">
                Cookie
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600">
                Privacy
              </Link>{" "}
              policies.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="termscheck"
                required
                className="form-checkbox"
              />
              <label htmlFor="termscheck">
                I will agree to the company's terms & conditions.
              </label>
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
            Do have an account?{" "}
            <Link href="/signin" className="text-blue-600">
              Sing In
            </Link>
          </p>
          <span className="block my-4 text-gray-900">OR</span>
        </div>

       <SocialLogin  className={"flex flex-col md:flex-row gap-4 mt-4"}/>
      </div>
    </div>
  );
};

export default Register;
