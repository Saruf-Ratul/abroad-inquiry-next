"use client";
import Iconify from "@/components/Iconify";
import TextMaxLine from "@/components/TextMaxLine";
import { MotionContainer } from "@/components/animate";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  CounselingCard,
  FullDescription,
  MuiCardContent,
  MuiImage,
  OnlineGuidanceRootStyle,
  OverlayStyle,
} from "./style";
import { useRouter } from "next/navigation";
import service1 from "@/public/assets/images/img/abroad-ticket.webp";
import service2 from "@/public/assets/images/img/service-img-2.webp";

export default function OnlineGuidance() {
  const router = useRouter();
  const [showDescription, setShowDescription] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  const handleMouseEnterProfile = () => {
    setShowProfile(true);
  };

  const handleMouseLeaveProfile = () => {
    setShowProfile(false);
  };


  return (
    <OnlineGuidanceRootStyle sx={{ position: "relative" }}>
      <Container maxWidth="lg" component={MotionContainer}>
        <Grid>
          <Grid item xs={12} md={5}>
            <AnimatedComponent animationType={"inRight"}>
              <Typography variant="h3" sx={{ mb: 3 }}>
                Free counseling from Expert Mentors
              </Typography>
            </AnimatedComponent>

            <AnimatedComponent animationType={"inRight"}>
              <Typography sx={{ mb: 3, textAlign: "justify" }}>
                Our mentors are here to support you on your academic journey.
                Schedule appointments for personalized guidance or start a chat
                to discuss your study abroad plans. Get tailored advice from
                experienced professionals to navigate your educational path with
                confidence.
              </Typography>
            </AnimatedComponent>

            <AnimatedComponent animationType={"inRight"}>
              <Button
                onClick={() => router.push("/mentors")}
                variant="contained"
                color="secondary"
                size="large"
                endIcon={
                  <Iconify
                    icon={"ic:round-arrow-right-alt"}
                    width={24}
                    height={24}
                  />
                }
              >
                Our Mentors
              </Button>
            </AnimatedComponent>
          </Grid>

          <Grid item xs={12} md={7} sx={{ pr: { md: 7 }, mt: 8 }}>
            <Grid container spacing={3} alignItems="flex-end">
              <Grid xs={6}>
                <AnimatedComponent animationType="inUp">
                  <CounselingCard
                    onMouseEnter={handleMouseEnterProfile}
                    onMouseLeave={handleMouseLeaveProfile}
                  >
                    <MuiImage
                      src={service2.src}
                      width={300}
                      height={350}
                      sx={{ borderRadius: "5px" }}
                    />
                    <MuiCardContent
                      className={`content ${showProfile ? "hidden" : ""}`}
                    >
                      <TextMaxLine
                        color="secondary"
                        variant={"h4"}
                        line={1}
                        persistent
                      >
                        Free Profile Assessment
                      </TextMaxLine>
                      <TextMaxLine
                        variant={"subtitle2"}
                        line={2}
                        sx={{ mb: 2 }}
                        persistent
                      >
                        Profile assessment is the first procedure for studying
                        abroad. In our free counseling, we first review the
                        candidates profile. We evaluate the candidates' profiles
                        and suggest suitable universities according to their
                        profiles. Candidates can also choose their preferred
                        universities. We recommend the universities with high
                        acceptance rates. If anything lacks in the candidates
                        profile, we strongly recommend them to fulfill that one.
                      </TextMaxLine>
                      <Button color="secondary" variant="outlined">
                        See More
                      </Button>
                    </MuiCardContent>
                    <FullDescription
                      className={`full-description ${
                        showProfile ? "visible" : ""
                      }`}
                    >
                      <Typography color="secondary" variant={"h4"}>
                        Free Profile Assessment
                      </Typography>
                      <Typography textAlign="justify" variant={"subtitle2"}>
                        Profile assessment is the first procedure for studying
                        abroad. In our free counseling, we first review the
                        candidates profile. We evaluate the candidates' profiles
                        and suggest suitable universities according to their
                        profiles. Candidates can also choose their preferred
                        universities. We recommend the universities with high
                        acceptance rates. If anything lacks in the candidates
                        profile, we strongly recommend them to fulfill that one.
                      </Typography>
                    </FullDescription>
                    <OverlayStyle className="overlay" />
                  </CounselingCard>
                </AnimatedComponent>
              </Grid>

              <Grid xs={5.5} sx={{ ml: 2 }}>
                <AnimatedComponent animationType="inUp">
                  <CounselingCard
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <MuiImage
                      src={service2.src}
                      width={300}
                      height={350}
                      sx={{ borderRadius: "5px" }}
                    />
                    <MuiCardContent
                      className={`content ${showDescription ? "hidden" : ""}`}
                    >
                      <TextMaxLine
                        color="secondary"
                        variant={"h4"}
                        line={1}
                        persistent
                      >
                        Country Selection & Overall Idea
                      </TextMaxLine>
                      <TextMaxLine
                        variant={"subtitle2"}
                        line={2}
                        sx={{ mb: 2 }}
                        persistent
                      >
                        Not all countries are alike. Some have working hour
                        restrictions; some have spouse restrictions, some have
                        high living expenses and many more. We inquire about the
                        candidates' motives and what they are looking for. Based
                        on their profiles and motives, we help them choose a
                        perfect country for studying abroad.{" "}
                        <span style={{ color: "orange" }}>
                          Moreover, we help our candidates work with two or more
                          countries if they want to do so.
                        </span>
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
                      <Typography color="secondary" variant={"h4"}>
                        Country Selection & Overall Idea
                      </Typography>
                      <Typography textAlign="justify" variant={"subtitle2"}>
                        Not all countries are alike. Some have working hour
                        restrictions; some have spouse restrictions, some have
                        high living expenses and many more. We inquire about the
                        candidates' motives and what they are looking for. Based
                        on their profiles and motives, we help them choose a
                        perfect country for studying abroad.{" "}
                        <span style={{ color: "orange" }}>
                          Moreover, we help our candidates work with two or more
                          countries if they want to do so.
                        </span>
                      </Typography>
                    </FullDescription>
                    <OverlayStyle className="overlay" />
                  </CounselingCard>
                </AnimatedComponent>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </OnlineGuidanceRootStyle>
  );
}

function Card({ item }) {
  const { label, icon, image, description } = item;
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
      <MuiImage
        src={image.src}
        width={300}
        height={350}
        sx={{ borderRadius: "5px" }}
      />
      <MuiCardContent className={`content ${showDescription ? "hidden" : ""}`}>
        <TextMaxLine color="secondary" variant={"h4"} line={1} persistent>
          {label}
        </TextMaxLine>
        <TextMaxLine variant={"subtitle2"} line={2} sx={{ mb: 2 }} persistent>
          {description}
        </TextMaxLine>
        <Button color="secondary" variant="outlined">
          See More
        </Button>
      </MuiCardContent>
      <FullDescription
        className={`full-description ${showDescription ? "visible" : ""}`}
      >
        <Typography color="secondary" variant={"h4"}>
          {label}
        </Typography>
        <Typography textAlign="justify" variant={"subtitle2"}>
          {description}
        </Typography>
      </FullDescription>
      <OverlayStyle className="overlay" />
    </CounselingCard>
  );
}
