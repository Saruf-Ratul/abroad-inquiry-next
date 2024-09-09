"use client";
import { m } from "framer-motion";
import {
  Container,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Iconify from "@/components/Iconify";
import InputStyle from "@/components/InputStyle";
import { MotionContainer, TextAnimate, varFade } from "@/components/animate";
import useResponsive from "@/hooks/useResponsive";
import countryBanner from "@/public/assets/bannerImage/countries-banner.webp"

const RootStyle = styled("div")(({ theme }) => ({
  backgroundSize: "cover",
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.grey[900],
    0.8
  )} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}),url(${countryBanner.src})`,
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



export default function CountriesHero() {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "sm");
  const isLight = theme.palette.mode === "light";
  return (
    <RootStyle>
      <Container
        component={MotionContainer}
        sx={{ position: "relative", height: "100%" }}
      >
        <ContentStyle spacing={2}>
          <TextAnimate text="Countries" sx={{ color: "secondary.main" }} />
          <m.div variants={varFade().inRight}>
            <Typography
              sx={{
                mt: 1,
                mb: 1,
                color: "common.white",
              }}
            >
              You can select each country and learn the basic information,
              such as what to study, application deadlines, tuition fees
              and all other fees, scholarships, language requirements,
              part-time job etc.
            </Typography>
          </m.div>

          {/* <m.div variants={varFade().inUp}>
            <InputStyle
              stretchStart={280}
              placeholder="Search country"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{ color: "text.disabled", width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "common.white",
                },
              }}
            />
          </m.div> */}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
