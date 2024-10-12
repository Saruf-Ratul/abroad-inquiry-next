"use client";
import withAuth from "@/sections/auth/withAuth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Divider,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ButtonBase,
  CircularProgress,
  useMediaQuery,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Iconify from "@/components/Iconify";
import managingTime from "@/components/managingTime";
import { format } from "timeago.js";
import Pagination from "@/components/Pagination";
import MentorController from "@/services/controllers/mentor";
import StudentController from "@/services/controllers/student";
import NotificationController from "@/services/controllers/notification";
import NotificationDialog from "@/components/NotificationDialog";
import {
  GET_PUSH_NOTIFICATIONS,
  UPDATE_PUSH_NOTIFICATIONS,
} from "@/services/studentRequests";

const Notifications = () => {
  const matchesSm = useMediaQuery("(max-width:600px)");
  const { userInfo } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState({
    totalNotification: 0,
    notificationData: [],
  });
  const [pushNotifications, setPushNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pushLoading, setPushLoading] = useState(true);
  const [clickedNotification, setClickedNotification] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pushTitle, setPushTitle] = useState("");
  const [pushDescription, setPushDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = (notification) => {
    setPushTitle(notification?.title);
    setPushDescription(notification?.description);
    UPDATE_PUSH_NOTIFICATIONS(userInfo?.id, notification?.push_notification_id).then((res) => {
      setOpen(true);
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userInfo.userStatus === "student") {
      StudentController.GET_NOTIFICATIONS(
        userInfo.id,
        page,
        setNotifications,
        setLoading
      );
      GET_PUSH_NOTIFICATIONS(userInfo?.id)
        .then((res) => {
          setPushLoading(false);
          setPushNotifications(res?.data);
        })
        .catch((err) => console.log(err));
    } else {
      MentorController.GET_NOTIFICATIONS(
        userInfo.id,
        page,
        setNotifications,
        setLoading
      );
    }
  }, [page, userInfo.id, userInfo.userStatus]);

  socket?.on("getNotification", (message) => {
    const newNotifcation = {
      notification: message.message,
      isRead: false,
      appointmentId: message.appointmentId,
      notificationId: message.notificationId,
      createdAt: message.createdAt,
    };

    const newTotal = notifications.totalNotification + 1;
    const newData = [newNotifcation, ...notifications.notificationData];
    setPage(1);
    setNotifications({
      totalNotification: newTotal,
      notificationData: newData,
    });
  });

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleAppointmentClick = (data) => {
    const objIndex = notifications?.notificationData.findIndex(
      (obj) => obj.notificationId === data.notificationId
    );

    const newState = [...notifications.notificationData];
    notifications.notificationData[objIndex].isRead = true;

    NotificationController.readNotification({
      notificationId: data.notificationId,
    })
      .then((res) => {
        setNotifications({
          ...notifications,
          newState,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setClickedNotification(data.appointmentId);
    setDialogOpen(true);
  };

  return (
    <Paper sx={{ ml: 4, mr: 4 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: matchesSm ? "column" : "row",
          gap: matchesSm ? "5px" : "16px",
        }}
      >
        {" "}
        <Box sx={{ marginTop: "32px", flex: 1 }}>
          {" "}
          <Typography
            py={2}
            variant={matchesSm ? "h5" : "h3"}
            textAlign="center"
          >
            Appointment Notifications
          </Typography>
          <Divider />
          {loading ? (
            <Box textAlign="center" py={5}>
              <CircularProgress />
            </Box>
          ) : notifications.notificationData?.length !== 0 ? (
            <>
              <List>
                {notifications.notificationData.map((notification, idx) => (
                  <React.Fragment key={idx}>
                    <ButtonBase
                      sx={{
                        width: "100%",
                        py: 0.8,
                        backgroundColor: notification.isRead
                          ? ""
                          : "rgb(242, 242, 242)",
                      }}
                      onClick={() => handleAppointmentClick(notification)}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Iconify
                              icon={"carbon:notification"}
                              width={24}
                              height={24}
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={notification.notification} />
                        {managingTime.isTodaysDate(notification.createdAt) ? (
                          managingTime.getLocalTime(notification.createdAt)
                        ) : (
                          <>{format(notification.createdAt)}</>
                        )}
                      </ListItem>
                    </ButtonBase>
                    <Divider variant="fullWidth" fullWidth />
                  </React.Fragment>
                ))}
              </List>
              <Pagination
                page={page}
                handleChangePage={handleChangePage}
                totalItem={notifications.totalNotification}
                itemPerPage={10}
              />
              <br />
            </>
          ) : (
            <Box textAlign="center">
              <Typography py={3}>No Notifications yet!</Typography>
              <Iconify
                icon={"hugeicons:notification-off-01"}
                width={44}
                height={44}
              />
              <Typography py={3}>
                We will notify you when something arrives!
              </Typography>
            </Box>
          )}
        </Box>
        {matchesSm && userInfo?.userStatus === "student" ? (
          <Divider orientation="vertical" flexItem />
        ) : null}
        {userInfo.userStatus === "student" ? (
          <Box sx={{ marginTop: "32px", flex: 1 }}>
            {" "}
            {/* Added flex: 1 to make it responsive */}
            <Typography
              py={2}
              variant={matchesSm ? "h5" : "h3"}
              textAlign="center"
            >
              Notifications
            </Typography>
            <Divider />
            {pushLoading ? (
              <Box textAlign="center" py={5}>
                <CircularProgress />
              </Box>
            ) : pushNotifications?.length !== 0 ? (
              <>
                <List>
                  {pushNotifications.map((notification, idx) => (
                    <React.Fragment key={idx}>
                      <ButtonBase
                        sx={{
                          width: "100%",
                          py: 0.8,
                          backgroundColor: notification
                            ?.student_push_notifications[0]?.is_read
                            ? ""
                            : "rgb(242, 242, 242)",
                        }}
                        onClick={() => handleClickOpen(notification)}
                      >
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar>
                              <Iconify
                                icon={"carbon:notification"}
                                width={24}
                                height={24}
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={notification.title}
                            secondary="See Details....."
                          />
                          {managingTime.isTodaysDate(notification.createdAt) ? (
                            managingTime.getLocalTime(notification.createdAt)
                          ) : (
                            <>{format(notification.createdAt)}</>
                          )}
                        </ListItem>
                      </ButtonBase>
                      <Divider variant="fullWidth" fullWidth />
                    </React.Fragment>
                  ))}
                </List>

                <Pagination
                  page={page}
                  handleChangePage={handleChangePage}
                  totalItem={notifications.totalNotification}
                  itemPerPage={10}
                />
                <br />
              </>
            ) : (
              <Box textAlign="center">
                <Typography py={3}>No Notifications yet!</Typography>
                <Iconify
                  icon={"hugeicons:notification-off-01"}
                  width={44}
                  height={44}
                />
                <Typography py={3}>
                  We will notify you when something arrives!
                </Typography>
              </Box>
            )}
          </Box>
        ) : null}
      </div>

      {clickedNotification && (
        <NotificationDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          userStatus={userInfo.userStatus}
          clickedNotification={clickedNotification}
          setClickedNotification={setClickedNotification}
        />
      )}

      <>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Iconify
                icon={"ion:notifications-outline"}
                width={24}
                height={24}
              />{" "}
              &nbsp; &nbsp;
              <Typography fontWeight="bold">{pushTitle}</Typography>
            </Box>
          </DialogTitle>

          <Divider />
          <DialogContent dividers sx={{ textAlign: "center" }}>
            <Typography variant="body1" gutterBottom>
              {pushDescription}
            </Typography>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              startIcon={
                <Iconify icon={"mdi:cancel-bold"} width={24} height={24} />
              }
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Paper>
  );
};

export default withAuth(Notifications);
