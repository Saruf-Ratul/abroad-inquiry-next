"use client"
import { useTheme } from "@emotion/react";
import { Slide, useMediaQuery, useScrollTrigger } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import Iconify from "./Iconify";

const Container = styled("div")(({ theme }) => ({
  position: "fixed",
  top: "40%",
  padding: "0px",
  margin: "0px",
  display: "flex",
  flexDirection: "column",
  zIndex: 99,
  "& .icon-wrap": {
    padding: "8px",
    borderRadius: "3px",
    marginBottom: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "4px 6px 10px rgba(0, 0, 0, 0.25)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
    ".icon": {
      transition: "transform 0.5s",
      transform: "rotate(0deg)",
      "&:hover": {
        transform: "rotate(360deg)",
      },
    },
  },
}));

const socialMediaLinks = [
  {
    href: "https://wa.me/+8801712343359",
    icon: "ic:baseline-whatsapp",
    background: "#00A884",
  },
  {
    href: "https://www.facebook.com/Abroadinquiry/",
    icon: "bi:facebook",
    background: "#166FE5",
  },
  {
    href: "https://www.youtube.com/c/AbroadInquiry",
    icon: "fa6-brands:square-youtube",
    background: "#FF0000",
  },
  {
    href: "https://www.instagram.com/abroadinquiryofficial",
    icon: "fa6-brands:square-instagram",
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  },
  {
    href: "https://bd.linkedin.com/company/abroadinquiry?trk=public_profile_topcard-current-company",
    icon: "fa:linkedin-square",
    background: "#0a66c2",
  },
];

function SocialMediaSidebar({ hiddenFor = [] }) {
  //   const location = useLocation();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100, // Adjust this value to control when the component appears on scroll
  });

  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  //   const shouldHideComponent =
  //     hiddenFor.includes(location.pathname) ||
  //     location.pathname.startsWith("/user/");

  //   if (shouldHideComponent) {
  //     return null;
  //   }

  return (
    <Slide direction="right" in={trigger}>
      <Container id="sticky-social-media">
        {socialMediaLinks.map((link, idx) => (
          <a
            key={idx}
            className="icon-wrap"
            style={{ background: link.background }}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <Iconify
              icon={link.icon}
              color="#FFFF"
              sx={{ width: 20, height: 20 }}
            />
          </a>
        ))}
      </Container>
    </Slide>
  );
}

export default SocialMediaSidebar;
