"use client";
import MakingTimeSlots from "@/components/makingTimeSlot";
import ManageTime from "@/components/managingTime";
import { profileViewData } from "@/data/ProfileViewData";
import { fetchMentorProfileDetails } from "@/redux/features/mentor/mentorSlice";
import MentorProfileHero from "@/sections/mentors/MentorProfileHero";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { CalendarPicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMentoravailableSlots,
  StudentAppointmentApplication,
} from "@/redux/features/appoinment/AppointmentSlice";

const CalendarWrapper = styled(Box)(({ theme }) => ({
  ".MuiTypography-caption": {
    color: "black",
  },
  ".MuiOutlinedInput-root": {
    background: "rgba(255, 255, 255, 0.8)",
  },
}));

const Title = styled(Typography)({
  color: "grey",
  padding: "15px 0px 5px 0px",
  fontWeight: 500,
});

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(11),
  },
}));

const SocialWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  "& .icon-wrap": {
    padding: "4px",
    borderRadius: "3px",
    marginBottom: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: "10px",
  },
  "& .wp": {
    background: "#00A884",
  },
  "& .fb": {
    background: "#166FE5",
  },
  "& .yt": {
    background: "#FF0000",
  },
  "& .insta": {
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  },
  "& .lin": {
    background: "#0a66c2",
  },
}));

