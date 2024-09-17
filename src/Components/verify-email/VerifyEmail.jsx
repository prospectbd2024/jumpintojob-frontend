"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/Contexts/UserContext';

const VerifyEmail = ({ redirect }) => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(60); // Initial timer value in seconds
  const { userData, bearerToken } = useUserContext();

  useEffect(() => {
    let timerInterval;

    if (resendDisabled) {
      timerInterval = setInterval(() => {
        setResendTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(timerInterval);
            setResendDisabled(false);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [resendDisabled]);

  const resandVerificationCode = async () => {
    // console.log("resending")
    setResendDisabled(true); // Disable the resend button
    setResendTimer(60); // Reset timer to initial value

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verification_code/resend_code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({ verify_by: 'email', email_or_phone: userData.data.user.email }),
      });

      const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error('Error during resending:', error);
    }
  }

  const handleVerification = async () => {
    console.log(userData);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/confirm_code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({ verification_code: verificationCode }),
      });

      const data = await response.json();
      if (data.result) {
        router.push(redirect);
      } else {
        setMessage(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setMessage('An error occurred during verification');
    }
  };

  return (
    <div className="text-center mt-12 mb-24 h-[40vh] flex flex-col items-center">
      <h1 className="text-2xl text-gray-800 mb-5">Verify Email</h1>
      <p className="text-gray-600 mb-5">Enter the verification code sent to your email </p>
      <div>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        className="p-2 border border-gray-300 rounded mr-2"
      />
      <button
        onClick={handleVerification}
        className="bg-green-500 text-white py-2 px-4 rounded mr-1"
      >
        Verify
      </button>
      <button
        onClick={resandVerificationCode}
        className={`py-2 px-4 rounded text-white ${resendDisabled ? 'bg-secondary cursor-not-allowed' : 'bg-blue-500 cursor-pointer'}`}
        disabled={resendDisabled}
      >
        Resend {resendTimer !== 0 && `(${resendTimer}s)`}
      </button>
      </div>
      {message && (
        <p className="text-red-500 mt-3 italic">{message}</p>
      )}
    </div>
  );
};

export default VerifyEmail;
