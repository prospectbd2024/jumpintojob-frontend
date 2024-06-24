import React from 'react';
import { HiMap } from 'react-icons/hi';
import { FcBriefcase, FcBusinessman, FcFinePrint, FcOnlineSupport } from "react-icons/fc";

const UserProfile = ({ profile }) => {
  return (
    <div className="user-home-profile res-third-div">
      <h4>User Profile:</h4>
      <div className='user-home-profile-content'>
        <div className='home-profile'>
          <div className="home-user-profile">
            <div>
              <div className="user-profile-main">
                <img src="https://img.freepik.com/free-icon/man_318-677829.jpg" alt="" />
                <h3>{`${profile?.first_name} ${profile?.last_name}`}</h3>
                <p>Not added</p>
                <p className='user-address'><HiMap />{`${profile?.street ? profile?.street + "," : ""} ${profile?.state ? profile?.state + "," : ""} ${profile?.city ? profile?.city + "," : ""} ${profile?.country}`}</p>
              </div>
              <div className="user-profile-info">
                <div className="profile-info">
                  <FcBusinessman />
                  <div>
                    <p>Profile Verification</p>
                    <h6>Verified</h6>
                  </div>
                </div>
                <div className="profile-info">
                  <FcBriefcase />
                  <div>
                    <p>Applied Jobs</p>
                    <h6>82</h6>
                  </div>
                </div>
                <div className="profile-info">
                  <FcOnlineSupport />
                  <div>
                    <p>Interview</p>
                    <h6>02</h6>
                  </div>
                </div>
                <div className="profile-info">
                  <FcFinePrint />
                  <div>
                    <p>Profile Appear</p>
                    <h6>08</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
