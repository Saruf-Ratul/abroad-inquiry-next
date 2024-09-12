import { useEffect } from "react";
// next
import { useRouter } from "next/navigation";
// @mui
import { Box, Drawer, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
// hooks
import useCollapseDrawer from "@/hooks/useCollapseDrawer";
import useResponsive from "@/hooks/useResponsive";
// utils
import cssStyles from "@/utils/cssStyles";
// config
import { NAVBAR } from "@/config";
// components
import Logo from "@/components/Logo";
import Scrollbar from "@/components/Scrollbar";
import { NavSectionVertical } from "@/components/nav-section";
//
import CollapseButton from "./CollapseButton";
import navConfig from "./NavConfig";
import NavbarAccount from "./NavbarAccount";
import { fetchUserInfo } from "@/redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { userInfo } = useSelector((state) => state.user);

  const theme = useTheme();

  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [dispatch, token]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: "center" }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo />

          {isDesktop && !isCollapse && (
            <CollapseButton
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )}
        </Stack>

        <NavbarAccount isCollapse={isCollapse} userInfo={userInfo}/>
      </Stack>

      <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: "dashed",
              bgcolor: "background.default",
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
