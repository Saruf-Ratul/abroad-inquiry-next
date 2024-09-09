import AuthHeaderSignUp from '@/layouts/auth/MainHeaderSignUp'
import React from 'react'
import MentorRegistrationForm1 from "@/sections/auth/register/mentorRegistration/MentorRegistrationForm1"
import MainFooter from '@/layouts/main/MainFooter'


const MentorSignUp1 = () => {
  return (
    <div>
      <AuthHeaderSignUp />
      <MentorRegistrationForm1 />
      <MainFooter />
    </div>
  )
}

export default MentorSignUp1