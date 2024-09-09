"use client";
import withAuth from '@/sections/auth/withAuth';
import ApplicationApplyForm from '@/sections/student/ApplicationApplyForm'
import React from 'react'

const ApplicationAbroad = () => {
  return (
    <>
      <ApplicationApplyForm />
    </>
  )
}

export default withAuth(ApplicationAbroad);