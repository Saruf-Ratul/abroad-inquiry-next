import AuthHeaderSignUp from '@/layouts/auth/MainHeaderSignUp'
import MainFooter from '@/layouts/main/MainFooter'
import { RegisterForm } from '@/sections/auth/register'
import React from 'react'


const SignupPage = () => {
  return (
    <div>
      <AuthHeaderSignUp />
      <RegisterForm/>
      <MainFooter />
    </div>
  )
}

export default SignupPage