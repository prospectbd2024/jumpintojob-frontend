"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/UserContext/UserContext';

const VerifyEmail = ({redirect}) => {
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
        setResendTimer(prevTimer => {
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
    console.log("resending")
    setResendDisabled(true); // Disable the resend button
    setResendTimer(60); // Reset timer to initial value

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verification_code/resend_code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({ verify_by:'email' , email_or_phone: userData.data.user.email }),
      });

      const data = await response.json();
      console.log(data);
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
    <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '100px' }}>
      <h1 style={{ color: '#333', marginBlockEnd: '20px' }}>Verify Email</h1>
      <p style={{ color: '#555', margin: '20px' }}>Enter the verification code sent to your email:</p>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button
        onClick={handleVerification}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '4px'
        }}
      >
        Verify
      </button>
      <button
        onClick={resandVerificationCode}
        style={{
          backgroundColor: resendDisabled ? '#ccc' : '#3199d8',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: resendDisabled ? 'not-allowed' : 'pointer',
        }}
        disabled={resendDisabled}
      >
        Resend {resendTimer !== 0 && `(${resendTimer}s)`}
      </button>
      {message && (
        <p style={{ color: 'red', marginTop: '10px', fontStyle: 'italic' }}>{message}</p>
      )}
    </div>
  );
};

export default VerifyEmail;
