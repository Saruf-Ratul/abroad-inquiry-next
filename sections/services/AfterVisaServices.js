"use client";
import Iconify from "@/components/Iconify";
import TextMaxLine from "@/components/TextMaxLine";
import { MotionContainer } from "@/components/animate";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import {
  Box,
  Button,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  CounselingCard,
  FullDescription,
  MuiCardContent,
  MuiImage,
  OnlineGuidanceRootStyle,
  OverlayStyle,
} from "./style";
import service1 from "@/public/assets/images/img/service-img-1.webp"
import service2 from "@/public/assets/images/img/service-img-2.webp"

function ServiceCard({ service }) {
  const { label, image, description } = service;
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  return (
    <CounselingCard
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MuiImage src={image.src} sx={{ height: 420,borderRadius:"5px" }} />
      <MuiCardContent className={`content ${showDescription ? "hidden" : ""}`}>
        <TextMaxLine color="secondary" variant="h4" line={1} persistent>
          {label}
        </TextMaxLine>
        <TextMaxLine variant="subtitle2" line={2} sx={{ mb: 2 }} persistent>
          {description}
        </TextMaxLine>
        <Button color="secondary" variant="outlined">
          See More
        </Button>
      </MuiCardContent>
      <FullDescription
        className={`full-description ${showDescription ? "visible" : ""}`}
      >
        <Typography color="secondary" variant="h4">
          {label}
        </Typography>
        <Typography textAlign="justify" variant="subtitle1">
          {description}
        </Typography>
        
      </FullDescription>
      <OverlayStyle className="overlay" />
    </CounselingCard>
  );
}

export default function AfterVisaServices() {
  const services = [
    {
      label: "Air Ticket Support",
      description:
        "At Abroad Tickets, we are committed to providing customers with a seamless travel booking experience. Our user-friendly interface and powerful search engines scan hundreds of airlines worldwide. This ensures you quickly find the cheapest fares, shortest travel times, and preferred airlines. Our platform allows you to filter and sort results according to your preferences, making the booking process quick and straightforward. Whether seeking the best deal or the most convenient schedule, our advanced tools ensure you get exactly what you need. To better understand and cater to your unique needs, our dedicated team is always ready to assist. We offer personalized support over the phone and in physical settings, ensuring you have all the help you need throughout your booking journey.",
      image:service1
    },
    {
      label: "Other Services",
      description:
        "We, Abroad Inquiry, always endeavor to build a strong relationship with our clients through our services. We not only help our students get visas but also feel a responsibility to support them after getting a visa, including booking tickets, finding accommodation, opening bank accounts abroad, and providing job and PR guidelines. Even if we are asked to receive any candidates at the airport after their arrival, we do that with utter happiness as they are a part of our Abroad Inquiry family.",
      image:service2
    },
  ];

  return (
    <OnlineGuidanceRootStyle sx={{ position: "relative" }}>
      <Container component={MotionContainer}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
            <AnimatedComponent animationType={"inDown"}>
              <Typography
                component="p"
                variant="overline"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Services
              </Typography>
            </AnimatedComponent>

            <AnimatedComponent animationType={"inUp"}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                After Visa Services
              </Typography>
            </AnimatedComponent>

            <AnimatedComponent animationType={"inUp"}>
              <Typography
                sx={{
                  mx: "auto",
                  maxWidth: 630,
                }}
              >
                We offer a range of services to assist you even after obtaining
                your visa. From booking tickets to finding accommodation, we are
                here to support you every step of the way.
              </Typography>
            </AnimatedComponent>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              {services.map((service, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <AnimatedComponent animationType="inUp">
                    <ServiceCard service={service} />
                  </AnimatedComponent>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </OnlineGuidanceRootStyle>
  );
}
