"use client"
import React from "react";
import ScrollToTop from "react-scroll-up";
import { styled, useTheme } from "@mui/material/styles";
import Iconify from "./Iconify";

const IconWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 2,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  boxShadow: theme.shadows[18],
  height: 35,
  width: 35,
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  background: theme.palette.mode === "dark" ? "white" : "black",
  justifyContent: "center",
}));

function BackToTop() {
  const theme = useTheme();
  return (
    <ScrollToTop showUnder={160}>
      <IconWrapper>
        <Iconify
          icon={"iconoir:fast-top-circle"}
          width={24}
          height={24}
          style={{
            color: theme.palette.mode === "dark" ? "black" : "white",  // Updated to invert colors based on theme mode
          }}
        />
      </IconWrapper>
    </ScrollToTop>
  );
}

export default BackToTop;
