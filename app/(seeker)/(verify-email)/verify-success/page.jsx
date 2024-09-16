"use client"
import React from 'react';
import Link from 'next/link';

function verifYsuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-green-500 text-6xl mb-4">
        <i className="fa-solid fa-check-circle" />
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">Account Verified!</h1>
      <p className="text-gray-600 mb-4">
        Congratulations, your account has been successfully verified!
      </p>
      <p className="text-gray-600 mb-6 text-center">
        Now you can enjoy all the features and benefits of our platform. Start exploring!
      </p>
      <Link href="/jobs" className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">
  
          Explore Jobs
     
      </Link>
    </div>
  );
}

export default verifYsuccess;
