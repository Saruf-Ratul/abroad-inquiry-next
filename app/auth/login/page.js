"use client";
import Image from "next/image";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PATH_AUTH } from "@/routes/paths";
import useResponsive from "@/hooks/useResponsive";
import Iconify from "@/components/Iconify";
import { varFade } from "@/components/animate";
import { LoginForm } from "@/sections/auth/login";
import { m } from "framer-motion";
import wave from "../../../public/assets/images/others/wave.png";
import login from "../../../public/assets/images/others/login.png";
import loginBanner from "../../../public/assets/images/others/bg.svg";
import AuthHeader from "@/layouts/auth/MainHeader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const RootStyle = styled("Card")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    marginLeft: "120px",
    marginRight: "120px",
    height: "80vh",
    marginTop: "100px",
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
  backgroundImage: `url(${loginBanner.src})`,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
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
  const router = useRouter();
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard'); 
    }
  }, [router]);

  return (
    <div style={{position: mdUp ? "fixed":"", width:"100%"}}>
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
            width: "56%",
            zIndex: -1,
          }}
          alt="wave"
        />
      )}

      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Image src={login} width={150} height={150} alt="login img"/>
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
                    <Stack width={20} px={1}>
                      <Iconify icon={itm.icon} sx={{ width: 25, height: 25 }} />
                    </Stack>
                    <Typography
                      sx={{
                        mx: "auto",
                        maxWidth: 630,
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
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" textAlign="center" sx={{ mb: 3 }}>
                  Don’t have an account?{" "}
                </Typography>
                <Link href={PATH_AUTH.register}>
                  <Button variant="contained" color="secondary">
                    Become a student
                  </Button>
                </Link>

                <Link href={PATH_AUTH.register} style={{ marginLeft: "15px" }}>
                  <Button variant="outlined" color="error">
                    Become a mentor
                  </Button>
                </Link>
              </Box>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </div>
  );
}
