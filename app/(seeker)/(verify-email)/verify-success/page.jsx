import React from 'react'
import Link from 'next/link'

function verifYsuccess() {
  return (
    <div className="verify-success-container">
      <div className="icon-container">
        <i className="fa-solid fa-check-circle" />
      </div>
      <h1 className="heading">Account Verified!</h1>
      <p className="message">
        Congratulations, your account has been successfully verified!
      </p>
      <p className="info">
        Now you can enjoy all the features and benefits of our platform. Start exploring!
      </p>
      <Link href={'/findjobs'} className="primary-button">Explore Jobs</Link>
    </div>
  );
}

export default verifYsuccess;