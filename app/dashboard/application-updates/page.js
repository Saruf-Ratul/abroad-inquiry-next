"use client";
import withAuth from "@/sections/auth/withAuth";
import ApplicationUpdate from "@/sections/student/ApplicationUpdate";
import React from "react";



const ApplicationUpdates = () => {
  return (
 <div>
  <ApplicationUpdate />
 </div>
  );
};

export default withAuth(ApplicationUpdates);
