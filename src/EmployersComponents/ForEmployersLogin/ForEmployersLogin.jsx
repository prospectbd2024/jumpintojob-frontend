"use client"
import React, { useState,useEffect } from 'react';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from 'react-icons/hi';
import  Link  from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useUserContext } from '../../UserContext/UserContext';
import { useRouter ,useSearchParams,usePathname} from 'next/navigation';
import MessageBox from '@/Components/warnings/Message';
import WarningBox from '@/Components/warnings/Warning';

const ForEmployersLogin = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [rememberUser, setRememberUser] = useState(false);
    const [warning, setWarning]= useState();
    const [message,setMessage] = useState(undefined)
    const pathname = usePathname();
    const { setUserData } = useUserContext();
    const params = useSearchParams();
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();
        const userLoginData = { 'email': userEmail, 'password': userPassword, 'remember_me': rememberUser };
        console.log(userLoginData)
        const loginData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userLoginData)
        });
        const loginUserData = await loginData.json();
        if (loginData.ok) {
            console.log('Login Successfull', loginUserData);
            setUserData(loginUserData);
            if(loginUserData.data.user.is_verified==false){
                router.push('/foremployers/verify-email')
              }
              else{
                router.push("/foremployers");
              }
        } else {
            console.log('Something is wrong', loginUserData)
            setWarning(loginUserData.message)
            // alert()
        }
    }
    useEffect(() => {
        if(params.get('msg')){
            setMessage( params.get('msg'))
            console.log( router.push(pathname));
        }

       
      }, [])
    
    return (
        <div className='register-user'>
            <div className="register-user-header">
                <h2>Login Account</h2>
                <span>.</span>
            </div>

            <MessageBox message={message}/>
            <div className="account-form">
                <form action="" onSubmit={handleLogin}>
                    <div className='account-info'>
                        <label htmlFor="email">Email</label>
                        <div className="account-input">
                            <HiOutlineMail/>
                            <input type="email" placeholder='info@example.com' name="email" id="email" required value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className='account-info'>
                        <label htmlFor="password">Password</label>
                        <div className="account-input account-password">
                            {showPassword
                                ?
                                <input type="text" placeholder='Password' name="password" id="password" required value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                                :
                                <input type="password" placeholder='Password' name="password" id="password" required value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                            }
                            <div onClick={() => setShowPassword(!showPassword)}>
                                {showPassword
                                    ?
                                    <HiOutlineEye/>
                                    :
                                    <HiOutlineEyeOff/>
                                }
                            </div>
                        </div>
                                <WarningBox message={warning} />    
                    </div>
                    <div className="terms-conditions rememberme-n-forget">
                        <div>
                            <input type="checkbox" id="rememberme" value={rememberUser} onClick={() => setRememberUser(!rememberUser)} />
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
                        <p>Already have an account? <Link href="/signin">Login</Link> Here</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForEmployersLogin;