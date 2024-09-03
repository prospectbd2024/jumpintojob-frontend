import React from "react";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";  
function SocialLogin({className}) {
  return (
    <div className={className}>
      <button
        onClick={() => signIn("google_job_seeker")}
        className="flex items-center justify-center gap-2 w-full py-2 border border-blue-100 rounded hover:bg-gray-100 transition-colors">
        <FcGoogle className="text-xl" /> Login With Google
      </button>
      <button
        onClick={() => signIn("facebook_job_seeker")}
        className="flex items-center justify-center gap-2 w-full py-2 border border-blue-100 rounded hover:bg-gray-100 transition-colors">
        <img src="https://cdn.freebiesupply.com/logos/large/2x/facebook-3-logo-svg-vector.svg" alt="Facebook logo" className="w-5" />
        Login With Facebook
      </button>
    </div>
  );
}

export default SocialLogin;
