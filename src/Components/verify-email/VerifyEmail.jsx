'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/UserContext/UserContext';

const VerifyEmail = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const {userData,bearerToken} = useUserContext();
  // console.log(bearerToken,userData);
  const resandVerificatinCode =async ()=>{
    console.log("resending")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/resend_code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({ verify_by: userData.data.user.email }),
    });
    
    const data = await response.json()
    console.log(data)

    
  }

  const handleVerification = async () => {
    console.log(userData);
    try {
      // Make a request to your backend API for email verification
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
        // If verification is successful, you can redirect the user or show a success message
        router.push('/verify-success');
      } else {
        // If verification fails, display an error message
        setMessage(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setMessage('An error occurred during verification');
      // router.push('/verify-success');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' , marginBottom: '100px'}}>
      <h1 style={{ color: '#333' , marginBlockEnd : '20px'}}>Verify Email</h1>
      <p style={{ color: '#555' ,margin : '20px'}}>Enter the verification code sent to your email:</p>
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
        onClick={resandVerificatinCode}
        style={{
          backgroundColor: '#3199d8',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Resend
      </button>
      {message && (
        <p style={{ color: 'red', marginTop: '10px', fontStyle: 'italic' }}>{message}</p>
      )}
    </div>
  );
};

export default VerifyEmail;
