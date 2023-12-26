"use client";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlineUserCircle,
} from "react-icons/hi";
import Link from "next/link";
import { useUserContext } from "../../UserContext/UserContext";
import Swal from "sweetalert2";
import { useRouter,useSearchParams } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const { setUserData } = useUserContext();
  const navigate = useRouter();
  const params = useSearchParams();

  const [message,setMessage] = useState(undefined)


  useEffect(() => {

    setMessage( params.get('msg'))
   
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
    const loginUserData = await loginData.json();
    console.log(loginUserData);
    if (loginData.ok) {
      console.log("Login Successfull", loginUserData);
      setUserData(loginUserData);
      console.log(loginUserData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User login successfull!",
        showConfirmButton: false,
        timer: 1500,
      });

      if(loginUserData.data.message==', Please verify your email address to use all features!'){
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
          <div className="register-to-login">
            <p>
              Already have an account? <Link href="/register">Register</Link>{" "}
              here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
