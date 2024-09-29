// @mui
import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
// hooks
import useOffSetTop from "@/hooks/useOffSetTop";
import useResponsive from "@/hooks/useResponsive";
// utils
import cssStyles from "@/utils/cssStyles";
// config
import { HEADER, NAVBAR } from "@/config";
// components
import Iconify from "@/components/Iconify";
import Logo from "@/components/Logo";
import { IconButtonAnimate } from "@/components/animate";
//
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./NotificationsPopover";
import Searchbar from "./Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserInfo } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import SettingMode from "@/components/SettingMode";

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: "100%",
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}) {
  const dispatch = useDispatch();
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
    const { userInfo } = useSelector((state) => state.user);

  const isDesktop = useResponsive("up", "lg");
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [dispatch, token]);

  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <NotificationsPopover />

          <AccountPopover userInfo={userInfo} />
        </Stack>
        <SettingMode />
      </Toolbar>
    </RootStyle>
  );
}
