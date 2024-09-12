// next
import NextLink from "next/link";
// @mui
import { Avatar, Box, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// hooks
// import useAuth from "../../../hooks/useAuth";
// routes
import { PATH_DASHBOARD } from "@/routes/paths";
// components
import MyAvatar from "@/components/MyAvatar";
import { BASE_URL } from "@/utils/axios";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavbarAccount({ isCollapse, userInfo }) {
  const { name, email, profilePic } = userInfo;
  return (
    <>
      <Link
        component={NextLink}
        href={PATH_DASHBOARD.profile.account}
        underline="none"
        color="inherit"
      >
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: "transparent",
            }),
          }}
        >
          <Avatar alt={name} src={`${BASE_URL}/${profilePic}`} />

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: "text.secondary",width:"120px" }}>
              {email}
            </Typography>
          </Box>
        </RootStyle>
      </Link>
    </>
  );
}
