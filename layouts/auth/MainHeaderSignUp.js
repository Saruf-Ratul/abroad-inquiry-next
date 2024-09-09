"use client";
import Logo from "@/components/Logo";
import { Box, Button, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  height: "100px",
  justifyContent: "space-between",
  boxShadow: "0px 13px 6px 0px rgba(0,0,0,0.1)",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(5, 5, 0, 7),
  },
}));

export default function AuthHeaderSignUp() {
  return (
    <HeaderStyle>
      <Logo />
      <Box>
        <Button variant="contained" color="success">
          Get Started
        </Button>
      </Box>
    </HeaderStyle>
  );
}
