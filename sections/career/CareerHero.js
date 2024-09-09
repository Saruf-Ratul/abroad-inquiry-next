"use client";
import { m } from "framer-motion";
// @mui
import {
  Box,
  Container,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
// components
import Iconify from "@/components/Iconify";
import InputStyle from "@/components/InputStyle";
import { MotionContainer, TextAnimate, varFade } from "@/components/animate";
import useResponsive from "@/hooks/useResponsive";
import careerBanner from "@/public/assets/bannerImage/carrerBanner.jpg"

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  backgroundSize: "cover",
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.grey[900],
    0.8
  )} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}),url(${careerBanner.src})`,
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.grey[900], 0.85),
  [theme.breakpoints.up("md")]: {
    height: 400,
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

export default function CareerHero() {
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
            <Typography variant="h2"  sx={{ color: "secondary.main", paddingRight: 2 }}>Build Your Career With Us</Typography>
          </Box>

          <m.div variants={varFade().inRight}>
            <Typography
              sx={{
                mt: 1,
                mb: 1,
                color: "common.white",
              }}
            >
            Become a part of our big family to inspire and get inspired by professional experts.
            </Typography>
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
