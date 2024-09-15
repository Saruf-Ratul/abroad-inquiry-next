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
} from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { isLessThan24HourAgo } from "@/components/dateLessThan24HourAgo";
import ManageTime from "@/components/managingTime";
import { useDispatch, useSelector } from "react-redux";
import {
  AddacceptOrDenyAppointment,
  AddcompleteAnAppointment,
  deleteAppointmentRequest,
  fetchAllApprovedAppointments,
  fetchAppointmentApplication,
  fetchAppointmentRecords,
} from "@/redux/features/appoinment/AppointmentSlice";
import { BASE_URL } from "@/utils/axios";
import withAuth from "@/sections/auth/withAuth";
import Iconify from "@/components/Iconify";

const ActionButton = styled(Button)(({ theme }) => ({
  maxWidth: "30px",
  maxHeight: "30px",
  minWidth: "30px",
  minHeight: "30px",
}));


const Appointments = () => {
  const dispatch = useDispatch();
  const {
    appointmentApplication,
    scheduledAppointment,
    appointmentRecords,
    totalAppointmentApplication,
    totalScheduledAppointment,
    totalAppointmentRecords,
    snackbarTest,
    deleteMsg
  } = useSelector((state) => state.appoinment);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllApprovedAppointments(1));
    dispatch(fetchAppointmentApplication(1));
    dispatch(fetchAppointmentRecords(1));
  }, [dispatch]);

 
  const [focusedAppointment, setFocusedAppointment] = useState(null);
  const [denyReason, setDenyReason] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState({
    status: false,
    text: "",
    severity: "",
  });

  const [clickedNotification, setClickedNotification] = useState(null);
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [doneAppointment, setDoneAppointment] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentAction, setAppoitmentAction] = useState(false);

  const handleAcceptOrDenyAppointment = () => {
    let data = {
      appointment_id: focusedAppointment.appointmentId,
      student_id: focusedAppointment.id,
      mentor_id: userInfo.id,
      confirm: !appointmentAction,
      reason: denyReason,
      mentorName: userInfo.name,
    };
    dispatch(AddacceptOrDenyAppointment(data));
    setOpenDialog(false);
    if(snackbarTest){
      setSnackbarOpen({
        ...snackbarOpen,
        status: true,
        severity: "success",
        text: "Appointment Accept Successfully",
      });
    }else{
      setSnackbarOpen({
        ...snackbarOpen,
        status: true,
        severity: "error",
        text: "Appointment Accept Successfully",
      });
    }
  };

  const checkUserStatus = () => {
    return userInfo.userStatus === "student" ? "Mentor" : "Student";
  };

  const handleAppointmentDone = () => {
    dispatch(AddcompleteAnAppointment(focusedAppointment));
    setFocusedAppointment(null);
    setDoneAppointment(false);
    setOpenDialog(false);
    setSnackbarOpen({
      ...snackbarOpen,
      status: true,
      severity: "success",
      text: "Appointment Done Successfully",
    });
  };

  const handleStdCancel = (appointmentId) => {
    if (appointmentId) {
      dispatch(
        deleteAppointmentRequest({
          appointmentId,
          reason: cancelReason,
          userName: userInfo.name,
        })
      );
      setCancelAppointment(false);
      setFocusedAppointment(null);
      setOpenDialog(false);
    }
    if(deleteMsg?.length > 0){
      setSnackbarOpen({
        ...snackbarOpen,
        status: true,
        severity: "success",
        text: deleteMsg,
      });
    }
  };
  


  const layoutData = [
    {
      id: 0,
      title: "Appointment Applications",
      action: true,
      status: false,
      grid: 12,
      tableData: appointmentApplication,
      key: "appointmentApplications",
      count: totalAppointmentApplication,
    },

    {
      id: 1,
      title: "Scheduled Appointment",
      action: false,
      status: true,
      grid: 12,
      tableData: scheduledAppointment,
      key: "appointmentSchedules",
      count: totalScheduledAppointment,
    },
    {
      id: 2,
      title: "Appointment History",
      action: false,
      status: false,
      grid: 12,
      tableData: appointmentRecords,
      key: "appointmentHistory",
      count: totalAppointmentRecords,
    },
  ];

  return (
    <>
      <Grid container spacing={4}>
        {layoutData.map((data, idx) => (
          <Grid item xs={data.grid} key={idx}>
            <Typography variant="h4" py={2}>
              {data.title}
            </Typography>
            {data?.tableData?.length ? (
              <TableContainer component={Paper} sx={{ padding: "12px" }}>
                <Table stickyHeader sx={{ minWidth: 300 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {checkUserStatus()}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Date
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Time
                      </TableCell>
                      {data.action ? (
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                          Action
                        </TableCell>
                      ) : (
                        data.status && (
                          <TableCell sx={{ fontWeight: "bold" }} align="center">
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
                        <TableCell align="center">
                          {ManageTime.getLocalDate(row.startTime)}
                        </TableCell>

                        <TableCell align="center">
                        {ManageTime.getLocalTime(row.startTime)} -{" "}
                        {ManageTime.getLocalTime(row.endTime)}
                        </TableCell>

                        {data.action ? (
                          userInfo.userStatus === "mentor" ? (
                            <TableCell align="center">
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
                            <TableCell align="center">
                              <Button
                                variant="contained"
                                startIcon={
                                  <Iconify
                                    icon={"fluent:delete-12-regular"}
                                    width={24}
                                    height={24}
                                  />
                                }
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
                            <TableCell align="center">
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
                              <TableCell align="center">
                                <Button
                                  color="error"
                                  size="small"
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
                {/* <Box display="flex" justifyContent="flex-end" pr={2} py={2}>
                  <Pagination
                    page={page[data.key]}
                    handleChangePage={(e, v) =>
                      handleChangePage(e, v, data.key)
                    }
                    totalItem={data.count}
                    itemPerPage={5}
                  />
                </Box> */}
              </TableContainer>
            ) : (
              <Typography>{data.title} is empty!</Typography>
            )}
          </Grid>
        ))}
      </Grid>

      {/* {clickedNotification && (
        <NotificationDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          userStatus={loggedInUser.userStatus}
          clickedNotification={clickedNotification}
          setClickedNotification={setClickedNotification}
          fromAppointmentPage={true}
        />
      )} */}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {appointmentApplication && appointmentAction ? (
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
