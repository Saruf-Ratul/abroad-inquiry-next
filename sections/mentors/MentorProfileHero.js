"use client";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Iconify from "@/components/Iconify";
import { MotionContainer, TextAnimate, varFade } from "@/components/animate";
import useResponsive from "@/hooks/useResponsive";
import MentorsBanner from "@/public/assets/bannerImage/mentorProfile.jpg";
import { BASE_URL } from "@/utils/axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const RootStyle = styled("div")(({ theme }) => ({
  backgroundSize: "cover",
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.grey[900],
    0.8
  )} , ${alpha(theme.palette.grey[900], 0.8)}), url(${MentorsBanner.src})`,
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.grey[900], 0.85),
  [theme.breakpoints.up("md")]: {
    height: 280,
    padding: 0,
    borderRadius: "15px"
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: 380,
    textAlign: "left",
    position: "absolute",
    bottom: theme.spacing(5),
  },
}));



export default function MentorProfileHero({ profileDeatails }) {
  const router = useRouter();
  const theme = useTheme();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const token = Cookies.get("token");

  function formatPhoneNumber(phone) {
    if (!phone) return "Phone number not available";
    let parsedPhone;
    try {
      parsedPhone = JSON.parse(phone);
    } catch (error) {
      // console.error("Invalid phone data", error);
      return "Invalid phone data";
    }
    const { dialCode, phoneNumber } = parsedPhone;
    return `${dialCode} ${phoneNumber}`;
  }

  const handleMessageClick = (mentorId) => {
    if (token) {
      router.push(`/dashboard/chat/${mentorId}`);
    } else {
      router.push("/auth/login");
    }
  };

  const handleAppointmentClick = (mentorId) => {
    if (token) {
      router.push(`/dashboard/appointmentBooking/${mentorId}`);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <RootStyle>
      <Container
        component={MotionContainer}
        sx={{ position: "relative", height: "100%" }}
      >
        <ContentStyle spacing={2}>
          <Box
            py={3}
            display="flex"
            flexDirection={matchesSm ? "column" : "row"}
            alignItems={matchesSm ? "center" : "center"}
          >
            <Avatar
              sx={{ width: 150, height: 150 }}
              src={`${BASE_URL}/${profileDeatails?.mentorProfilePic}`}
            />

            <Box pl={matchesSm ? 0 : 3} mt={matchesSm ? 2 : 0}>
              <Box
                sx={{
                  display: "flex",
                  width:matchesSm ? "auto":"600px"
                }}
              >
                <Typography variant={matchesSm ? "body1" : "h4"} sx={{ color: "white" }}>
                  {profileDeatails?.mentorName}
                </Typography>
                <Stack direction="row" sx={{ marginLeft: "20px" }}>
                  <Chip
                    label="Active"
                    color="success"
                    variant="outlined"
                  // onClick={handleClick}
                  />
                </Stack>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Iconify icon="mdi:email" width={22} height={22} style={{ color: "white" }} />
                <Typography
                  variant={matchesSm ? "caption" : "subtitle1"}
                  sx={{ ml: 1, color: "white" }}
                >
                  {profileDeatails?.mentorEmail}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Iconify icon="ph:phone-fill" width={22} height={22} style={{ color: "white" }} />
                <Typography
                  variant={matchesSm ? "caption" : "subtitle1"}
                  sx={{ ml: 1, color: "white" }}
                >
                  {formatPhoneNumber(profileDeatails?.mentorPhone)}
                </Typography>
              </Box>

              <Button
                onClick={() => handleAppointmentClick(profileDeatails.id)}
                size={matchesSm ? "small" : "medium"}
                style={{ marginTop: 10, marginRight: 10 }}
                variant="contained"
                color="success"
              >
                Appointment
              </Button>

              <Button
                onClick={()=> handleMessageClick(profileDeatails.id)}
                size={matchesSm ? "small" : "medium"}
                style={{ marginTop: 10 }}
                variant="outlined"
                color="error"
              //   startIcon={<AiOutlineMessage />}
              >
                Message
              </Button>
            </Box>
          </Box>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
