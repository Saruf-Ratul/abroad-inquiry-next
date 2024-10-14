import { useEffect, useState } from "react";
// @mui
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import { fToNow } from "@/utils/formatTime";
import Iconify from "@/components/Iconify";
import MenuPopover from "@/components/MenuPopover";
import Scrollbar from "@/components/Scrollbar";
import { IconButtonAnimate } from "@/components/animate";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMentorNotifications,
  fetchAllStudentNotifications,
} from "@/redux/features/notification/notificationSlice";
import { useRouter } from "next/navigation";
import {
  GET_UNREAD_NOTIFICATIONS,
  GET_UNREAD_PUSH_NOTIFICATIONS,
} from "@/services/studentRequests";
import { GET_UNREAD_MENTOR_NOTIFICATIONS } from "@/services/mentorRequests";

export default function NotificationsPopover() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { userInfo } = useSelector((state) => state.user);
  const { notifications, loading, totalNotification } = useSelector(
    (state) => state.notification
  );

  const [totalStdNotification, setTotalStdNotification] = useState();
  const [TotalStdPushNotification, setTotalStdPushNotification] = useState();
  const [totalMentorNotification, setTotalMentorNotification] = useState();

  useEffect(() => {
    if (userInfo?.userStatus === "student") {
      GET_UNREAD_PUSH_NOTIFICATIONS(userInfo?.id)
        .then((res) => {
          setTotalStdPushNotification(res?.data?.totalUnread);
        })
        .catch((err) => console.log(err));
      GET_UNREAD_NOTIFICATIONS()
        .then((resonse) => {
          setTotalStdNotification(resonse?.data?.totalNotification);
        })
        .catch((err) => console.log(err));
    } else if (userInfo?.userStatus === "mentor") {
      GET_UNREAD_MENTOR_NOTIFICATIONS()
        .then((res) => {
          setTotalMentorNotification(res?.data?.totalNotification);
        })
        .catch((err) => console.log(err));
    }
  }, [userInfo?.userStatus, userInfo?.id]);

  const badgeContent =
    totalMentorNotification !== 0 &&
    totalStdNotification + TotalStdPushNotification !== 0
      ? userInfo?.userStatus === "student"
        ? totalStdNotification + TotalStdPushNotification
        : totalMentorNotification
      : null;

  useEffect(() => {
    if (userInfo?.id && page) {
      dispatch(fetchAllStudentNotifications({ id: userInfo.id, page }));
      dispatch(fetchAllMentorNotifications({ id: userInfo.id, page }));
    }
  }, [dispatch, userInfo.id, page]);

  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        {badgeContent > 0 ? (
          <Badge badgeContent={badgeContent} color="error">
            <Iconify icon="eva:bell-fill" width={20} height={20} />
          </Badge>
        ):(
          <Badge  color="error">
            <Iconify icon="eva:bell-fill" width={20} height={20} />
          </Badge>
        )}
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {badgeContent} unread messages
            </Typography>
          </Box>

          {badgeContent > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButtonAnimate color="primary">
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            disableRipple
            color="success"
            onClick={() => {
              handleClose();
              router.push("/dashboard/notifications");
            }}
          >
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem({ notification }) {
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>
          <Iconify icon={"carbon:notification"} width={24} height={24} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={notification.notification}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === "order_placed") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "order_shipped") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "mail") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "chat_message") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: notification.avatar ? (
      <img alt={notification.title} src={notification.avatar} />
    ) : null,
    title,
  };
}
