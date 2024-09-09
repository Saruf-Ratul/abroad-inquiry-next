"use client";
import { m } from "framer-motion";
// @mui
import { Box, Container, Grid, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
//
import { MotionContainer, TextAnimate, varFade } from "@/components/animate";
import contactUsBanner from "@/public/assets/bannerImage/contactUs-banner.webp"



const RootStyle = styled("div")(({ theme }) => ({
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.grey[900],
    0.8
  )} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}), url(${contactUsBanner.src})`,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up("md")]: {
    height: 430,
    padding: 0,
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    textAlign: "center",
    position: "absolute",
    bottom: theme.spacing(15),
  },
}));


export default function ContactHero() {
  return (
    <RootStyle>
      <Container
        component={MotionContainer}
        sx={{ position: "relative", height: "100%" }}
      >
        <ContentStyle>
          <TextAnimate
            text="Where"
            sx={{ color: "secondary.main", paddingRight: 2 }}
            variants={varFade().inRight}
          />
          <Box sx={{ display: "inline-flex", color: "common.white",textAlign:"center", }}>
            <TextAnimate text="to" sx={{ mr: 2 }} />
            <TextAnimate text="find" sx={{ mr: 2 }} />
            <TextAnimate text="us?" />
          </Box>


          <Grid container spacing={5} sx={{ mt: 5, color: "common.white" }}>
            <Typography>
            Students can contact us via our phone, by visiting our office, and via the contact message. In addition, prospective students can message, make an appointment with the mentors if they have study abroad questions. Together we strive to provide more factual information to our students.
            </Typography>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
