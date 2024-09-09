"use client";
import useSettings from "@/hooks/useSettings";
import HomeCountries from "@/sections/home/HomeCountries";

import HomeExplore from "@/sections/home/HomeExplore";

import HomeHero from "@/sections/home/HomeHero";
import HomeMentorList from "@/sections/home/HomeMentorList";
import HomeMentors from "@/sections/home/HomeMentors";
import HomePartners from "@/sections/home/HomePartners";
import HomeServices from "@/sections/home/HomeServices";
import HomeSwissCare from "@/sections/home/HomeSwissCare";

import JoinFbGroupSection from "@/sections/home/JoinFbGroupSection";
import OurSuccessStory from "@/sections/home/OurSuccessStory";

import { useSnackbar } from "notistack";

export default function HomePage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { themeMode, onToggleMode } = useSettings();

  return (
    <main>
      <HomeHero />
      <HomeServices />
      <HomeMentorList />
      <HomeMentors />
      <HomeCountries />
      <OurSuccessStory />
      <HomeExplore />
      <HomePartners />
      <HomeSwissCare />
      <JoinFbGroupSection/>
    </main>
  );
}
