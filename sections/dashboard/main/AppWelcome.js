"use client";
// @mui
import { Button, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useSelector } from "react-redux";
import banner from "@/public/assets/images/others/dashboard.webp";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  backgroundColor: theme.palette.secondary.lighter,
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function AppWelcome({ displayName }) {
  const router = useRouter();
  const { user, socketId, lastMsg } = useUser();
  const [loggedInUser, setLoggedInUser] = user;

  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: "grey.800",
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome back,
          <br /> {loggedInUser.name}!
        </Typography>

        <Typography
          variant="body2"
          sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: "auto" }}
        >
          Explore global education opportunities, Receive personalized guidance
          from experienced mentors, Book appointments for expert advice Stay
          updated on application statuses and deadlines
        </Typography>

        {loggedInUser?.userStatus === "mentor" ? (
         null
        ) : (   <Button
            variant="contained"
            onClick={() => router.push("/dashboard/application-abroad")}
          >
            Apply Abroad
          </Button>)}
      </CardContent>
      <Image
        src={banner}
        height={300}
        alt=""
        width={360}
        style={{ objectFit: "cover", py: 2, pr: 10 }}
      />
    </RootStyle>
  );
}
