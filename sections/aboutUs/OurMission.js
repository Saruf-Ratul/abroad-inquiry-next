"use client";
import { MotionViewport, varFade } from "@/components/animate";
import Logo from "@/public/assets/images/logo/logo-square.webp";
import { Card, Container, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { m } from "framer-motion";
import Image from "next/image";

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  color: theme.palette.secondary.main,
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}));

const SectionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
  lineHeight: 1.75,
  textAlign: "justify",
}));

const StyledImage = styled(Image)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover",
  width: "100%",
  height: "auto",
  maxWidth: 150, // Control the max width of the image on small devices
  margin: "0 auto",
  [theme.breakpoints.up("md")]: {
    maxWidth: 200, // Adjust max width for larger screens
  },
}));

const OurMission = () => (
  <>
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={5.25}>
            <m.div variants={varFade().inLeft}>
              <SectionTitle variant="h2">Our Mission</SectionTitle>
            </m.div>
            <m.div variants={varFade().inLeft}>
              <SectionText>
                At Abroad Inquiry, our mission is to empower aspiring
                international students with factual information and
                comprehensive support for their study abroad journey. We provide
                admission, scholarship, and visa services through our web and
                mobile apps, guided by expert mentors who have successfully
                navigated the process and are now living abroad.
              </SectionText>
            </m.div>
          </Grid>
          <Grid item xs={12} md={1.5}>
            <Card sx={{ p: { xs: 4, md: 2 }, textAlign: "center" }}>
              <m.div variants={varFade().in}>
                <StyledImage
                  src={Logo}
                  alt="Abroad Inquiry Logo"
                  width={200}
                  height={200}
                />
              </m.div>
            </Card>
          </Grid>
          <Grid item xs={12} md={5.25}>
            <m.div variants={varFade().inRight}>
              <SectionTitle
                variant="h2"
                sx={{ textAlign: { xs: "center", md: "right" } }}
              >
                Our Vision
              </SectionTitle>
            </m.div>
            <m.div variants={varFade().inRight}>
              <SectionText>
                Abroad Inquiry was born out of a Facebook group in 2017, where
                we helped hundreds of international students achieve their
                dreams of studying abroad. Officially registered as a private
                company in Bangladesh in 2020, we have remained true to our
                roots as a community-driven platform. Our vision is to be a
                beacon of truth and reliability in an industry where false
                information can crush dreams.
              </SectionText>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
    <Divider />
  </>
);

export default OurMission;
