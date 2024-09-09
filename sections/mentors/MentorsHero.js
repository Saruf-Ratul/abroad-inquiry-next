"use client";
import { m } from "framer-motion";
import {
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { MotionContainer, TextAnimate, varFade } from "@/components/animate";
import MentorsBanner from "@/public/assets/bannerImage/mentors.webp"


const RootStyle = styled("div")(({ theme }) => ({
  backgroundSize: "cover",
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.grey[900],
    0.8
  )} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}), url(${MentorsBanner.src})`,
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.grey[900], 0.85),
  [theme.breakpoints.up("md")]: {
    height: 460,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  //textAlign: "center",
  [theme.breakpoints.up("md")]: {
    maxWidth: 700,
    textAlign: "left",
    position: "absolute",
    bottom: theme.spacing(15),
  },
}));



export default function MentorsHero() {

  return (
    <RootStyle>
      <Container
        component={MotionContainer}
        sx={{ position: "relative", height: "100%" }}
      >
        <ContentStyle spacing={2}>
          <TextAnimate text="Mentors" sx={{ color: "secondary.main" }} />

          <m.div variants={varFade().inRight}>
            <Typography
              sx={{
                mt: 1,
                mb: 1,
                color: "common.white",
              }}
            >
              Our mentors are here to support you on your academic journey.
              Schedule appointments for personalized guidance or start a chat to
              discuss your study abroad plans. Get tailored advice from
              experienced professionals to navigate your educational path with
              confidence.
            </Typography>
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
