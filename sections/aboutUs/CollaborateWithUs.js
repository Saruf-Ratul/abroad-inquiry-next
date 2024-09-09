"use client";
import { MotionViewport, varFade } from "@/components/animate";
import Iconify from "@/components/Iconify";
import pattern from "@/public/assets/images/patterns/pattern-2.png";
import {
  Box,
  Card,
  CardContent,
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
  position: "relative",
  backgroundImage: `linear-gradient(135deg,
  ${theme.palette.primary.dark} 0%,
  ${theme.palette.primary.light} 100%)`,
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
  marginBottom: theme.spacing(2),
  color: theme.palette.common.white,
  lineHeight: 1.75,
  textAlign: "center",
  marginLeft: "auto",
  marginRight: "auto",
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

const CollaborateWithUs = () => (
  <>
    <RootStyle>
      <Container component={MotionViewport} sx={{ textAlign: "center" }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12}>
            <m.div variants={varFade().inRight}>
              <SectionTitle variant="h2">Collaborate With Us</SectionTitle>
            </m.div>
          </Grid>
          <Grid item xs={12}>
            <m.div variants={varFade().inRight}>
              <SectionText sx={{ maxWidth: 700 }}>
                Partner with Abroad Inquiry and take advantage of our expertise
                to enhance your study abroad consultancy services. We offer a
                range of B2B solutions:
              </SectionText>
            </m.div>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              spacing={2}
              textAlign="left"
            >
              {[
                {
                  title: "Licensing of our comprehensive software solutions",
                  icon: "ic:round-business-center",
                },
                {
                  title: "Access to our network of expert mentors",
                  icon: "tabler:network",
                },
                {
                  title: "Joint ventures and collaborative opportunities",
                  icon: "mdi:handshake-outline",
                },
              ].map((itm, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <m.div variants={varFade().inRight}>
                    <Card>
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <IconWrapper>
                            <Iconify
                              icon={itm.icon}
                              sx={{ width: 25, height: 25 }}
                            />
                          </IconWrapper>
                          <Typography>{itm.title}</Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </m.div>
                </Grid>
              ))}
            </Grid>
            <m.div variants={varFade().inRight}>
              <SectionText sx={{ mt: 5 }}>
                Together, we can make a positive impact on the lives of
                countless students aspiring to study abroad.
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
          // height: 400,
          // width: 400,
        }}
      />
    </RootStyle>
    <Divider sx={{ my: 5 }} />
  </>
);

export default CollaborateWithUs;
