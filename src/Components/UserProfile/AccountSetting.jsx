"use client";
import React, { useState } from "react";

const AccountSetting = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password don't match.");
      return;
    }

    console.log("Changing password...");
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="font-sans max-w-lg">
      <h2 className="text-xl mb-4">Account Settings</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="oldPassword" className="mb-2">
            Old Password:
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border border-secondary-color rounded-md p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="newPassword" className="mb-2">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-secondary-color rounded-md p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-secondary-color rounded-md p-2 w-full"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleChangePassword}
            className="bg-primary-color text-white font-bold py-2 px-4 rounded-md hover:bg-primary-color-dark transition-all"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
