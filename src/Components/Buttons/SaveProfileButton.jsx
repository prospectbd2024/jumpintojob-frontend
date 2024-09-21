import { useUserProfileContext } from '@/Contexts/UserProfileContext'
import React from 'react'

function SaveProfileButton() {
  const { saveProfile } = useUserProfileContext();
  return (
    <button
      onClick={saveProfile}
      className="bg-primary-color text-white w-32 h-10 rounded-md border-none text-lg font-bold cursor-pointer transition duration-300 ease-in-out hover:bg-primary-dark
      "
    >
      Save
    </button>
  )
}

export default SaveProfileButton;
