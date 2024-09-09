import { m } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import useResponsive from "@/hooks/useResponsive";
import Iconify from "@/components/Iconify";
import { MotionViewport, varFade } from "@/components/animate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import serviceImg from "@/public/assets/images/img/service-img-1.webp"
import visConsultantImg from "@/public/assets/images/img/visa-consultation-img-1.webp"

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(15, 0),
  },
}));

const MuiImage = styled(Image)(({ theme }) => ({}));

export default function HomeMentors() {
  const matchesSm = useMediaQuery("(max-width:600px)");
  const matchesXs = useMediaQuery("(max-width:400px)");

  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useResponsive("up", "md");

  const isLight = theme.palette.mode === "light";
  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.48
  )}`;

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
          {isDesktop && (
            <Grid item xs={12} md={6} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={6}>
                  <Box component={m.div} variants={varFade().inUp}>
                    <MuiImage
                      alt="our office 1"
                      src={serviceImg}
                      width={300}
                      height={400}
                      sx={{
                        borderRadius: 2,
                        boxShadow: shadow,
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Stack
                    width="fit-content"
                    direction="row"
                    spacing={2}
                    p={matchesSm ? 1 : 2}
                    borderRadius={2}
                    ml={matchesXs ? 0 : matchesSm ? 3 : 3}
                    mb={14}
                    boxShadow="-12px 7px 14px 2px rgba(0, 0, 0, 0.25)"
                    sx={{color:"black",backgroundColor:"#FAF9F6"}}
                  >
                    <Iconify
                      icon={"ri:customer-service-2-fill"}
                      width={44}
                      height={44}
                      style={{ fontSize: "120px", color: "#FF5857" }}
                    />

                    <Typography
                      variant={matchesSm ? "body2" : "body2"}
                      zIndex={2}
                      fontWeight="bold"
                    >
                      Meet Our <br /> Expert Mentors
                    </Typography>
                  </Stack>
                  <Box component={m.div} variants={varFade().inUp}>
                    <MuiImage
                      alt="our office 2"
                      src={visConsultantImg}
                      width={300}
                      height={200}
                      sx={{ borderRadius: 2, objectFit: "cover" }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h3" sx={{ mb: 3 }}>
                Connect with Expert Mentors
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  mb: 3,
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "text.secondary"
                      : "common.white",
                }}
              >
                Our mentors are here to support you on your academic journey.
                Schedule appointments for personalized guidance or start a chat
                to discuss your study abroad plans. Get tailored advice from
                experienced professionals to navigate your educational path with
                confidence.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
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
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
