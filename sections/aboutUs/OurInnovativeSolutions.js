"use client";
import { MotionViewport, varFade } from "@/components/animate";
import Iconify from "@/components/Iconify";
import pattern from "@/public/assets/images/patterns/pattern-1.png";
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
  marginBottom: theme.spacing(3),
  color: theme.palette.common.white,
  lineHeight: 1.75,
  textAlign: "center",
}));

const IconWrapper = styled(Stack)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  alignItems: "center",
  justifyContent: "center",
}));

const OurInnovativeSolutions = () => (
  <>
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8} sx={{ textAlign: "center" }}>
            <m.div variants={varFade().inUp}>
              <SectionTitle variant="h2">Our Innovative Solutions</SectionTitle>
            </m.div>
            <m.div variants={varFade().inUp}>
              <SectionText>
                Our cutting-edge communication apps enable students to:
              </SectionText>
            </m.div>
            <Box display="flex" alignItems={"center"} justifyContent={"center"}>
              <Stack my={3} spacing={2} a>
                {[
                  {
                    title: "Check Eligibility & Requirements with one tap",
                    icon: "ion:earth-outline",
                  },
                  {
                    title: "Connect with Expert Mentors easily",
                    icon: "tabler:user-search",
                  },
                  {
                    title: "Stay Informed on admission status and deadlines",
                    icon: "akar-icons:bell",
                  },
                ].map((itm, i) => (
                  <m.div key={i} variants={varFade().inUp}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconWrapper>
                        <Iconify
                          icon={itm.icon}
                          color="secondary.main"
                          sx={{ width: 24, height: 24 }}
                        />
                      </IconWrapper>
                      <Typography
                        sx={{
                          mx: "auto",
                          maxWidth: 600,
                          textAlign: "left",
                          fontWeight: 500,
                          color: "common.white",
                        }}
                      >
                        {itm.title}
                      </Typography>
                    </Stack>
                  </m.div>
                ))}
              </Stack>{" "}
            </Box>
            <m.div variants={varFade().inUp}>
              <SectionText>
                We are constantly evolving, and soon, our apps will offer even
                more features to streamline the application process for European
                and other popular study destinations.
              </SectionText>
            </m.div>
          </Grid>
        </Grid>
      </Container>
      <Image
        src={pattern}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "100%",
          width: "100%",
          objectFit: "contain",
        }}
      />
    </RootStyle>
    <Divider sx={{ my: 5 }} />
  </>
);

export default OurInnovativeSolutions;
