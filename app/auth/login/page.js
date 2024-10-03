"use client";
import Iconify from "@/components/Iconify";
import { varFade } from "@/components/animate";
import useResponsive from "@/hooks/useResponsive";
import AuthHeader from "@/layouts/auth/MainHeader";
import { PATH_AUTH } from "@/routes/paths";
import { LoginForm } from "@/sections/auth/login";
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { m } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import login from "../../../public/assets/images/others/login.png";
import wave from "../../../public/assets/images/others/wave.png";

const RootStyle = styled("Card")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    marginLeft: "120px",
    marginRight: "120px",
    height: "80vh",
    marginTop: theme.spacing(6),
  },
}));

const SectionStyle = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 650,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(0, 8),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  marginTop: "120px",
}));

const isAuthenticated = () => {
  return !!Cookies.get("token");
};

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");
  const matchesSm = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div style={{ width: "100%" }}>
      <AuthHeader />
      {mdUp && (
        <Image
          src={wave}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            marginTop: "120px",
            height: "85%",
            width: "50%",
            zIndex: -1,
            opacity: 0.6,
          }}
          alt="wave"
        />
      )}

      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Image src={login} width={150} height={150} alt="login img" />
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Embark on your study abroad journey with ease!
            </Typography>
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
                  title: "Stay updated on application statuses and deadlines",
                  icon: "akar-icons:bell",
                },
              ].map((itm, i) => (
                <m.div key={i} variants={varFade().inRight}>
                  <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    key={i}
                  >
                    <Stack
                      width={20}
                      px={1}
                      sx={{
                        bgcolor: theme.palette.background.default,
                        width: 30,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                      }}
                    >
                      <Iconify
                        icon={itm.icon}
                        sx={{
                          width: 20,
                          height: 20,
                          color: theme.palette.secondary.main,
                        }}
                      />
                    </Stack>
                    <Typography
                      sx={{
                        mx: "auto",
                        maxWidth: 630,
                        //   fontWeight: "bold",
                        // color: "common.white",
                      }}
                    >
                      {itm.title}
                    </Typography>
                  </Stack>
                </m.div>
              ))}
            </Stack>
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Login to Abroad Inquiry
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Please enter your email and password
                </Typography>
              </Box>
            </Stack>

            <LoginForm />

            {!smUp && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
                  Don’t have an account?{" "}
                </Typography>
                <Box
                  sx={{
                    display: matchesSm ? "flex" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link href={PATH_AUTH.register}>
                    <Button size="small" variant="contained" color="secondary">
                      Become a student
                    </Button>
                  </Link>

                  <Link
                    href="/auth/mentor/mentorApplication"
                    style={{ marginLeft: "15px" }}
                  >
                    <Button size="small" variant="outlined" color="error">
                      Become a mentor
                    </Button>
                  </Link>
                </Box>
              </Box>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </div>
  );
}
