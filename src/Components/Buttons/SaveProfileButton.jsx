import { useUserProfileContext } from '@/Contexts/UserProfileContext'
import React from 'react'

function SaveProfileButton() {
    const {saveProfile} = useUserProfileContext();
  return (
    <button onClick={saveProfile} style={{ background: "var(--primary-color)", color: "#fff", width: "120px", height: "40px", borderRadius: "5px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: ".3s" }}>save</button>
  )
}

export default SaveProfileButton