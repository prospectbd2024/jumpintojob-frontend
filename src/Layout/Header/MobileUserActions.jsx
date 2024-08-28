"use client"; 
import Link from "next/link"; 
const MobileUserActions = ({ userData, handleSignoutAlert, handleLogout }) => {
    return (
      <div className="mt-6 space-y-4">
        {userData ? (
          <>
            <Link
              href="/dashboard/appliedjobs"
              className="block px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            >
              Dashboard
            </Link>
            <button
              className="block w-full text-center px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
              onClick={handleSignoutAlert}
            >
              Post a Job
            </button>
            <button
              className="block w-full text-center px-4 py-3 text-2xl font-semibold text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/signin" 
              className={ `${location =="/signin"  ?"text-blue-500" : "text-gray-800"} 
              block px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200`}
            >
              Sign in   
            </Link>
            <Link
              href="/signup"
              className={ `${location =="/signup"  ?"text-blue-500" : "text-gray-800"} 
              block px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200`}
            >
              Register
            </Link>
          </>
        )}
        <Link
          href="/foremployers"
          className={ `${location =="/foremployers"  ?"text-blue-500" : "text-gray-800"} 
              block px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200`}
        >
          For Employers
        </Link>
      </div>
    );
  };

  export default MobileUserActions;