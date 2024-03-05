import VerifyEmail from '@/Components/verify-email/VerifyEmail'
import React from 'react'

function page() {
  return (
    <VerifyEmail redirect={"/verify-success"} />
  )
}

export default page