"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
  useMediaQuery,
  Alert,
  InputLabel,
  TextField,
  Snackbar,
  useTheme,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CalendarPicker } from "@mui/x-date-pickers";
import styled from "@emotion/styled";
import ManageTime from "@/components/managingTime";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMentoravailableSlots,
  StudentAppointmentApplication,
} from "@/redux/features/appoinment/AppointmentSlice";
import { BASE_URL } from "@/utils/axios";
import Image from "next/image";
import { fetchMentorProfileDetails } from "@/redux/features/mentor/mentorSlice";
import makingTimeSlot from "@/components/makingTimeSlot";
import managingTime from "@/components/managingTime";

// Convert GMT string to Date object
const convertGMTToDate = (gmtString) => {
  return new Date(gmtString);
};

// Format the Date object to show only time
const formatTime = (date) => {
  return format(date, "hh:mm a");
};

const CalendarWrapper = styled(Box)(({ theme }) => ({
  ".MuiTypography-caption": {
    color: "black",
  },
  ".MuiOutlinedInput-root": {
    background: "rgba(255, 255, 255, 0.8)",
  },
}));

function AppointmentBooking() {
  const router = useRouter();
  const theme = useTheme();
  const params = useParams();
  const { slug } = params;
  const [snackbarOpen, setSnackbarOpen] = useState({
    status: false,
    text: "",
    severity: "",
  });
  const dispatch = useDispatch();
  const { mentorAvaialeSlots, loading } = useSelector(
    (state) => state.appoinment
  );
  const { profileDeatails } = useSelector((state) => state.mentors);
  const { userInfo } = useSelector((state) => state.user);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [query, setQuery] = useState(null);
  const matchesSm = useMediaQuery("(max-width:600px)");

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

  useEffect(() => {
    let timeSlots = makingTimeSlot(mentorAvaialeSlots, date);
    let addId = timeSlots.map((timeSlot, idx) => {
      return { ...timeSlot, id: idx };
    });
    setData(addId);
  }, [mentorAvaialeSlots, date]);

  const handleBookTimeSlot = () => {
    const data = {
      mentor_id: selectedDate.mentor_id,
      student_name: userInfo.name,
      student_id: userInfo.id,
      start_time: managingTime.toUTC(selectedDate.start_time),
      end_time: managingTime.toUTC(selectedDate.end_time),
      appointment_date: ManageTime.getUTCDate(
        new Date(selectedDate.start_time)
      ),
      notification: `You got a new appointment application from ${userInfo.name}`,
      query: query,
    };
    dispatch(StudentAppointmentApplication(data));
    setSnackbarOpen({
      ...snackbarOpen,
      status: true,
      severity: "success",
      text: "Appointment get successfully",
    });
   router.push("/dashboard/appointments");
  };

  return (
    <CalendarWrapper>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Paper>
          <Grid container>
            <Grid sm={12}>
              <Box
                pl={matchesSm ? 2 : 5}
                py={5}
                display="flex"
                alignItems="center"
              >
                <Avatar
                  sx={{
                    width: `${matchesSm ? "90px" : "110px"}`,
                    height: `${matchesSm ? "90px" : "110px"}`,
                  }}
                  src={
                    profileDeatails &&
                    `${BASE_URL}/${profileDeatails.mentorProfilePic}`
                  }
                  alt={profileDeatails.mentorName}
                />
                <Box pl={3}>
                  <Typography variant="h5">
                    {profileDeatails.mentorName}
                  </Typography>
                  <Typography>
                    {profileDeatails.mentoringFor?.toString()}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Image
                      loading="lazy"
                      width={35}
                      height={20}
                      src={`https://flagcdn.com/w20/${profileDeatails?.mentorCountry
                        ?.split("-")[0]
                        .toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${profileDeatails?.mentorCountry
                        ?.split("-")[0]
                        .toLowerCase()}.png 2x`}
                      alt={`Flag of ${
                        profileDeatails?.mentorCountry?.split("-")[0]
                      }`}
                    />
                    &nbsp; &nbsp;
                    <Typography variant="subtitle1" display="inline">
                      {profileDeatails.mentorCountry?.split("-")[1]}
                    </Typography>
                  </Box>

                  <Button
                    style={{ marginTop: 10, marginRight: 10 }}
                    variant="contained"
                    size={matchesSm ? "small" : "medium"}
                  >
                    View Profile
                  </Button>
                  <Button
                    style={{ marginTop: 10 }}
                    variant="contained"
                    size={matchesSm ? "small" : "medium"}
                  >
                    Message
                  </Button>
                </Box>
              </Box>
              <Alert severity="info">
                All Dates and Times are{" "}
                {new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5}>
              <Box overflow={matchesSm ? "auto" : "hidden"}>
                <Typography variant="h5" py={2} px={6}>
                  Select A Date
                </Typography>
                <CalendarPicker
                  minDate={new Date()}
                  maxDate={new Date().setDate(new Date().getDate() + 6)}
                  date={date}
                  onChange={(newDate) => setDate(newDate)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={7}>
              <Box px={matchesSm ? 2 : 0} mb={5}>
                <Typography variant="h5" pt={2} pb={4}>
                  Select A Time
                </Typography>
                {loading ? (
                  <Box padding={5}>
                    <CircularProgress />
                  </Box>
                ) : data?.length ? (
                  <>
                    {data?.map((slot) => {
                      return (
                        <Button
                          key={slot.id}
                          variant={
                            selectedDate && selectedDate.id === slot.id
                              ? "contained"
                              : "outlined"
                          }
                          color="success"
                          style={{ margin: "0px 8px 8px 0px" }}
                          onClick={() => setSelectedDate(slot)}
                          size="small"
                        >
                          {managingTime.getLocalTime(slot.start_time)}-
                          {managingTime.getLocalTime(slot.end_time)}
                        </Button>
                      );
                    })}

                    {selectedDate && (
                      <Box pt={2} mr={matchesSm ? 4 : 10}>
                        <InputLabel
                          style={{ color: "grey", fontSize: 18 }}
                          shrink
                          htmlFor="queries"
                        >
                          Queries (What you want to ask this mentor) *
                        </InputLabel>
                        <TextField
                          id="queries"
                          variant="filled"
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
                  <Typography>No Available Slots. Try Another Date.</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </LocalizationProvider>
      <Snackbar
        open={snackbarOpen.status}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen({ ...snackbarOpen, status: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen({ ...snackbarOpen, status: false })}
          severity={snackbarOpen.severity}
          // color="success"
          sx={{ width: "100%" }}
        >
          {snackbarOpen.text}
        </Alert>
      </Snackbar>
    </CalendarWrapper>
  );
}

export default AppointmentBooking;
