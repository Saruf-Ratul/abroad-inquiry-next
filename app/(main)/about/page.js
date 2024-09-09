"use client";
import AboutUsHero from "@/sections/aboutUs/AboutUsHero";
import CollaborateWithUs from "@/sections/aboutUs/CollaborateWithUs"; // Import the CollaborateWithUs component
import ComprehensiveSupport from "@/sections/aboutUs/ComprehensiveSupport"; // Import the ComprehensiveSupport component
import OurInnovativeSolutions from "@/sections/aboutUs/OurInnovativeSolutions"; // Import the OurInnovativeSolutions component
import OurMission from "@/sections/aboutUs/OurMission"; // Import the OurMission component
import WhoWeAre from "@/sections/aboutUs/WhoWeAre";
import { RootStyle } from "../contact/style";

const AboutUsPage = () => (
  <RootStyle>
    <AboutUsHero />
    <WhoWeAre />
    <OurMission />
    <OurInnovativeSolutions />
    <ComprehensiveSupport />
    <CollaborateWithUs />
  </RootStyle>
);

export default AboutUsPage;
