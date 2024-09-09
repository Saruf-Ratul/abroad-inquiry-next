"use client";
import { HEADER } from "@/config";
import useOffSetTop from "@/hooks/useOffSetTop";
import useResponsive from "@/hooks/useResponsive";
import cssStyles from "@/utils/cssStyles";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Logo from "../../components/Logo";
import MenuDesktop from "./MenuDesktop";
// import MenuMobile from "./MenuMobile";
import Iconify from "@/components/Iconify";
import SettingMode from "@/components/SettingMode";
import { fetchUserInfo, logout } from "@/redux/features/auth/authSlice";
import { PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { BASE_URL } from "@/utils/axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import navConfig from "./MenuConfig";
import MenuMobile from "./MenuMobile";
import Cookies from "js-cookie";
import TopLabel from "@/components/TopLabel";

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

export default function MainHeader() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { userInfo } = useSelector((state) => state.user);
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const theme = useTheme();

  const isDesktop = useResponsive("up", "md");

  return (
    <>
      <AppBar sx={{ 
        boxShadow: 0, 
        bgcolor: "transparent",
        }}>
      {!isOffset && isDesktop && <TopLabel />}
        <ToolbarStyle
          disableGutters
          sx={{
            ...(isOffset && {
              ...cssStyles(theme).bgBlur(),
              height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
            }),
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            {isDesktop && (
              <MenuDesktop
                isOffset={isOffset}
                isHome={isHome}
                navConfig={navConfig}
              />
            )}

            {!isDesktop && (
              <MenuMobile
                isOffset={isOffset}
                isHome={isHome}
                navConfig={navConfig}
              />
            )}
            {token ? (
              <div>
                <Avatar
                  onClick={handleClick}
                  alt={userInfo?.name}
                  src={userInfo && `${BASE_URL}/${userInfo.profilePic}`}
                />

                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    sx: {},
                  }}
                >
                  <List
                    sx={{ width: "100%", maxWidth: 250, cursor: "pointer" }}
                  >
                    <>
                      <Link
                        href={PATH_DASHBOARD.root}
                        style={{
                          textDecoration: "none",
                          color: "orange",
                          fontWeight: "bold",
                        }}
                      >
                        <ButtonBase>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar
                                alt={userInfo?.name}
                                src={
                                  userInfo &&
                                  `${BASE_URL}/${userInfo.profilePic}`
                                }
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="h6" fontWeight={"bold"}>
                                  {userInfo.name}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="caption">
                                  See your profile
                                </Typography>
                              }
                            />
                          </ListItem>
                        </ButtonBase>
                      </Link>
                      <Divider />
                    </>
                    <>
                      <ListItemButton>
                        <ListItemIcon>
                          <Badge color="error">
                            <Iconify
                              icon={"tabler:message-filled"}
                              width={24}
                              height={24}
                            />
                          </Badge>
                        </ListItemIcon>
                        <Link
                          href={PATH_DASHBOARD.chat.root}
                          style={{
                            textDecoration: "none",
                            color: "orange",
                            fontWeight: "bold",
                          }}
                        >
                          <ListItemText primary="Messages" />
                        </Link>
                      </ListItemButton>

                      <ListItemButton>
                        <ListItemIcon>
                          <Badge color="error">
                            <Iconify
                              icon={"basil:notification-solid"}
                              width={24}
                              height={24}
                            />
                          </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                      </ListItemButton>

                      <ListItem>
                        <Box textAlign="center" width="100%">
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
                      </ListItem>
                    </>
                  </List>
                </Popover>
              </div>
            ) : (
              <Link href={PATH_AUTH.login}>
                <Button variant="contained" color="secondary">
                  Login
                </Button>
              </Link>
            )}
            <SettingMode />
          </Container>
        </ToolbarStyle>

        {isOffset && <ToolbarShadowStyle />}
      </AppBar>
    </>
  );
}
