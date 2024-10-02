"use client";
import Iconify from "@/components/Iconify";
import service1 from "@/public/assets/images/img/service-img-1.webp";
import service2 from "@/public/assets/images/img/service-img-2.webp";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function AfterVisaServices() {
  const [expanded, setExpanded] = useState({ card1: false, card2: false });
  const theme = useTheme();

  const handleExpandClick = (card) => {
    setExpanded((prevState) => ({ ...prevState, [card]: !prevState[card] }));
  };

  return (
    <Box
      sx={{
        py: 8,
        backgroundImage: `linear-gradient(135deg,
      ${theme.palette.primary.dark} 0%,
      ${theme.palette.primary.light} 100%)`,
      }}
    >
      <Container sx={{ mt: 5 }}>
        <Typography
          variant="overline"
          sx={{
            textAlign: "center",
            display: "block",
            mb: 2,
            color: "common.white",
          }}
        >
          Services
        </Typography>
        <Typography
          variant="h2"
          sx={{ textAlign: "center", mb: 3, color: "common.white" }}
        >
          After Visa Services
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mx: "auto",
            maxWidth: 630,
            mb: 5,
            color: "common.white",
          }}
        >
          We offer a range of services to assist you even after obtaining your
          visa. From booking tickets to finding accommodation, we are here to
          support you every step of the way.
        </Typography>

        <Grid container spacing={5}>
          {[
            {
              image: service1,
              title: "Air Ticket Support",
              description:
                "We provide a seamless travel booking experience, offering the cheapest fares and personalized support.",
              expandedDescription:
                "Our platform scans hundreds of airlines, allowing you to filter options based on your preferences. Get the best deals and enjoy dedicated customer support.",
              cardKey: "card1",
            },
            {
              image: service2,
              title: "Other Services",
              description:
                "We support you with post-visa services like accommodation, job guidance, and more.",
              expandedDescription:
                "Our services include booking tickets, finding accommodations, and helping with job searches abroad. We make sure your journey is smooth and stress-free.",
              cardKey: "card2",
            },
          ].map((service) => (
            <Grid item xs={12} md={6} key={service.cardKey}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  boxShadow: 3,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    width: { xs: "100%", sm: "40%" },
                    height: 250,
                    position: "relative",
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </CardMedia>
                <CardContent sx={{ width: { xs: "100%", sm: "60%" }, p: 3 }}>
                  <Typography variant="h4" color="secondary" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {service.description}
                  </Typography>
                  <Collapse
                    in={expanded[service.cardKey]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {service.expandedDescription}
                    </Typography>
                  </Collapse>
                  <Button
                    color="secondary"
                    size="small"
                    endIcon={
                      <Iconify
                        icon="mdi:chevron-down" // Replace with desired icon
                        sx={{ fontSize: 20 }}
                      />
                    }
                    onClick={() => handleExpandClick(service.cardKey)}
                    sx={{ mt: 2 }}
                  >
                    {expanded[service.cardKey] ? "Show Less" : "Show More"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
