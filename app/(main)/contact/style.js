"use client";
import { styled } from "@mui/material/styles";

export const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  marginTop:"40px",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
  },
}));


