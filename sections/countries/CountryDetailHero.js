"use client";
import { m } from "framer-motion";
import { Container, Stack, Typography } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { MotionContainer, TextAnimate, varFade } from "@/components/animate";


const RootStyle = styled("div")(({ theme, img }) => ({
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.grey[900],
    0.8
  )} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}),url(https://flagcdn.com/${img}.svg)`,
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.grey[900], 0.85),
  [theme.breakpoints.up("md")]: {
    height: 500,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: 700,
    textAlign: "left",
    position: "absolute",
    bottom: theme.spacing(25),
  },
}));

export default function CountryDetailHero({ countryDetails }) {
  const countryCode = {
    Belgium: "be",
    Canada: "ca",
    Germany: "de",
    Denmark: "dk",
    Norway: "no",
    Sweden: "se",
    Finland: "fi",
    Netherlands: "nl",
    UK: "gb",
    USA: "us",
    Ireland: "ie",
    Italy: "it",
    Hungary: "hu",
    "South Korea": "kr",
    Australia: "au",
  };

  const countryShortDescription = {
    Australia:
      "It is one of the best countries for international students, with a moderate visa ratio and permanent residency opportunities for Bangladeshi students. Many top-ranked Australian institutions offer cheaper tuition prices for Bachelor's and Master's programs. Students can work up to 20 hours per week while studying to fund their living expenses.",
    Canada:
      "This destination stands out as a top choice due to its top-ranked universities and tremendous PR opportunities. International students and their dependents can work together to build a quality lifestyle supported by employment opportunities.",
    Denmark:
      "A Schengen nation with a high visa ratio and permanent residency opportunities for Bangladeshi students. Many top-ranked Danish institutions offer cheaper tuition prices for Bachelor's and Master's programs. In addition, students can work up to 20 hours per week while studying to fund their living expenses.",
    Netherlands:
      "The Netherlands is a Schengen country with a high visa rate and permanent residency options for Bangladeshi students. Many top-tier Dutch Universities offer lower tuition rates for Bachelor's and Master's programs. Students can work up to 16 hours per week while studying to help cover their living expenses.",
    Belgium:
      "Belgium is a Schengen country with a high Visa ratio and PR opportunity for student Visas from Bangladesh. In addition, there are many top-ranked universities in Belgium have lower tuition fees for Bachelor’s and Master’s programs. Students can work up to 20 hours per week during study and cover their living costs.",
    Finland:
      "Finland is a Schengen European country with a high visa ratio and PR opportunity for student visas from Bangladesh. In addition, the country has many top-ranked universities and lower tuition fees than Canada for Bachelor’s and Master’s programs. Moreover, students can work up to 30 hours weekly during study and cover their living costs.",
    "South Korea":
      "South Korea is considered one of the most popular overseas higher education destinations for Bangladeshi students. The country has several top universities offering undergraduate and postgraduate programs. Additionally, students can work up to 25 hours a week while studying to cover living expenses. Korea has a diverse student population, and students can find multicultural environments in order to study and discover diverse cultures.",
    Ireland:
      "A European nation with a high visa ratio and permanent residency opportunities for Bangladeshi students. Many top-ranked Irish institutions offer cheaper tuition prices for Bachelor's and Master's programs. Students can work up to 20 hours per week while studying to fund their living expenses.",
  };

  return (
    <RootStyle img={countryCode[countryDetails.countryName]}>
      <Container
        component={MotionContainer}
        sx={{ position: "relative", height: "100%" }}
      >
        <ContentStyle spacing={2}>
          <Typography
            sx={{
              color: "secondary.main",
              fontWeight: "bold",
              fontSize: "42px",
            }}
          >
            {countryDetails.countryName}
          </Typography>
          <m.div variants={varFade().inRight}>
            <Typography
              sx={{
                mt: 1,
                mb: 1,
                color: "common.white",
              }}
            >
              {countryShortDescription[countryDetails.countryName]}
            </Typography>
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
