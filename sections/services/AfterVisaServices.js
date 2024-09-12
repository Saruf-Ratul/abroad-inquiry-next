"use client";
import NextLink from "next/link";
import TextMaxLine from "@/components/TextMaxLine";
import { MotionContainer } from "@/components/animate";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import {
  Box,
  Button,
  CardContent,
  Container,
  Grid,
  Link,
  Paper,
  Typography
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
import service1 from "@/public/assets/images/img/service-img-1.webp";
import service2 from "@/public/assets/images/img/service-img-2.webp";
import { useRouter } from "next/navigation";

export default function AfterVisaServices() {
  const router = useRouter();
  const [showDescription, setShowDescription] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  const handleMouseEnterTicket = () => {
    setShowTicket(true);
  };

  const handleMouseLeaveTicket = () => {
    setShowTicket(false);
  };

  

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
          <Grid
            item
            xs={12}
            md={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid  xs={6} md={6} sx={{mr:2}} >
            <Link
                  href="https://abroadtickets.com/"
                  target="_blank"
                  rel="noreferrer"
                >
              <AnimatedComponent animationType="inUp">
                <CounselingCard
                  onMouseEnter={handleMouseEnterTicket}
                  onMouseLeave={handleMouseLeaveTicket}
                >
                  <MuiImage
                    src={service1.src}
                    sx={{ height: 420, borderRadius: "5px" }}
                  />
                  <MuiCardContent
                    className={`content ${showTicket ? "hidden" : ""}`}
                  >
                    <TextMaxLine
                      color="secondary"
                      variant="h4"
                      line={1}
                      persistent
                    >
                      Air Ticket Support
                    </TextMaxLine>
                    <TextMaxLine
                      variant="subtitle2"
                      line={2}
                      sx={{ mb: 2 }}
                      persistent
                    >
                      At Abroad Tickets, we are committed to providing customers
                      with a seamless travel booking experience. Our
                      user-friendly interface and powerful search engines scan
                      hundreds of airlines worldwide. This ensures you quickly
                      find the cheapest fares, shortest travel times, and
                      preferred airlines. Our platform allows you to filter and
                      sort results according to your preferences, making the
                      booking process quick and straightforward. Whether seeking
                      the best deal or the most convenient schedule, our
                      advanced tools ensure you get exactly what you need. To
                      better understand and cater to your unique needs, our
                      dedicated team is always ready to assist. We offer
                      personalized support over the phone and in physical
                      settings, ensuring you have all the help you need
                      throughout your booking journey. Book Ticket 
                    </TextMaxLine>
                    <Button color="secondary" variant="outlined">
                      See More
                    </Button>
                  </MuiCardContent>
                  <FullDescription
                    className={`full-description ${
                      showTicket ? "visible" : ""
                    }`}
                  >
                    <Typography color="secondary" variant="h4">
                      Air Ticket Support
                    </Typography>
                    <Typography textAlign="justify" variant="subtitle1">
                      At Abroad Tickets, we are committed to providing customers
                      with a seamless travel booking experience. Our
                      user-friendly interface and powerful search engines scan
                      hundreds of airlines worldwide. This ensures you quickly
                      find the cheapest fares, shortest travel times, and
                      preferred airlines. Our platform allows you to filter and
                      sort results according to your preferences, making the
                      booking process quick and straightforward. Whether seeking
                      the best deal or the most convenient schedule, our
                      advanced tools ensure you get exactly what you need. To
                      better understand and cater to your unique needs, our
                      dedicated team is always ready to assist. We offer
                      personalized support over the phone and in physical
                      settings, ensuring you have all the help you need
                      throughout your booking journey. <span style={{color:"red"}}>Book Ticket </span>
                    </Typography>
                  </FullDescription>
                  <OverlayStyle className="overlay" />
                </CounselingCard>
              </AnimatedComponent>
              </Link>
            </Grid>

            <Grid xs={6} md={6}>
              <AnimatedComponent animationType="inUp">
                <CounselingCard
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <MuiImage
                    src={service2.src}
                    sx={{ height: 420, borderRadius: "5px" }}
                  />
                  <MuiCardContent
                    className={`content ${showDescription ? "hidden" : ""}`}
                  >
                    <TextMaxLine
                      color="secondary"
                      variant="h4"
                      line={1}
                      persistent
                    >
                      Other Services
                    </TextMaxLine>
                    <TextMaxLine
                      variant="subtitle2"
                      line={2}
                      sx={{ mb: 2 }}
                      persistent
                    >
                      We, Abroad Inquiry, always endeavor to build a strong
                      relationship with our clients through our services. We not
                      only help our students get visas but also feel a
                      responsibility to support them after getting a visa,
                      including booking tickets, finding accommodation, opening
                      bank accounts abroad, and providing job and PR guidelines.
                      Even if we are asked to receive any candidates at the
                      airport after their arrival, we do that with utter
                      happiness as they are a part of our Abroad Inquiry family.
                    </TextMaxLine>
                    <Button color="secondary" variant="outlined">
                      See More
                    </Button>
                  </MuiCardContent>
                  <FullDescription
                    className={`full-description ${
                      showDescription ? "visible" : ""
                    }`}
                  >
                    <Typography color="secondary" variant="h4">
                      Other Services
                    </Typography>
                    <Typography textAlign="justify" variant="subtitle1">
                      We, Abroad Inquiry, always endeavor to build a strong
                      relationship with our clients through our services. We not
                      only help our students get visas but also feel a
                      responsibility to support them after getting a visa,
                      including booking tickets, finding accommodation, opening
                      bank accounts abroad, and providing job and PR guidelines.
                      Even if we are asked to receive any candidates at the
                      airport after their arrival, we do that with utter
                      happiness as they are a part of our Abroad Inquiry family.
                    </Typography>
                  </FullDescription>
                  <OverlayStyle className="overlay" />
                </CounselingCard>
              </AnimatedComponent>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </OnlineGuidanceRootStyle>
  );
}
