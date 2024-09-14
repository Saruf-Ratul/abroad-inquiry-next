"use client";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import CountryDetailHero from "@/sections/countries/CountryDetailHero";
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  useTheme,
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountriesAccordingToMentors,
  fetchCountryDetails,
} from "@/redux/features/country/countrySlice";
import { useParams } from "next/navigation";
import DataLoading from "@/components/DataLoading";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/axios";
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import cssStyles from "@/utils/cssStyles";
import Cookies from "js-cookie";

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  marginTop:"30px",
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(11),
  },
}));

const OverlayStyle = styled("div")(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: "95%",
  height: "100%",
  position: "absolute",
  borderRadius: "15px",
  margin: "7px 10px 10px 10px",
}));

function Factory({ data }) {
  const processedData = [];
  for (const key in data) {
    const value = data[key];
    if (Array.isArray(value)) {
      processedData.push(
        <div key={key}>
          {value.map((item, index) => (
            <Typography key={index} textAlign="justify" pb={2}>
              {Object.keys(item).map((nestedKey) => (
                <>
                  <b key={nestedKey}>{nestedKey}:</b> {item[nestedKey]}
                </>
              ))}
            </Typography>
          ))}
        </div>
      );
    } else if (typeof value === "object") {
      processedData.push(
        <Typography key={key} textAlign="justify" pb={2}>
          {Object.keys(value).map((nestedKey) => (
            <>
              <b key={nestedKey}>{nestedKey}:</b> {value[nestedKey]}
            </>
          ))}
        </Typography>
      );
    } else {
      processedData.push(
        <Typography key={key} textAlign="justify" pb={2}>
          <b>{key}:</b> {value}
        </Typography>
      );
    }
  }
  return <div>{processedData}</div>;
}

const CountryDetail = () => {
  const theme = useTheme();
  const params = useParams();
  const { slug } = params;
  const dispatch = useDispatch();
  const { loading, countryDetails, countriesMentors } = useSelector(
    (state) => state.countries
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchCountryDetails(slug));
      dispatch(fetchCountriesAccordingToMentors(slug));
    }
  }, [dispatch, slug]);

  return (
    <RootStyle>
      <CountryDetailHero countryDetails={countryDetails} />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            mt: 12,
          }}
        >
          <CircularProgress
            sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
          />
        </Box>
      ) : (
        <Container sx={{ mt: 8 }}>
          <Factory data={countryDetails?.description} />
        </Container>
      )}

      {loading ? (
        <Container>
          <DataLoading />
        </Container>
      ) : (
        <Container>
          <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
            Available Mentors for {countryDetails.countryName}
          </Typography>
          <Grid container spacing={3}>
            {countriesMentors.map((mentor) => (
              <Grid key={mentor.id} item xs={12} md={4}>
                <MentorCard mentor={mentor} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </RootStyle>
  );
};

function MentorCard({ mentor }) {
  const router = useRouter();
  const token = Cookies.get("token");
  const { userInfo } = useSelector((state) => state.user);
  const handleAppointmentClick = (mentorId) => {
    if (token) {
      router.push(`/dashboard/appointmentBooking/${mentorId}`);
    } else {
      router.push("/auth/login");
    }
  };

  const handleMessageClick = (mentorId) => {
    if (token) {
      router.push(`/dashboard/chat/${mentorId}`);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <Container>
      <Card>
        <Box sx={{ position: "relative" }}>
          <Avatar
            alt={mentor.mentorName}
            src={`${BASE_URL}/${mentor.mentorProfilePic}`}
            sx={{
              width: 76,
              height: 76,
              zIndex: 11,
              bottom: -32,
              ml: 4,
              border: "4px solid white",
            }}
            onClick={() => router.push(`/mentors/${mentor?.id}`)}
          />
          <OverlayStyle />
        </Box>

        <Box
          sx={{ ml: 3 }}
          onClick={() => router.push(`/mentors/${mentor.id}`)}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
            <Typography variant="subtitle1" sx={{ mt: 6 }}>
              {mentor.mentorName}
            </Typography>

            <Label variant="outlined" color="success" sx={{ mt: 6, mr: 4 }}>
              Active
            </Label>
          </Box>

          <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
            {mentor.mentoringFor}
          </Typography>
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          sx={{ mx: 3, my: 2 }}
        >
          <Button
            disabled={userInfo?.userStatus === "mentor"}
            variant="contained"
            startIcon={
              <Iconify icon={"tabler:message"} width={24} height={24} />
            }
            onClick={() => handleMessageClick(mentor.id)}
          >
            Message
          </Button>
          <Stack justifyContent="center" direction="row" sx={{ ml: 2 }}>
            <Button
              disabled={userInfo?.userStatus === "mentor"}
              variant="contained"
              startIcon={
                <Iconify
                  icon={"fluent-mdl2:date-time-mirrored"}
                  width={24}
                  height={24}
                />
              }
              onClick={() => handleAppointmentClick(mentor.id)}
            >
              Appoinment
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box
          sx={{
            py: 2,
            px: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Button
              disabled={userInfo?.userStatus === "mentor"}
              variant="outlined"
              color="error"
              size="small"
              endIcon={
                <Iconify icon={"carbon:review"} width={14} height={14} />
              }
              sx={{ fontSize: "12px" }}
            >
              Feedback
            </Button>
          </div>

          <div>
            <Rating
              name="simple-controlled"
              value={5}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
              size="small"
            />
          </div>
        </Box>
      </Card>
    </Container>
  );
}

export default CountryDetail;
