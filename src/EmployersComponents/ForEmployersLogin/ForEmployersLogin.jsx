"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { useUserContext } from "../../Contexts/UserContext";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import MessageBox from "@/Components/warnings/Message";
import WarningBox from "@/Components/warnings/Warning";

const ForEmployersLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [warning, setWarning] = useState();
  const [message, setMessage] = useState(undefined);
  const pathname = usePathname();
  const { setUserData } = useUserContext();
  const params = useSearchParams();
  const router = useRouter();

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
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userLoginData),
      }
    );
    const loginUserData = await loginData.json();
    if (loginData.ok) {
      if (loginUserData.data.user_type!=="employer"){
        setWarning("Please login as Employer!") 
        setUserData(null)
         return;
      }
      console.log("Login Successful", loginUserData);
      setUserData(loginUserData);
      if (loginUserData.data.user.is_verified == false) {
        router.push("/foremployers/verify-email");
      } 
       else {
        router.push("/foremployers");
      }
    } else {
      setWarning(loginUserData.message);
    }
  };

  useEffect(() => {
    if (params.get("msg")) {
      setMessage(params.get("msg")); 
    }
  }, []);

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

     

      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 md:p-12 max-w-md w-full">
      <MessageBox message={message}  />
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-md">
              <HiOutlineMail className="text-blue-600" />
              <input
                type="email"
                placeholder="info@example.com"
                name="email"
                id="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full outline-none border-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-md relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                required
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="w-full outline-none border-none text-gray-700"
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
            <WarningBox message={warning} />
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
              <label htmlFor="rememberme" className="text-gray-700">
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

          <div className="text-center mt-4">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link href="/foremployers/register" className="text-blue-600">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForEmployersLogin;
