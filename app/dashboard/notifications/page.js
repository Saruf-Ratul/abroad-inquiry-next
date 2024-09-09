"use client";
import {fetchAllMentorNotifications, fetchAllStudentNotifications } from "@/redux/features/notification/notificationSlice";
import withAuth from "@/sections/auth/withAuth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const Notifications = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [socket, setSocket] = useState(null);
  const [notification,setNotification]= useState([]);
  const matchesSm = useMediaQuery("(max-width:600px)");
  const { notifications, loading, totalNotification } = useSelector(
    (state) => state.notification
  );
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.id && page) {
      dispatch(fetchAllStudentNotifications({ id: userInfo.id, page }));
      dispatch(fetchAllMentorNotifications({ id: userInfo.id, page }));
    }
  }, [dispatch, userInfo.id, page]); 

  useEffect(()=>{
   if(notifications.length > 0 ){
    setNotification(notifications);
   }
  },[notifications])


  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (message) => {
        const newNotification = {
          notification: message.message,
          isRead: false,
          appointmentId: message.appointmentId,
          notificationId: message.notificationId,
          createdAt: message.createdAt,
        };
        setPage(1);
      });
    }
    return () => {
      if (socket) socket.off("getNotification");
    };
  }, [socket]);

  const handleChangePage = (event, value) => {
    setPage(value);
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
        ) : notification?.length !== 0 ? (
          <>
            <List>
              {notification.map((notification, idx) => (
                <React.Fragment key={idx}>
                  <ButtonBase
                    sx={{
                      width: "100%",
                      py: 0.8,
                    }}
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
              totalItem={totalNotification}
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
    </Paper>
  );
};

export default withAuth(Notifications);
