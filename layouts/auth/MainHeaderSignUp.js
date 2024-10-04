"use client";
import Logo from "@/components/Logo";
import SettingMode from "@/components/SettingMode";
import { HEADER } from "@/config";
import useOffSetTop from "@/hooks/useOffSetTop";
import cssStyles from "@/utils/cssStyles";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

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
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  width: "100%",
  margin: "auto",
  boxShadow: theme.customShadows.z8,
}));

export default function AuthHeaderSignUp() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
      }}
    >
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
          <Box>
            <SettingMode />
          </Box>
        </Container>
      </ToolbarStyle>
      <ToolbarShadowStyle />
    </AppBar>
  );
}
