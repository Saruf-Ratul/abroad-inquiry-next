"use client";

import withAuth from "@/sections/auth/withAuth";
import MentorsList from "@/sections/dashboard/main/MentorsList";
const MentorsPage = () => {
  return <div>
     <MentorsList/>
  </div>;
}


export default withAuth(MentorsPage);