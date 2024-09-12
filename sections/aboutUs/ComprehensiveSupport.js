"use client";
import { MotionViewport, varFade } from "@/components/animate";
import Iconify from "@/components/Iconify";
import img from "@/public/assets/bannerImage/support.png";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
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
}));

const SectionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
  lineHeight: 1.75,
  textAlign: "center",
}));

const StyledImage = styled(Image)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover",
  width: "100%",
  height: "auto",
}));

const ListItem = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  textAlign: "left",
  maxWidth: 630,
  margin: "0 auto",
  width: "100%",
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
}));

const ComprehensiveSupport = () => (
  <>
    <RootStyle>
      <Container component={MotionViewport} sx={{ pb: 10 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <m.div variants={varFade().inLeft}>
              <SectionTitle variant="h3">Comprehensive Support</SectionTitle>
            </m.div>
            <m.div variants={varFade().inLeft}>
              <SectionText>
                From the moment you start planning your study abroad journey,
                Abroad Inquiry is here to support you every step of the way:
              </SectionText>
            </m.div>
            <Stack my={3} spacing={2} textAlign="left">
              {[
                {
                  title: "Admission to Settlement support",
                  icon: "hugeicons:global-education",
                },
                {
                  title:
                    "Guidance on housing, part-time jobs, study advice, and permanent residency",
                  icon: "ep:guide",
                },
                {
                  title:
                    "Mentorship & Motivation from experienced professionals",
                  icon: "fluent:video-person-call-16-regular",
                },
              ].map((itm, i) => (
                <m.div key={i} variants={varFade().inLeft}>
                  <ListItem direction="row" spacing={3}>
                    <IconWrapper>
                      <Iconify icon={itm.icon} sx={{ width: 25, height: 25 }} />
                    </IconWrapper>
                    <Typography sx={{ flex: 1 }}>{itm.title}</Typography>
                  </ListItem>
                </m.div>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <m.div variants={varFade().inRight}>
              <StyledImage src={img} alt="Mentors" />
            </m.div>
          </Grid>
        </Grid>
        <m.div variants={varFade().inLeft}>
          <SectionText sx={{ mt: 4, maxWidth: 800, ml: "auto", mr: "auto" }}>
            With our mentorship, you can confidently navigate your new life
            abroad, knowing that you're supported by people who have been
            through the same experience.
          </SectionText>
        </m.div>
      </Container>
    </RootStyle>
    <Divider />
  </>
);

export default ComprehensiveSupport;
