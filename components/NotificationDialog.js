import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import appointment from "@/services/controllers/appointment";
import NotificationController from "@/services/controllers/notification";
import {
  ACCEPT_OR_DENY_APPOINTMENT,
  DELETE_AN_APPOINTMENT,
} from "@/services/appointmentRequest";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { BASE_URL } from "@/utils/axios";
import managingTime from "./managingTime";
import Iconify from "./Iconify";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function NotificationDialog({
  dialogOpen,
  setDialogOpen,
  userStatus,
  clickedNotification,
  setClickedNotification,
  fromAppointmentPage = false,
}) {
  const router = useRouter();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [denyReason, setDenyReason] = useState("");
  const [notificationData, setNotificationData] = useState();
  const [stdCancel, setStdCancel] = useState(false);
  const [stdCancelReason, setStdCancelReason] = useState("");
  const [denyAppointment, setDenyAppointment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "",
    text: "",
  });

  const socket = io("https://realtime.abroadinquiry.com:2096", {
    path: "/socket.io",
    secure: true,
  });

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    appointment.GET_APPOINTMENT_INFO(
      clickedNotification,
      setLoading,
      setNotificationData
    );

    return () => {};
  }, [clickedNotification]);

  const handleAcceptOrDenyAppointment = (status) => {
    let data = {
      appointment_id: notificationData.appointmentId,
      student_id: notificationData.id,
      mentor_id: userInfo.id,
      confirm: status,
      reason: denyReason,
      mentorName: userInfo.name,
    };

    ACCEPT_OR_DENY_APPOINTMENT(data)
      .then((res) => {
        socket?.emit("sendNotification", {
          receiver: "student".concat(data.student_id.toString()),
          appointmentId: res.data.appointmentId,
          message: res.data.notification,
          notificationId: res.data.notificationId,
          createdAt: res.data.createdAt,
          isRead: false,
        });

        setNotificationData({
          ...notificationData,
          status: res.data.status,
          reason: denyReason,
        });
        setDenyAppointment(false);
        setDenyReason("");
        if (res.data.status === "Accepted") {
          setSnackbar({
            ...snackbar,
            open: true,
            severity: "success",
            text: "Appointment Accepted",
          });
        } else {
          setSnackbar({
            ...snackbar,
            open: true,
            severity: "error",
            text: "Appointment Denied",
          });
        }
      })
      .catch((err) => {});
  };

  const handleStdCancel = () => {
    DELETE_AN_APPOINTMENT(clickedNotification)
      .then((res) => {
        setDialogOpen(false);
        setStdCancel(false);
        setStdCancelReason("");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };

  const handleColse = () => {
    setDialogOpen(false);
    setNotificationData();
    setClickedNotification(null);
  };

  const calenderButtons = [
    { key: "google", title: "Google", icon: "" },
    { key: "outlook", title: "Outlook", icon: "" },
    { key: "yahoo", title: "Yahoo", icon: "" },
    { key: "office365", title: "Office 365", icon: "" },
  ];

  const handleAddToCalender = (button) => {
    NotificationController.addToCalender(
      {
        appointmentWith: notificationData.name,
        appointmentTime: notificationData.startTime,
        calender: button.key,
      },
      setSnackbar
    );
  };

  const handleProfileClick = (id) =>{
    if(userInfo.userStatus === "student" && id){
        router.push(`/mentors/${id}`)
    }else{
        router.push(`/students/${id}`)
    }
  }


 const handleMessageClick = (id) =>{
    if(userInfo.userStatus === "student" && id){
        Cookies.remove("fcmToken");
        Cookies.remove("conversationId");
        router.push(`/dashboard/chat/${id}`)
    }else{
        Cookies.remove("fcmToken");
        Cookies.remove("conversationId");
        router.push(`/dashboard/chat/${id}`)
    }
 }

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleColse}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {loading ? (
          <Loading maxWidth={400} maxHeight={400} />
        ) : notificationData ? (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Iconify
                  icon={"ion:notifications-outline"}
                  width={24}
                  height={24}
                />{" "}
                &nbsp; &nbsp;
                <Typography fontWeight="bold">
                  Appointment {notificationData.status}
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box py={2} display="flex" alignItems="center">
                <Avatar
                  sx={{
                    width: `${matchesSm ? "80px" : "90px"}`,
                    height: `${matchesSm ? "80px" : "90px"}`,
                  }}
                  src={
                    notificationData &&
                    `${BASE_URL}/${notificationData.profilePic}`
                  }
                  alt={notificationData.name}
                />
                <Box pl={3}>
                  <Typography variant={matchesSm ? "body1" : "h4"}>
                    {notificationData.name}
                  </Typography>

                  <Button
                    style={{ marginTop: 10, marginRight: 10 }}
                    size="small"
                    variant="contained"
                    startIcon={
                      <Iconify
                        icon={"iconamoon:profile"}
                        width={24}
                        height={24}
                      />
                    }
                    onClick={() => handleProfileClick(notificationData.id)}
                  >
                    Profile
                  </Button>
                  <Button
                    size="small"
                    style={{ marginTop: 10 }}
                    variant="outlined"
                      onClick={() => handleMessageClick(notificationData.id)}
                    startIcon={
                      <Iconify icon={"tabler:message"} width={24} height={24} />
                    }
                  >
                    Message
                  </Button>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <div>
                  <Typography variant="body2" style={{ color: "grey" }} pb={2}>
                    Time Table
                  </Typography>

                  <Box display="flex" alignItems="center" pb={2}>
                    <Iconify
                      icon={"clarity:date-solid"}
                      width={24}
                      height={24}
                    />{" "}
                    &nbsp; &nbsp;
                    <Typography>
                      {managingTime.getLocalDate(notificationData.startTime)}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" pb={2}>
                    <Iconify icon={"carbon:time"} width={24} height={24} />{" "}
                    &nbsp; &nbsp;
                    <Typography>
                      {managingTime.getLocalTime(notificationData.startTime)}
                      &nbsp;-&nbsp;
                      {managingTime.getLocalTime(notificationData.endTime)}
                    </Typography>
                  </Box>
                </div>

                <div>
                  <Typography
                    variant="body2"
                    style={{ color: "grey" }}
                    textAlign="right"
                    pb={2}
                  >
                    Status
                  </Typography>
                  <Chip
                    //  sx={{ position: "absolute", right: 0, top: -5 }}
                    size="small"
                    label={notificationData.status}
                    color={
                      notificationData.status === "Pending"
                        ? "warning"
                        : notificationData.status === "Accepted" || "Done"
                        ? "success"
                        : "error"
                    }
                    variant="filled"
                  />
                </div>
              </Box>
              <>
                <InputLabel
                  style={{ color: "grey", fontSize: 18 }}
                  shrink
                  htmlFor="outlined-multiline-static"
                >
                  {denyAppointment ? "Reason *" : "Queries"}
                </InputLabel>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  fullWidth
                  disabled={!denyAppointment}
                  rows={4}
                  onChange={(e) => setDenyReason(e.target.value)}
                  value={denyAppointment ? denyReason : notificationData.query}
                />
                {userInfo.userStatus === "student" && stdCancel && (
                  <>
                    <InputLabel
                      style={{ color: "grey", fontSize: 18, marginTop: 15 }}
                      shrink
                      htmlFor="stdCancelReason"
                    >
                      Reason for cancelation
                    </InputLabel>

                    <TextField
                      id="stdCancelReason"
                      multiline
                      fullWidth
                      // disabled={!denyAppointment}
                      rows={4}
                      onChange={(e) => setStdCancelReason(e.target.value)}
                      // value={
                      //   denyAppointment ? denyReason : notificationData.query
                      // }
                    />
                  </>
                )}

                <br />
                <br />
                {notificationData.status === "Denied" && (
                  <>
                    <InputLabel style={{ color: "grey", fontSize: 18 }} shrink>
                      Reason
                    </InputLabel>
                    <TextField
                      multiline
                      fullWidth
                      disabled
                      rows={4}
                      value={notificationData.reason}
                    />
                  </>
                )}
              </>
            </DialogContent>
            <DialogActions>
              {denyAppointment ? (
                <>
                  <Button
                    size="small"
                    onClick={() => {
                      setDenyAppointment(false);
                      setDenyReason("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!denyReason}
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleAcceptOrDenyAppointment(false)}
                  >
                    Confirm
                  </Button>
                </>
              ) : notificationData.status === "Pending" ? (
                userInfo.userStatus === "student" ? (
                  <>
                    {/* {stdCancel ? (
                        <>
                          <Button
                            variant="text"
                            onClick={() => {
                              setStdCancelReason("");
                              setStdCancel(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="small"
                            onClick={handleStdCancel}
                            variant="contained"
                            color="error"
                            disabled={!stdCancelReason}
                          >
                            Confirm
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<TiDelete />}
                          color="error"
                          // onClick={() => handleAcceptOrDenyAppointment(true)}
                          onClick={() => {
                            setStdCancel(true);
                          }}
                          size="small"
                        >
                          Cancel Request
                        </Button>
                      )} */}
                  </>
                ) : (
                  !fromAppointmentPage && (
                    <>
                      <Button
                        variant="contained"
                        startIcon={
                          <Iconify
                            icon={"akar-icons:arrow-back-thick-fill"}
                            width={24}
                            height={24}
                          />
                        }
                        color="success"
                        onClick={() => handleAcceptOrDenyAppointment(true)}
                        size="small"
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={
                          <Iconify
                            icon={"akar-icons:arrow-back-thick-fill"}
                            width={24}
                            height={24}
                          />
                        }
                        color="error"
                        onClick={() => setDenyAppointment(true)}
                        size="small"
                      >
                        Deny
                      </Button>
                      &nbsp;&nbsp;
                    </>
                  )
                )
              ) : notificationData.status === "Accepted" ? (
                <>
                  <Typography variant="caption" pr={1}>
                    Add to Calendar
                  </Typography>
                  <div>
                    {calenderButtons.map((button, idx) => (
                      <Button
                        key={idx}
                        size="small"
                        variant="outlined"
                        color="info"
                        onClick={() => handleAddToCalender(button)}
                        sx={{ mr: 0.5, mb: 0.5 }}
                      >
                        {button.title}
                      </Button>
                    ))}
                  </div>
                </>
              ) : null}
            </DialogActions>
          </>
        ) : null}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.text}
        </Alert>
      </Snackbar>
    </>
  );
}

export default React.memo(NotificationDialog);
