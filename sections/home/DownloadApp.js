"use client";
import React from "react";
import {
  Container,
  Grid,
  CardContent,
  Typography,
  Box,
  Card,
  useMediaQuery,
  ButtonBase,
  Stack,
} from "@mui/material";
import Image from "next/image";
import mobileScreen1 from "../../public/assets/banner-slide-imgs/slide-1.webp";
import mobileScreen2 from "../../public/assets/banner-slide-imgs/slide-2.webp";
import appleApp from "../../public/assets/banner-slide-imgs/apple-app-store.webp";
import androidApp from "../../public/assets/banner-slide-imgs/google-play-store.webp";
import Iconify from "@/components/Iconify";

const DownloadApp = () => {
  const matchesSm = useMediaQuery("(max-width:600px)");
  return (
    <Container
      sx={{ marginBottom: "200px", marginTop: matchesSm ? "60px" : "120px" }}
    >
      <Card sx={{ minWidth: 275, position: "relative", overflow: "visible" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h3">
                Download the{" "}
                <span style={{ color: "red" }}>Abroad Inquiry</span> app to get
                all your study abroad updates on the go!
              </Typography>

              <Box sx={{ mt: 4 }}>
              <Stack my={3} spacing={2} textAlign="left">
                  {[
                    {
                      title: "Explore global education opportunities",
                      icon: "ion:earth-outline",
                    },
                    {
                      title:
                        "Receive personalized guidance from experienced mentors",
                      icon: "tabler:user-search",
                    },
                    {
                      title: "Book appointments for expert advice",
                      icon: "fluent:calendar-16-regular",
                    },
                    {
                      title:
                        "Stay updated on application statuses and deadlines",
                      icon: "akar-icons:bell",
                    },
                  ].map((itm, i) => (
                      <Stack
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        key={i}
                      >
                        <Stack width={20} px={1}>
                          <Iconify
                            icon={itm.icon}
                            color="secondary.main"
                            sx={{ width: 25, height: 25 }}
                          />
                        </Stack>
                        <Typography
                          sx={{
                            mx: "auto",
                            maxWidth: 630,
                          }}
                        >
                          {itm.title}
                        </Typography>
                      </Stack>
                  ))}
                </Stack>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: 300,
                  ml: matchesSm ? 0 : 12,
                }}
              >
                <ButtonBase
                  onClick={() =>
                    window.open(
                      "https://apps.apple.com/app/abroad-inquiry/id1664679066",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src={appleApp}
                    width={140}
                    height={80}
                    style={{ objectFit: "contain" }}
                  />
                </ButtonBase>
                <ButtonBase
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.abroadinquiry.app",
                      "_blank"
                    )
                  }
                >
                  <Image
                    src={androidApp}
                    width={140}
                    height={80}
                    style={{ objectFit: "contain" }}
                  />
                </ButtonBase>
              </Box>
            </CardContent>
          </Grid>
          {matchesSm ? null : (
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "visible",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-300px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "300px",
                    height: "450px",
                  }}
                >
                  <Image
                    src={mobileScreen1}
                    alt="Career Banner Top"
                    width={300}
                    height={300}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-300px",
                    left: "30%",
                    transform: "translateX(-50%)",
                    width: "300px",
                    height: "450px",
                  }}
                >
                  <Image
                    src={mobileScreen2}
                    alt="Career Banner Bottom"
                    width={400}
                    height={400}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Card>
    </Container>
  );
};

export default DownloadApp;
