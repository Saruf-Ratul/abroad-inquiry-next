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
} from "@mui/material";
import Iconify from "@/components/Iconify";
import managingTime from "@/components/managingTime";
import { format } from "timeago.js";
import Pagination from "@/components/Pagination";
import MentorController from "@/services/controllers/mentor";
import StudentController from "@/services/controllers/student";
import NotificationController from "@/services/controllers/notification";
import NotificationDialog from "@/components/NotificationDialog";

const Notifications = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState({
    totalNotification: 0,
    notificationData: [],
  });

  const [socket, setSocket] = useState(null);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = useState(true);
  const [clickedNotification, setClickedNotification] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const matchesSm = useMediaQuery("(max-width:600px)");



  useEffect(() => {
    if (userInfo.userStatus === "student") {
      StudentController.GET_NOTIFICATIONS(
        userInfo.id,
        page,
        setNotifications,
        setLoading
      );
    } else {
      MentorController.GET_NOTIFICATIONS(
        userInfo.id,
        page,
        setNotifications,
        setLoading
      );
    }
  }, [page,userInfo.id ,userInfo.userStatus]);

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
      <Box sx={{ marginTop: "32px" }}>
        <Typography py={2} variant={matchesSm ? "h5" : "h3"} textAlign="center">
          Notifications
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
                      <ListItemText
                        primary={notification.notification}
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
            <Iconify icon={"hugeicons:notification-off-01"} width={44} height={44} />
            <Typography py={3}>
              We will notify you when something arrives!
            </Typography>
          </Box>
        )}
      </Box>

      {clickedNotification && (
        <NotificationDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          userStatus={userInfo.userStatus}
          clickedNotification={clickedNotification}
          setClickedNotification={setClickedNotification}
        />
      )}
    </Paper>
    
  );
};

export default withAuth(Notifications);
