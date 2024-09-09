import CareerHero from "@/sections/career/CareerHero";
import React from "react";
import { RootStyle } from "../contact/style";
import CareerCard from "@/sections/career/CareerCard";

export default function CareerPage() {
  return <RootStyle>
    <CareerHero />
    <CareerCard />
  </RootStyle>;
}
