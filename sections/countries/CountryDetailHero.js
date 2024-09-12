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
    Switzerland: "ch",
  };

  const countryShortDescription = {
    USA:"The United States of America (the USA) is a country primarily located in North America. It consists of 50 states with some other areas. It is the world's third- or fourth-largest country by total area. The US higher education system is considered one of the best in the world and offers flexible study opportunities at over 4,000 colleges and universities.",
    UK:"The United Kingdom(UK) or Britain, is known as the world’s second most popular destination for international students. The UK welcomes almost 460,000 international students from around the world every year. Having built a world-class education system, higher education in the UK is a model for many countries around the globe.",
    Sweden:"Sweden is a Scandinavian nation with thousands of coastal islands and inland lakes, along with vast boreal forests and glaciated mountains. Its principal cities, eastern capital Stockholm and southwestern Gothenburg and Malmö, are all coastal. Stockholm is built on 14 islands.",
    Norway:"A Scandinavian country, Norway is well developed and forward-thinking. Officially the Kingdom of Norway, the country is located in Northwestern Europe. It is home to over 5.3 million people. With a great reputation for research, Norway is perfect for any international student.",
    Italy:"Italy is widely known for being an education hub of Europe and is home to an impressive 41 universities featured in the QS World University Rankings 2022. However, many Bangladeshi students apply to Italy due to its low tuition fee and scholarships offered by Italian universities, which attracts diverse international students.",
    Hungary:"Hungary is a landlocked country, situated in the Carpathian Basin. Its two longest rivers called Danube and Tisza divide Hungary into three parts: Transdanubia (to the west of the Danube), the plain between the Rivers Danube and Tisza, and the Trans-Tisza region. However, there are several reasons why Bangladeshi students should consider studying in Hungary. Firstly, Hungary offers affordable tuition fees compared to other European countries, making it an attractive option for Bangladeshi students who want to pursue higher education in Hungary.",
    Germany: "Germany is located in the heart of Europe. It borders nine neighbors, more than any other European country. Germany's central and southern regions have forested hills and mountains cut through by the Danube, Main, and Rhine River valleys",
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
    Switzerland: "Switzerland is a Schengen country with inexpensive education fees and a high visa percentage for students from Bangladesh. Switzerland boasts several highly regarded institutions and reduced tuition prices for Bachelor's and Master's degrees. Students can work up to 15 hours per week while studying and full-time on vacation to help funding their living expenses.",
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