function MentorProfileTabs({ slug }) {
  const theme = useTheme();
  const params = useParams();
  //   const { slug } = params;
  const dispatch = useDispatch();
  const { loading, profileDeatails } = useSelector((state) => state.mentors);
  const { userInfo } = useSelector((state) => state.user);
  const [value, setValue] = useState("1");
  const matchesSm = useMediaQuery("(max-width:600px)");
  const { mentorAvaialeSlots } = useSelector((state) => state.appoinment);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (userInfo.userStatus !== "mentor") {
      const data = {
        mentor_id: slug,
        dates: ManageTime.getUTCDate(date),
      };

      dispatch(fetchMentorProfileDetails(slug));
      dispatch(fetchMentoravailableSlots(data));
    }
  }, [dispatch, date, slug, userInfo.userStatus]);

  const handleBookTimeSlot = () => {
    const data = {
      mentor_id: profileDeatails.id,
      student_name: userInfo.name,
      student_id: userInfo.id,
      start_time: ManageTime.toUTC(selectedDate.start_time),
      end_time: ManageTime.toUTC(selectedDate.end_time),
      appointment_date: ManageTime.getUTCDate(
        new Date(selectedDate.start_time)
      ),
      notification: `You got a new appointment application from ${userInfo.name}`,
      query: query,
    };

    dispatch(StudentAppointmentApplication(data));
  };

  const formatPhoneNumber = (phone) => {
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
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress
        sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
      />
    </Box>
  ) : !profileDeatails ? (
    <div>
      <p>Not found</p>
    </div>
  ) : (
    <RootStyle>
      <Container sx={{ py: matchesSm ? 0 : 8 }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <MentorProfileHero profileDeatails={profileDeatails} />
          {!userInfo.id && (
            <Alert severity="info" sx={{ marginBottom: "30px", mt: 4 }}>
              Login or Sign Up is required to message or schedule an appointment
              with {profileDeatails?.mentorName}
            </Alert>
          )}
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", m: 2 }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Profile Information"
                  value="1"
                  sx={{ fontWeight: "bold" }}
                />
                {userInfo.userStatus === "student" ? (
                  <Tab
                    label="Appointment"
                    value="2"
                    sx={{ fontWeight: "bold" }}
                  />
                ) : null}
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ m: 2 }}>
              <Grid container spacing={6}>
                {profileViewData("mentor").map((section, idx) => (
                  <Grid item xs={12} md={6} key={idx}>
                    {section.type !== "social" ? (
                      <>
                        <Typography
                          variant={matchesSm ? "p" : "p"}
                          pt={3}
                          sx={{ fontWeight: "bold" }}
                          textTransform="uppercase"
                        >
                          {section.sectionName}
                        </Typography>
                        <Divider />
                        {section.data.map((item, i) => (
                          <Box pt={2} key={i}>
                            <Title variant="overline">{item.title}</Title>
                            <Typography
                              variant={matchesSm ? "body1" : "subtitle1"}
                            >
                              {item.key === "mentorPhone"
                                ? formatPhoneNumber(profileDeatails[item.key])
                                : profileDeatails[item.key]}
                            </Typography>
                          </Box>
                        ))}
                      </>
                    ) : (
                      <>
                        <Typography
                          variant={matchesSm ? "body1" : "h4"}
                          pt={3}
                          fontWeight="bold"
                        >
                          {section.sectionName}
                        </Typography>
                        <SocialWrapper>
                          {section.data.map((item, i) => (
                            <a
                              className={`icon-wrap ${item.className}`}
                              href={
                                item.title === "Instagram"
                                  ? `https://www.instagram.com/${
                                      profileDeatails[item.key]
                                    }`
                                  : item.title === "WhatsApp"
                                  ? `https://wa.me/${profileDeatails[item.key]}`
                                  : profileDeatails[item.key]
                              }
                              target="_blank"
                              rel="noreferrer"
                              key={i}
                            >
                              {item.icon &&
                                React.cloneElement(item.icon, {
                                  size: 25,
                                  color: "#FFFF",
                                })}
                            </a>
                          ))}
                        </SocialWrapper>
                      </>
                    )}
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <CalendarWrapper>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Paper>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={6} lg={5}>
                        <Box overflow={matchesSm ? "auto" : "hidden"}>
                          <Typography variant="body1" py={2} px={6}>
                            Select A Date
                          </Typography>
                          <CalendarPicker
                            minDate={new Date()}
                            maxDate={new Date().setDate(
                              new Date().getDate() + 6
                            )}
                            date={date}
                            onChange={(newDate) => setDate(newDate)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={7}>
                        <Box px={matchesSm ? 2 : 0} mb={5}>
                          <Typography variant="body1" pt={2} pb={4}>
                            Select A Time
                          </Typography>
                          {loading ? (
                            <Box padding={5}>
                              <CircularProgress />
                            </Box>
                          ) : mentorAvaialeSlots?.length ? (
                            <>
                              {mentorAvaialeSlots?.map((slot) => (
                                <Button
                                  key={slot.id}
                                  variant={
                                    selectedDate && selectedDate.id === slot.id
                                      ? "contained"
                                      : "outlined"
                                  }
                                  style={{ margin: "0px 8px 8px 0px" }}
                                  onClick={() => setSelectedDate(slot)}
                                  size="small"
                                >
                                  {MakingTimeSlots(slot, slot.start_time)} -
                                  {MakingTimeSlots(slot, slot.end_time)}
                                </Button>
                              ))}

                              {selectedDate && (
                                <Box pt={2} mr={matchesSm ? 4 : 10}>
                                  <InputLabel
                                    style={{ color: "grey", fontSize: 18 }}
                                    shrink
                                    htmlFor="queries"
                                  >
                                    Queries (What you want to from this mentor)
                                    *
                                  </InputLabel>
                                  <TextField
                                    id="queries"
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    onChange={(e) => setQuery(e.target.value)}
                                  />
                                </Box>
                              )}

                              <br />
                              <Button
                                onClick={handleBookTimeSlot}
                                style={{ marginTop: 10 }}
                                variant="contained"
                                disabled={!selectedDate || !query}
                                size={matchesSm ? "small" : "large"}
                              >
                                Book an Appointment
                              </Button>
                            </>
                          ) : (
                            <Typography>
                              No Available Slots. Try Another Date.
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </LocalizationProvider>
              </CalendarWrapper>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </RootStyle>
  );
}

export default MentorProfileTabs;
