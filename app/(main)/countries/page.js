"use client";
import React from 'react'
import CountriesHero from '@/sections/countries/CountriesHero';
import CountryList from '@/sections/countries/CountryList';
import styled from '@emotion/styled';

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  marginTop:"40px",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(11),
  },
}));


const CountriesPage = () => {
  return (
    <RootStyle>
      <CountriesHero />
      <CountryList />
    </RootStyle>
  )
}

export default CountriesPage