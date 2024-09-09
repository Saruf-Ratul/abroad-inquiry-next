"use client";
import { Card, CardContent, Paper, Stack } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Image from "next/image"
import labelImg from "@/public/assets/images/img/label-img.webp"

export const RootStyle = styled("div")(({ theme }) => ({
  backgroundSize: "cover",
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.grey[900],
    0.9
  )} , ${alpha(
    theme.palette.grey[900],
    0.6
  )}), url(${labelImg.src})`,
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.grey[900], 0.85),
  [theme.breakpoints.up("md")]: {
    height: 460,
    padding: 0,
  },
}));

export const ContentStyle = styled(Stack)(({ theme }) => ({
  //textAlign: "center",
  [theme.breakpoints.up("md")]: {
    maxWidth: 800,
    textAlign: "left",
    position: "absolute",
    bottom: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export const ServiceRootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(8),
  },
}));

export const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(6, 4, 6),
    boxShadow: `-10px 10px 20px 0 ${shadowCard(0.4)}`,
  };
});

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export const OnlineGuidanceRootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(10, 0),
  },
}));

export const MuiImage = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "cover",
}));

export const CounselingCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: 2,
  overflow: "hidden",
  cursor: "pointer",
  "&:hover": {
    ".overlay": {
      opacity: 0.2,
    },
    ".full-description": {
      opacity: 1,
      transform: "translateY(0)",
    },
    ".content": {
      opacity: 0,
    },
  },
}));

export const OverlayStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
  transition: "opacity 0.3s",
  opacity: 1,
}));

export const FullDescription = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%",
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  padding: theme.spacing(4),
  color: theme.palette.common.white,
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
  transition: "opacity 0.3s, transform 0.3s",
  opacity: 0,
  transform: "translateY(100%)",
  "&.visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

export const MuiCardContent = styled(CardContent)(({ theme }) => ({
  transition: "opacity 0.3s",
  position: "absolute",
  bottom: 10,
  zIndex: 9,
  color: theme.palette.common.white,
  "&.hidden": {
    opacity: 0,
  },
}));
// ----------------------------------------------------------------------
