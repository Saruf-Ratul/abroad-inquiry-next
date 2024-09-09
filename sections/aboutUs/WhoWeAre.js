"use client";
import { MotionViewport, varFade } from "@/components/animate";
import img2 from "@/public/assets/bannerImage/aboutUs-banner.webp";
import pattern from "@/public/assets/images/patterns/pattern-1.png";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { m } from "framer-motion";
import Image from "next/image";

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(8, 0),
  position: "relative",
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(15, 0),
  },
}));

const StyledImage = styled(Image)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover",
  width: "100%",
  height: "auto",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  color: theme.palette.secondary.main,
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

const SectionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
  lineHeight: 1.75,
  textAlign: "justify",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

const WhoWeAre = () => (
  <>
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <m.div variants={varFade().inLeft}>
              <StyledImage alt="About Us Banner" src={img2} />
            </m.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <m.div variants={varFade().inRight}>
              <SectionTitle variant="h2">Who We Are</SectionTitle>
            </m.div>
            <m.div variants={varFade().inRight}>
              <SectionText>
                Founded in 2017 as a community-driven Facebook group, Abroad
                Inquiry has grown into one of Bangladesh's most reputed
                education consultancy firms. Officially registered in 2020, we
                specialize in student visas, dependent visas (spouse/baby), and
                tourist visas for North America, Europe, Oceania, and Asia. We
                have introduced a pioneering one-stop EdTech solution for study
                abroad applications, making the journey smoother and more
                efficient for students.
              </SectionText>
            </m.div>
          </Grid>
        </Grid>
      </Container>
      <Image
        src={pattern}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      />
    </RootStyle>
    <Divider />
  </>
);

export default WhoWeAre;
