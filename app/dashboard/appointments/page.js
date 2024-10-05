"use client";
import styled from "@emotion/styled";
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Box,
  Pagination,
} from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { isLessThan24HourAgo } from "@/components/dateLessThan24HourAgo";
import ManageTime from "@/components/managingTime";
import {useSelector } from "react-redux";
import { BASE_URL } from "@/utils/axios";
import withAuth from "@/sections/auth/withAuth";
import io from "socket.io-client";
import AppointmentController from "@/services/controllers/appointment";
import {
  ACCEPT_OR_DENY_APPOINTMENT,
  DELETE_AN_APPOINTMENT,
} from "@/services/appointmentRequest";
import NotificationDialog from "@/components/NotificationDialog";
import Iconify from "@/components/Iconify";

const ActionButton = styled(Button)(({ theme }) => ({
  maxWidth: "30px",
  maxHeight: "30px",
  minWidth: "30px",
  minHeight: "30px",
}));

const Appointments = () => {
  const [appointmentApplications, setAppointmentApplications] = useState({
    totalAppointmentApplication: 0,
    appointmentApplication: [],
  });
  const [appointmentHistory, setAppointmentHistory] = useState({
    totalAppointmentRecords: 0,
    appointmentRecords: [],
  });
  const [appointmentSchedules, setAppointmentSchedules] = useState({
    totalScheduledAppointment: 0,
    scheduledAppointment: [],
  });
  const [page, setPage] = useState({
    appointmentHistory: 1,
    appointmentSchedules: 1,
    appointmentApplications: 1,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentAction, setAppoitmentAction] = useState(false);
  const [focusedAppointment, setFocusedAppointment] = useState(null);
  const [denyReason, setDenyReason] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState({
    status: false,
    text: "",
    severity: "",
  });

  const socket = io("https://realtime.abroadinquiry.com:2096", {
    path: "/socket.io",
    secure: true,
  });
  const { userInfo } = useSelector((state) => state.user);
  const checkUserStatus = () => {
    return userInfo.userStatus === "student" ? "Mentor" : "Student";
  };
  const [clickedNotification, setClickedNotification] = useState(null);
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [doneAppointment, setDoneAppointment] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    AppointmentController.SHOW_APPOINTMENT_APPLICATIONS(
      page.appointmentApplications,
      setAppointmentApplications
    );
  }, [page.appointmentApplications]);

  useEffect(() => {
    AppointmentController.GET_ALL_APPROVED_APPOINTMENTS(
      page.appointmentSchedules,
      setAppointmentSchedules
    );
  }, [page.appointmentSchedules]);

  useEffect(() => {
    AppointmentController.GET_APPOINTMENT_RECORDS(
      page.appointmentHistory,
      setAppointmentHistory
    );
  }, [page.appointmentHistory]);

  const handleAcceptOrDenyAppointment = () => {
    let data = {
      appointment_id: focusedAppointment.appointmentId,
      student_id: focusedAppointment.id,
      mentor_id: userInfo.id,
      confirm: !appointmentAction,
      reason: denyReason,
      mentorName: userInfo.name,
    };

    const filterState = appointmentApplications.appointmentApplication.filter(
      (item) => item.appointmentId !== focusedAppointment.appointmentId
    );

    setAppointmentApplications({
      totalAppointmentApplication:
        appointmentApplications.totalAppointmentApplication - 1,
      appointmentApplication: filterState,
    });

    setFocusedAppointment(null);

    ACCEPT_OR_DENY_APPOINTMENT(data)
      .then((res) => {
        socket?.emit("sendNotification", {
          receiver: "student".concat(data.student_id.toString()),
          appointmentId: res.data.appointmentId,
          message: res.data.notification,
          notificationId: res.data.notificationId,
          createdAt: res.data.createdAt,
          isRead: false,
          rootScreen: "Appointments",
          screen: "AcceptedAppointments",
          fcmToken: res.data.fcmToken,
        });
        setOpenDialog(false);
        if (res.data.status === "Accepted") {
          setAppointmentSchedules({
            totalScheduledAppointment:
              appointmentSchedules.totalScheduledAppointment + 1,
            scheduledAppointment: [
              focusedAppointment,
              ...appointmentSchedules.scheduledAppointment,
            ],
          });

          setSnackbarOpen({
            ...snackbarOpen,
            status: true,
            severity: "success",
            text: "Appointment Accepted.",
          });
        } else {
          setSnackbarOpen({
            ...snackbarOpen,
            status: true,
            severity: "error",
            text: "Appointment Denied.",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAppointmentDone = () => {
    const filterState = appointmentSchedules.scheduledAppointment.filter(
      (item) => item.appointmentId !== focusedAppointment.appointmentId
    );

    AppointmentController.COMPLETE_AN_APPOINTMENT(focusedAppointment)
      .then((res) => {
        if (res.isCompleted) {
          setAppointmentSchedules({
            totalScheduledAppointment:
              appointmentSchedules.totalScheduledAppointment - 1,
            scheduledAppointment: filterState,
          });

          setAppointmentHistory({
            totalAppointmentRecords:
              appointmentHistory.totalAppointmentRecords + 1,
            appointmentRecords: [
              focusedAppointment,
              ...appointmentHistory.appointmentRecords,
            ],
          });
          setFocusedAppointment(null);
          setDoneAppointment(false);
          setOpenDialog(false);
          setSnackbarOpen({
            ...snackbarOpen,
            status: true,
            severity: "success",
            text: res.message,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setOpenDialog(false);
      });
  };

  const handleStdCancel = (data) => {
    const filterState = appointmentSchedules.scheduledAppointment.filter(
      (item) => item.appointmentId !== data
    );

    DELETE_AN_APPOINTMENT(data, cancelReason, userInfo.name)
      .then((res) => {
        socket?.emit("sendNotification", {
          receiver: "mentor".concat(res.data.mentorId.toString()),
          message: res.data.notificationMessage,
          notificationId: res.data.notificationId,
          createdAt: res.data.createdAt,
          isRead: false,
          rootScreen: "Notification",
          screen: "NotificationScreen",
          fcmToken: res.data.fcmToken,
        });

        setCancelAppointment(false);
        setFocusedAppointment(null);

        setOpenDialog(false);

        setAppointmentSchedules({
          totalScheduledAppointment:
            appointmentSchedules.totalScheduledAppointment - 1,
          scheduledAppointment: filterState,
        });

        setSnackbarOpen({
          ...snackbarOpen,
          status: true,
          severity: "success",
          text: res.data.message,
        });
      })
      .catch((err) => {
        setOpenDialog(false);
        setCancelAppointment(false);

        setSnackbarOpen({
          ...snackbarOpen,
          status: true,
          severity: "error",
          text: err.response.data.message,
        });
      });
  };

  const layoutData = [
    {
      id: 0,
      title: "Appointment Applications",
      action: true,
      status: false,
      grid: 12,
      tableData: appointmentApplications.appointmentApplication,
      key: "appointmentApplications",
      count: appointmentApplications.totalAppointmentApplication,
    },

    {
      id: 1,
      title: "Scheduled Appointment",
      action: false,
      status: true,
      grid: 12,
      tableData: appointmentSchedules.scheduledAppointment,
      key: "appointmentSchedules",
      count: appointmentSchedules.totalScheduledAppointment,
    },
    {
      id: 2,
      title: "Appointment History",
      action: false,
      status: false,
      grid: 12,
      tableData: appointmentHistory.appointmentRecords,
      key: "appointmentHistory",
      count: appointmentHistory.totalAppointmentRecords,
    },
  ];

  const handleChangePage = (event, value, key) => {
    setPage({ ...page, [key]: value });
  };

  return (
    <>
      <Grid container spacing={4} sx={{ marginTop: "15px" }}>
        {layoutData.map((data, idx) => (
          <Grid item xs={data.grid} key={idx}>
            <Typography variant="h4" py={2}>
              {data.title}
            </Typography>
            {data.tableData.length ? (
              <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {checkUserStatus()}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Date
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Time
                      </TableCell>
                      {data.action ? (
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                          Action
                        </TableCell>
                      ) : (
                        data.status && (
                          <TableCell sx={{ fontWeight: "bold" }} align="right">
                            Status
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.tableData.map((row, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setClickedNotification(row.appointmentId);
                            setDialogOpen(true);
                          }}
                        >
                          <Avatar
                            src={`${BASE_URL}/${row.profilePic}`}
                            alt={row.name}
                          />
                          &nbsp;&nbsp;
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          {ManageTime.getLocalDate(row.startTime)}
                        </TableCell>

                        <TableCell align="right">
                          {ManageTime.getLocalTime(row.startTime)} -{" "}
                          {ManageTime.getLocalTime(row.endTime)}
                        </TableCell>

                        {data.action ? (
                          userInfo.userStatus === "mentor" ? (
                            <TableCell align="right">
                              <ActionButton
                                variant="contained"
                                color="success"
                                onClick={() => {
                                  setFocusedAppointment(row);
                                  setAppoitmentAction(false);
                                  setOpenDialog(true);
                                }}
                              >
                                &#10004;
                              </ActionButton>
                              &nbsp;&nbsp;
                              <ActionButton
                                variant="contained"
                                color="error"
                                onClick={() => {
                                  setDenyReason("");
                                  setFocusedAppointment(row);
                                  setAppoitmentAction(true);
                                  setOpenDialog(true);
                                }}
                              >
                                &#x2716;
                              </ActionButton>
                            </TableCell>
                          ) : (
                            <TableCell align="right">
                              <Button
                                variant="contained"
                                startIcon={<Iconify
                                  icon={"fluent:delete-24-regular"}
                                  width={24}
                                  height={24}
                                />}
                                color="error"
                                onClick={() => {
                                  setOpenDialog(true);
                                  setFocusedAppointment(row);
                                  setCancelAppointment(true);
                                  // handleAcceptOrDenyAppointment(true)
                                }}
                                size="small"
                              >
                                Cancel Request
                              </Button>
                            </TableCell>
                          )
                        ) : (
                          data.status &&
                          (isLessThan24HourAgo(row.startTime) ||
                            userInfo.userStatus === "mentor" ? (
                            <TableCell align="right">
                              <Button
                                color="success"
                                // disabled={!isLessThan24HourAgo(row.startTime)}
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  setFocusedAppointment(row);
                                  setOpenDialog(true);
                                  setDoneAppointment(true);
                                }}
                              >
                                Done
                              </Button>
                            </TableCell>
                          ) : (
                            userInfo.userStatus === "student" && (
                              <TableCell align="right">
                                <Button
                                  color="error"
                                  size="small"
                                  startIcon={<Iconify
                                    icon={"fluent:delete-24-regular"}
                                    width={24}
                                    height={24}
                                  />}
                                  variant="contained"
                                  onClick={() => {
                                    setOpenDialog(true);
                                    setFocusedAppointment(row);
                                    setCancelAppointment(true);
                                  }}
                                >
                                  Cancel Request
                                </Button>
                              </TableCell>
                            )
                          ))
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box display="flex" justifyContent="flex-end" pr={2} py={2}>
                  <Pagination
                    page={page[data.key]}
                    handleChangePage={(e, v) =>
                      handleChangePage(e, v, data.key)
                    }
                    totalItem={data.count}
                    itemPerPage={5}
                  />
                </Box>
              </TableContainer>
            ) : (
              <Typography>{data.title} is empty!</Typography>
            )}
          </Grid>
        ))}
      </Grid>

      {clickedNotification && (
        <NotificationDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          userStatus={userInfo.userStatus}
          clickedNotification={clickedNotification}
          setClickedNotification={setClickedNotification}
          fromAppointmentPage={true}
        />
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {appointmentAction ? (
          <>
            <DialogContent>
              <Typography>
                Tell us the reason for denying appointment?
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                onChange={(e) => setDenyReason(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleAcceptOrDenyAppointment}
                variant="contained"
                color="error"
                disabled={!denyReason}
              >
                Decline
              </Button>
            </DialogActions>
          </>
        ) : cancelAppointment ? (
          <>
            <DialogContent>
              <Typography>Reason for cancelling appointment?</Typography>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleStdCancel(focusedAppointment.appointmentId);
                }}
                autoFocus
                variant="contained"
                color="success"
              >
                Confirm
              </Button>
              <Button
                onClick={() => setOpenDialog(false)}
                autoFocus
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
            </DialogActions>
          </>
        ) : doneAppointment ? (
          <>
            <>
              <DialogContent>
                <Typography>Are you sure this appointment is done?</Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleAppointmentDone}
                  autoFocus
                  variant="contained"
                  color="success"
                >
                  Confirm
                </Button>
              </DialogActions>
            </>
          </>
        ) : (
          <>
            <DialogContent>
              <Typography>
                Are you sure you want to accept this appoitment request?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleAcceptOrDenyAppointment}
                autoFocus
                variant="contained"
                color="success"
              >
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbarOpen.status}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen({ ...snackbarOpen, status: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen({ ...snackbarOpen, status: false })}
          severity={snackbarOpen.severity}
          color={snackbarOpen.severity}
          sx={{ width: "100%" }}
        >
          {snackbarOpen.text}
        </Alert>
      </Snackbar>
    </>
  );
};

export default withAuth(Appointments);
