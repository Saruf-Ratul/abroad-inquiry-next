"use client";
import Iconify from "@/components/Iconify";
import { MotionContainer } from "@/components/animate";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnlineGuidance() {
  const router = useRouter();
  const theme = useTheme();
  const services = [
    {
      label: "Free Profile Assessment",
      icon: "eva:person-done-outline",
      description:
        "Get an overview of your academic profile and university recommendations.",
      fullDescription:
        "We assess your academic and career background, recommending universities based on your profile. If needed, we offer guidance to improve your profile for better chances of acceptance.",
    },
    {
      label: "Country Selection & Overall Guidance",
      icon: "eva:globe-outline",
      description:
        "Helping you choose the ideal country for your studies abroad.",
      fullDescription:
        "Our experts guide you in selecting the right country, considering factors like work permits, living expenses, and lifestyle preferences. You can even explore opportunities in multiple countries.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box sx={{ py: 8, bgcolor: theme.palette.background.neutral }}>
      <Container maxWidth="lg" component={MotionContainer}>
        <Grid container spacing={5} justifyContent="space-between">
          <Grid item xs={12} md={5}>
            <AnimatedComponent animationType={"inRight"}>
              <Typography
                variant="h3"
                sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}
              >
                Free Counseling from Expert Mentors
              </Typography>
            </AnimatedComponent>

            <AnimatedComponent animationType={"inRight"}>
              <Typography sx={{ mb: 4, textAlign: "justify", color: "#555" }}>
                Our mentors are available to guide you through every step of
                your study abroad process. Whether it’s choosing the right
                university, country, or visa process, we’re here to help.
              </Typography>
            </AnimatedComponent>

            <AnimatedComponent animationType={"inRight"}>
              <Button
                onClick={() => router.push("/mentors")}
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  boxShadow: 3,
                  textTransform: "none",
                  py: 1.5,
                  px: 4,
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
                endIcon={
                  <Iconify
                    icon={"ic:round-arrow-right-alt"}
                    width={24}
                    height={24}
                  />
                }
              >
                Book Your Mentor
              </Button>
            </AnimatedComponent>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <AnimatedComponent animationType="inUp">
                    <Card
                      sx={{
                        boxShadow: 4,
                        textAlign: "center",
                        borderRadius: 3,
                        transition: "0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: 8,
                          transform: "scale(1.04)",
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: "center", py: 4 }}>
                        {" "}
                        {/* Added padding for better spacing */}
                        {/* Centered Icon */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mx: "auto", // Centers the icon horizontally
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            bgcolor: "secondary.main", // Secondary color for background
                            mb: 3, // Added margin for spacing
                          }}
                        >
                          <Iconify
                            icon={service.icon}
                            width={40}
                            height={40}
                            color="white"
                          />
                        </Box>
                        {/* Card Title */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            mb: 2,
                            color: "secondary.main",
                          }}
                        >
                          {service.label}
                        </Typography>
                        {/* Short Description */}
                        <Typography
                          variant="body2"
                          sx={{ mb: 1.5, color: "#666" }}
                        >
                          {service.description}
                        </Typography>
                        {/* Collapsible Content */}
                        <Collapse
                          in={expandedIndex === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Typography
                            variant="body2"
                            sx={{ mb: 2, color: "#666" }}
                          >
                            {service.fullDescription}
                          </Typography>
                        </Collapse>
                        {/* Button */}
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => handleExpandClick(index)}
                          sx={{ mt: 2 }}
                        >
                          {expandedIndex === index ? "Show Less" : "See More"}
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedComponent>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
