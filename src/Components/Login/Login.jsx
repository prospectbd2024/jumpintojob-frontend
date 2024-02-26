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
import { useRouter,useSearchParams } from "next/navigation";
import {signIn,useSession} from 'next-auth/react'
import axios from "axios";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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
  const session = useSession();
  const handleSocialLogin = async (sessionData)=>{
    // try {
      let profile = sessionData.user;
      console.log(
        {profile}
      );

      // Customize validation logic based on your requirements
      if (!profile.name || !profile.email) {
        throw new Error('Missing required profile information.');
      }

      // Add 'provider': 'google' only if necessary
      // Consider alternative methods for storing sensitive information
      const modifiedProfile = { ...profile,user_type : 'job_seeker'};

      if (modifiedProfile) {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/social-signin`, {
          profile: modifiedProfile
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // console.log(response.data); // Log response for debugging
        console.log(data)
        if(data.data.result==true){
          setUserData(data)
          navigate.push('/')
          Swal.close()

        }


        return '/sign?'+createQueryString('error',data.data.message)

        // Handle successful sign-in based on your application logic (e.g., redirect, display message)
      }

      return true; // Assuming successful sign-in by default
    // } catch (error) {
    //   console.error('Sign-in error:', error);
    // }
  }
  useEffect(() => {

    setMessage( params.get('msg'))
    if(session.status=='authenticated'){
      Swal.fire({
        position: 'center',
        icon: 'warning', // Use 'warning' for a more appropriate processing icon
        title: 'Processing...', // Add ellipsis "..." for better indication
        showConfirmButton: false,
        // timer: 20000,
        allowEscapeKey: false, // Prevent accidental closing with Escape key
        allowOutsideClick: false, // Prevent accidental closing by clicking outside
      });
      handleSocialLogin(session.data)
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
        {message&&
          <div
            style={{
              color: "white",
              backgroundColor: "#3498db",
              height: "27px",
              width: "459px",
              paddingTop: "6px",
              marginInline: "auto",
              borderRadius: "4px",
              marginBlockEnd : '20px'
            }}
          >
            {message}
          </div>
        }
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
        <div className="register-to-login mt-5">
            <p>
              Already have an account? <Link href="/register">Register</Link>{" "}
              here
            </p>
          </div>
        <div className="social-login">
          <button onClick={()=>{signIn('google')}}>
            <FcGoogle/> Login With Google
          </button>
          <button onClick={()=>{signIn('facebook')}}>
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
