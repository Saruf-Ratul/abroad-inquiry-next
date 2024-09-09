"use client";
import { m } from "framer-motion";
// @mui
import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
// components
import { MotionContainer, TextAnimate, varFade } from "@/components/animate";
import useResponsive from "@/hooks/useResponsive";
import aboutBanner from "@/public/assets/bannerImage/aboutUs-banner.webp";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  backgroundSize: "cover",
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.grey[900],
    0.8
  )} , ${alpha(theme.palette.grey[900], 0.8)}),url(${aboutBanner.src})`,
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.grey[900], 0.85),
  [theme.breakpoints.up("md")]: {
    height: 500,
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

// ----------------------------------------------------------------------

export default function AboutUsHero() {
  const theme = useTheme();

  const isDesktop = useResponsive("up", "sm");

  const isLight = theme.palette.mode === "light";
  return (
    <RootStyle>
      <Container
        component={MotionContainer}
        sx={{ position: "relative", height: "80%" }}
      >
        <ContentStyle spacing={2}>
          <Box sx={{ display: "inline-flex", color: "common.white" }}>
            <TextAnimate
              text="ABOUT"
              sx={{ color: "secondary.main", paddingRight: 2 }}
              variants={varFade().inRight}
            />
            <TextAnimate text="US" sx={{ mr: 2 }} />
          </Box>

          <m.div variants={varFade().inRight}>
            <Typography
              sx={{
                mt: 1,
                mb: 1,
                color: "common.white",
              }}
            >
              Informing the aspirants of the factual information of a country
              and providing admission, scholarship, and visa services for study
              abroad through expert mentors who already went through the
              process, became successful and living in the country.
            </Typography>
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
