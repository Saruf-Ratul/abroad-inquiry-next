import { m } from "framer-motion";
// @mui
import Iconify from "@/components/Iconify";
import { MotionViewport, varFade } from "@/components/animate";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import swisscareImg from "@/public/assets/images/img/swisscare.webp"

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function HomeSwissCare() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box component={m.div} variants={varFade().inUp}>
              <Image
                width={400}
                height={400}
                style={{ width: "100%", height: "auto",borderRadius:"10px" }}
                src={swisscareImg}
                alt=""
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <m.div variants={varFade().inUp}>
                <Typography textAlign={"center"} variant="h2" sx={{ mb: 3 }}>
                  Need a insurance for travel ?
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography
                  textAlign={"center"}
                  sx={{
                    mb: 5,
                    // color: isLight ? "text.secondary" : "common.white",
                  }}
                >
                  International health and travel insurance for expats,
                  travelers, and students. We are trusted partner of Swisscare
                  from Bangladesh.
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
              <Link
                  href="https://forms.swisscare.com/#/isie?icd=3049"
                  target="_blank"
                  rel="noreferrer"
                >
                <Button
                  endIcon={
                    <Iconify icon={"eva:flash-fill"} width={20} height={20} />
                  }
                  sx={{
                    background: "linear-gradient(-132deg, #d5a1fe, #7b8bf2)",
                    borderRadius: 38,
                  }}
                  variant="contained"
                  size="large"
                  //   onClick={() => window.open("https://forms.swisscare.com/#/isie?icd=3049")}
                >
                  APPLY FOR INSURANCE
                </Button>
                </Link>
              </m.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
