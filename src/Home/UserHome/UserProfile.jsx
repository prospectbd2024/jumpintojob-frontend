import React, { useState, useEffect } from 'react';
import { HiMap } from 'react-icons/hi';
import { FcBriefcase, FcBusinessman, FcFinePrint, FcOnlineSupport } from 'react-icons/fc';
import UserProfileSkeleton from '@/Skeletons/UserProfileSkeleton';

const UserProfile = ({ profile }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (remove this in real usage)
    if (profile && Object.keys(profile).length > 0) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [profile]);

  if (loading) {
    return <UserProfileSkeleton />;
  }

  return (
    <div className="mb-12">
      <h4 className="mb-4 text-lg font-normal text-gray-700">User Profile:</h4>
      <div className="border border-gray-300 rounded-lg p-5">
        <div className="mb-5 border-b border-gray-300 pb-5 text-center">
          <img 
            src="https://img.freepik.com/free-icon/man_318-677829.jpg" 
            alt="User Profile" 
            className="w-16 h-16 border border-gray-400 rounded-full mx-auto mb-3" 
          />
          <h3 className="text-xl font-semibold">{`${profile?.first_name} ${profile?.last_name}`}</h3>
          <p className="text-gray-600 mt-1">Not added</p>
          <p className="text-gray-600 mt-1 flex items-center justify-center">
            <HiMap className="text-orange-500 mr-2" />
            {`${profile?.street || ''} ${profile?.state || ''} ${profile?.city || ''} ${profile?.country || ''}`}
          </p>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-4">
              <FcBusinessman className="text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Profile Verification</p>
                <h6 className="text-md font-medium">Verified</h6>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <FcBriefcase className="text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Applied Jobs</p>
                <h6 className="text-md font-medium">82</h6>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <FcOnlineSupport className="text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Interview</p>
                <h6 className="text-md font-medium">02</h6>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FcFinePrint className="text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Profile Appear</p>
                <h6 className="text-md font-medium">08</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
