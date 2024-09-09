import { useSnackbar } from "notistack";
import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import useIsMountedRef from "@/hooks/useIsMountedRef";
import MenuPopover from "@/components/MenuPopover";
import MyAvatar from "@/components/MyAvatar";
import { IconButtonAnimate } from "@/components/animate";
import { BASE_URL } from "@/utils/axios";
import Iconify from "@/components/Iconify";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

const MENU_OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: PATH_DASHBOARD.profile.root,
  },
];

export default function AccountPopover({ userInfo }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { name, email, profilePic } = userInfo;
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar alt={name} src={`${BASE_URL}/${profilePic}`} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              component={NextLink}
              href={option.linkTo}
              key={option.label}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem sx={{ m: 1 }}>
          <Box width="100%">
            <Button
              onClick={handleLogout}
              variant="contained"
              color="secondary"
              endIcon={
                <Iconify
                  icon={"ri:logout-circle-r-line"}
                  width={24}
                  height={24}
                />
              }
            >
              Logout
            </Button>
          </Box>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
