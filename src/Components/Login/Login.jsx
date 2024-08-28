"use client";
import React, { useEffect, useState } from "react";

import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineMail, 
} from "react-icons/hi";
import Link from "next/link";
import { useUserContext } from "../../Contexts/UserContext";
import Swal from "sweetalert2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MessageBox from "../warnings/Message";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const { setUserData } = useUserContext();
  const navigate = useRouter();
  const params = useSearchParams();
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    if (params.get("msg")) {
      setMessage(params.get("msg"));
      navigate.push(pathname);
    }
  }, []);

  const [warning, setWarning] = useState({ isWarning: false, messages: [] });

  const handleLogin = async (e) => {
    e.preventDefault();

    const userLoginData = {
      email: userEmail,
      password: userPassword,
      remember_me: rememberUser,
    };

    const loginData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user/login`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userLoginData),
      }
    );

    const loginUserData = await loginData.json();
    if (loginData.ok) {
      setUserData(loginUserData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User login successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      if (loginUserData.data.user.is_verified == false) {
        navigate.push("/verify-email");
      } else {
        navigate.push("/");
      }
    } else {
      setWarning((prev) => {
        return { isWarning: true, messages: loginUserData.message };
      });
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div className="text-center mb-10 relative">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900">
          Login Account
        </h2>
        <span className="text-gray-400 text-7xl absolute inset-0 flex justify-center top-10 md:top-8 -z-10">
          .
        </span>
      </div>

      <div className="bg-white w-full max-w-md p-8 md:p-12 rounded-lg border border-blue-100 shadow-md">
        <MessageBox message={message} />
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-900">
              Email
            </label>
            <div className="flex items-center gap-2 border border-blue-100 p-2 rounded">
              <HiOutlineMail className="text-blue-600" />
              <input
                type="email"
                placeholder="info@example.com"
                name="email"
                id="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full border-none outline-none text-gray-900"
              />
            </div>
            {warning.isWarning && (
              <div className="text-red-500 text-sm">{warning.messages}</div>
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
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
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

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberme"
                checked={rememberUser}
                onChange={() => setRememberUser(!rememberUser)}
                className="form-checkbox"
              />
              <label htmlFor="rememberme" className="text-gray-900">
                Remember me
              </label>
            </div>
            <Link href="" className="text-blue-600">
              Forget Password?
            </Link>
          </div>

          <div>
            <input
              type="submit"
              value="Login"
              className="w-full bg-blue-600 text-white py-2 rounded font-bold cursor-pointer hover:bg-blue-700 transition-colors"
            />
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-900">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600">
              Register
            </Link>
          </p>
          <span className="block my-4 text-gray-900">OR</span>
        </div>

       <SocialLogin className={"flex flex-col   gap-4 mt-4"}/>
      </div>
    </div>
  );
};

export default Login;
