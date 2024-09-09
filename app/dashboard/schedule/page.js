"use client";
import {
  fetchAllSchedule,
  PostNewScheduleAnAppointment,
  removeSchedule,
} from "@/redux/features/appoinment/AppointmentSlice";
import { styled } from "@mui/material/styles";
import ManageTime from "@/components/managingTime";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  TextField,
  useTheme,
} from "@mui/material";
import { CalendarPicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "@/components/Iconify";
import Pagination from "@/components/Pagination";
import { color } from "framer-motion";

const CalendarWrapper = styled(Box)(({ theme }) => ({
  ".MuiTypography-caption": {
    color: "black",
  },
  ".MuiOutlinedInput-root": {
    background: "rgba(255, 255, 255, 0.8)",
  },
}));

function Schedule() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openDialogue, setOpenDialogue] = useState(false);
  const [deleteSchedule, setDeleteSchedule] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState({
    status: false,
    text: "",
    severity: "",
  });
  const [page, setPage] = useState(1);
  const matchesSm = useMediaQuery("(max-width:600px)");

  // This one state handles date-time picking
  const [scheduleDateTime, setScheduleDateTime] = useState({
    appointment_starting_date: new Date(),
    appointment_ending_date: new Date(),
    start_time: new Date(),
    end_time: new Date(new Date().setHours(new Date().getHours() + 1)),
  });

  const { schedules, loading, totalSchedules } = useSelector(
    (state) => state.appoinment
  );

  const { userInfo } = useSelector((state) => state.user);

  // Will hanle api request
  const handleCreateSchedule = () => {
    const data = {
      mentor_id: userInfo.id,
      appointment_starting_date: ManageTime.getUTCDate(
        ManageTime.getScheduleTimeStamp(
          scheduleDateTime.appointment_starting_date,
          scheduleDateTime.start_time
        )
      ),
      appointment_ending_date: ManageTime.getUTCDate(
        ManageTime.getScheduleTimeStamp(
          scheduleDateTime.appointment_starting_date,
          scheduleDateTime.end_time
        )
      ),
      start_time: ManageTime.toUTC(
        ManageTime.getScheduleTimeStamp(
          scheduleDateTime.appointment_starting_date,
          scheduleDateTime.start_time
        )
      ),
      end_time: ManageTime.toUTC(
        ManageTime.getScheduleTimeStamp(
          scheduleDateTime.appointment_starting_date,
          scheduleDateTime.end_time
        )
      ),
    };

    dispatch(PostNewScheduleAnAppointment(data));
    setSnackbarOpen({
      ...snackbarOpen,
      status: true,
      severity: "success",
      text: "Schedule Create Successfully",
    });
    // window.location.reload();
  };

  // Handles date time state update
  const hanleDateTimeChange = (key, value) => {
    setScheduleDateTime({
      ...scheduleDateTime,
      [key]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchAllSchedule(1));
  }, [dispatch]);

  const handleDeleteSchedule = () => {
    dispatch(removeSchedule(deleteSchedule?.scheduleId));
    setOpenDialogue(false);
    setSnackbarOpen({
      ...snackbarOpen,
      status: true,
      severity: "success",
      text: "Schedule delete Successfully",
    });
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress
            sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
          />
        </Box>
      ) : (
        <CalendarWrapper>
          <Alert severity="info" sx={{ mb: 2 }}>
            All Dates and Times are{" "}
            {new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]}
          </Alert>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={matchesSm ? 3 : 0}>
              <Grid item xs={12} sm={7.1} md={7} lg={6}>
                <Paper
                  component={Box}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-around"
                  p={matchesSm ? 0 : 2}
                  overflow={matchesSm ? "auto" : "hidden"}
                >
                  {/* ----------------Calendar Time picker---------------- */}
                  <Typography
                    variant={matchesSm ? "body1" : "h4"}
                    pt={matchesSm ? 3 : 0}
                  >
                    Select A Date
                  </Typography>
                  <CalendarPicker
                    minDate={new Date()}
                    maxDate={new Date().setDate(new Date().getDate() + 6)}
                    date={scheduleDateTime.appointment_starting_date}
                    onChange={(newValue) =>
                      hanleDateTimeChange("appointment_starting_date", newValue)
                    }

                    // disablePast
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4.9} md={5} lg={6}>
                <Paper
                  component={Box}
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right top, #04223f, #0e3b65, #1a558e, #2771b9, #338ee6)",
                    height: "100%",
                    color: "#FFFF",
                  }}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-around"
                  minHeight={320}
                  px={matchesSm ? 2 : 4}
                >
                  <Typography variant="h4">Pick A Time</Typography>
                  {/* -----------------Start Time picker----------------- */}
                  <Box>
                    <Typography variant="h6">Select Start Time</Typography>
                    <TimePicker
                      value={scheduleDateTime.start_time}
                      onChange={(newValue) =>
                        hanleDateTimeChange("start_time", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            input: { color: "black" }, // text color
                            ".MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "black", // border color
                              },
                              "&:hover fieldset": {
                                borderColor: "black", // border color on hover
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "black", // border color when focused
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h6">Select End Time</Typography>
                    <TimePicker
                      value={scheduleDateTime.end_time}
                      onChange={(newValue) =>
                        hanleDateTimeChange("end_time", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            input: { color: "black" }, // text color
                            ".MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "black", // border color
                              },
                              "&:hover fieldset": {
                                borderColor: "black", // border color on hover
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "black", // border color when focused
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Button
                    onClick={() => handleCreateSchedule()}
                    disabled={loading}
                    variant="contained"
                    color="warning"
                    size="large"
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    Create Schedule
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Box pb={4}>
                  <Typography variant="h4" py={2}>
                    Schedules
                  </Typography>
                  {schedules?.length ? (
                    <TableContainer
                      component={Paper}
                      sx={{ maxHeight: 380, maxWidth: 500 }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              <Box display="flex" alignItems="center">
                                <Iconify
                                  icon={"typcn:calendar"}
                                  width={24}
                                  height={24}
                                />
                                <Box ml={1}>Date</Box>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              <Box display="flex" alignItems="center">
                                <Iconify
                                  icon={"ph:clock-light"}
                                  width={24}
                                  height={24}
                                />
                                <Box ml={1}>Time</Box>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              <Box display="flex" alignItems="center">
                                <Box>Action</Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {schedules?.map((row, idx) => (
                            <TableRow
                              key={idx}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>
                                {ManageTime.getLocalDate(row.startTime)}
                              </TableCell>
                              <TableCell>
                                {ManageTime.getLocalTime(row.startTime)}-
                                {ManageTime.getLocalTime(row.endTime)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="error"
                                  startIcon={
                                    <Iconify
                                      icon={"fluent:delete-12-filled"}
                                      width={24}
                                      height={24}
                                    />
                                  }
                                  onClick={() => {
                                    setDeleteSchedule(row);
                                    setOpenDialogue(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        pr={2}
                        py={2}
                      >
                        <Pagination
                          page={1}
                          handleChangePage={(e, v) => setPage(v)}
                          totalItem={totalSchedules}
                          itemPerPage={10}
                        />
                      </Box>
                    </TableContainer>
                  ) : (
                    <Typography>Your Schedules is Empty</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </LocalizationProvider>
          {deleteSchedule && (
            <Dialog
              open={openDialogue}
              onClose={() => setOpenDialogue(false)}
              maxWidth={300}
              sx={{ textAlign: "justify" }}
            >
              <DialogTitle>
                Are you sure you want to delete schedule on{" "}
                {ManageTime.getLocalDate(deleteSchedule.startTime)} from{" "}
                {ManageTime.getLocalTime(deleteSchedule.startTime)}-
                {ManageTime.getLocalTime(deleteSchedule.endTime)} ?
              </DialogTitle>

              <DialogActions>
                <Button onClick={() => setOpenDialogue(false)}>Cancel</Button>
                <Button
                  onClick={handleDeleteSchedule}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          )}

          <Snackbar
            open={snackbarOpen.status}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen({ ...snackbarOpen, status: false })}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() =>
                setSnackbarOpen({ ...snackbarOpen, status: false })
              }
              severity={snackbarOpen.severity}
              // color="success"
              sx={{ width: "100%" }}
            >
              {snackbarOpen.text}
            </Alert>
          </Snackbar>
        </CalendarWrapper>
      )}
    </>
  );
}

export default Schedule;
