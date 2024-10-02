"use client";
// ----------------------------------------------------------------------

import Logo from "@/components/Logo";
import SettingMode from "@/components/SettingMode";
import useResponsive from "@/hooks/useResponsive";
import { PATH_AUTH } from "@/routes/paths";
import { Box, Button, Link, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(2, 3),
  // height: "100px",
  justifyContent: "space-between",
  boxShadow: "0px 13px 6px 0px rgba(0,0,0,0.1)",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    //padding: theme.spacing(5, 5, 0, 7),
  },
}));

export default function AuthHeader() {
  const matchesSm = useMediaQuery("(max-width:600px)");
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");
  return (
    <HeaderStyle>
      <Logo />
      {smUp && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ mr: 2, mt: 1 }}>
              Don&apos;t have an account?
            </Typography>
            <Box>
              <Link href={PATH_AUTH.register}>
                <Button size="small" variant="contained" color="secondary">
                  Become a student
                </Button>
              </Link>

              <Link
                href="/auth/mentor/mentorApplication"
                style={{ marginLeft: matchesSm ? "0px" : "5px" }}
              >
                <Button size="small" variant="outlined" color="error">
                  Become a mentor
                </Button>
              </Link>
              <SettingMode />
            </Box>
          </Box>
        </>
      )}
    </HeaderStyle>
  );
}
