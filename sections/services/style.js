"use client";
import labelImg from "@/public/assets/images/img/label-img.webp";
import { Card, Stack } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Image from "next/image";

export const RootStyle = styled("div")(({ theme }) => ({
  backgroundSize: "cover",
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.grey[900],
    0.9
  )} , ${alpha(theme.palette.grey[900], 0.6)}), url(${labelImg.src})`,
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

export const MuiImage = styled(Image)(({ theme }) => ({}));

// ----------------------------------------------------------------------
