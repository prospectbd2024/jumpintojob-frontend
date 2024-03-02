"use client";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlineUserCircle,
}

from "react-icons/hi";
import Link from "next/link";
import { useUserContext } from "../../UserContext/UserContext";
import Swal from "sweetalert2";
import { usePathname, useRouter,useSearchParams } from "next/navigation";
import {signIn} from 'next-auth/react'
import axios from "axios";
import MessageBox from "../warnings/Message";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const { setUserData } = useUserContext();
  const navigate = useRouter();
  const params = useSearchParams();
  const [message,setMessage] = useState(undefined)
  const createQueryString =(name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);
  
    return params.toString();
  };

  useEffect(() => {
      if(params.get('msg')){
        setMessage( params.get('msg'))
        navigate.push(pathname)
        
      }
   
  }, [])

  const [warning, setWarning] = useState({ isWarning: false, messages: [] });
  const handleLogin = async (e) => {
    e.preventDefault();

    const userLoginData = {
      email: userEmail,
      password: userPassword,
      remember_me: rememberUser,
    };
    console.log(userLoginData);
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
    console.log( `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user/login`)
    const loginUserData = await loginData.json();
    console.log(loginUserData);
    if (loginData.ok) {
      console.log("Login Successfull", loginUserData);
      setUserData(loginUserData);
      // console.log(loginUserData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User login successfull!",
        showConfirmButton: false,
        timer: 1500,
      });
      // console.log(loginUserData.data.user)
      if(loginUserData.data.user.is_verified==false){
        navigate.push('/verify-email')
      }
      else{

        navigate.push("/");
      }

    } else {
      console.log("Something is wrong", loginUserData);
      // alert(loginUserData.message);
      setWarning((prev) => {
        return { isWarning: true, messages: loginUserData.message };
      });
    }
  };

  return (
    <div className="register-user">
      <div className="register-user-header">
        <h2>Login Account</h2>
        <span>.</span>
      </div>

      <div className="account-form">
      <MessageBox message={message}/>
        <form action="" onSubmit={handleLogin}>
          <div className="account-info">
            <label htmlFor="email">Email</label>
            <div className="account-input">
              <HiOutlineMail />
              <input
                type="email"
                placeholder="info@example.com"
                name="email"
                id="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            {warning.isWarning && (
              <div
                style={{
                  color: "red",
                  marginInlineStart: "9px",
                  fontSize: "13px",
                }}
              >
                {warning.messages}
              </div>
            )}
          </div>
          <div className="account-info">
            <label htmlFor="password">Password</label>
            <div className="account-input account-password">
              {showPassword ? (
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  id="password"
                  required
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              ) : (
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  required
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              )}
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <HiOutlineEye /> : <HiOutlineEyeOff />}
              </div>
            </div>
          </div>
          <div className="terms-conditions rememberme-n-forget">
            <div>
              <input
                type="checkbox"
                id="rememberme"
                value={rememberUser}
                onClick={() => setRememberUser(!rememberUser)}
              />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <div>
              <Link href={""}>Forget Password?</Link>
            </div>
          </div>
          <div className="register-button">
            <input type="submit" value="Login" />
          </div>

        </form>
          <div className="register-to-login m-2">
            <p>
            Don't have any account? <Link href="/register">Register</Link>{" "}
            </p>
            <span>OR</span>
          </div>
        <div className="social-login">
          <button onClick={()=>{signIn('google_job_seeker')}}>
            <FcGoogle/> Login With Google
          </button>
          <button onClick={()=>{signIn('facebook_job_seeker')}}>
            {" "}
            <img
              src="https://cdn.freebiesupply.com/logos/large/2x/facebook-3-logo-svg-vector.svg"
              alt=""
            />{" "}
            Login With Facebook
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
