"use client";
import { styled } from "@mui/material/styles";
import MentorsHero from "@/sections/mentors/MentorsHero";
import MentorsList from "@/sections/mentors/MentorsList";


const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  marginTop:"40px",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(11),
  },
}));


export default function MentorsPage() {
  return (
    <RootStyle>
      <MentorsHero />
      <MentorsList />
    </RootStyle>
  );
}
