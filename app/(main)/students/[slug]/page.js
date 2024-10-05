"use client";
import React, { useContext, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { useParams } from "next/navigation";
import { profileViewData } from "@/data/ProfileViewData";
import { STUDENT_PROFILE_VIEW_CALL } from "@/services/studentRequests";
import { BASE_URL } from "@/utils/axios";


const Title = styled(Typography)({
  color: "grey",
  padding: "15px 0px 5px 0px",
  fontWeight: 500,
});

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(11),
  },
}));

const SocialWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  "& .icon-wrap": {
    padding: "4px",
    borderRadius: "3px",
    marginBottom: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: "10px",
  },
  "& .wp": {
    background: "#00A884",
  },
  "& .fb": {
    background: "#166FE5",
  },
  "& .yt": {
    background: "#FF0000",
  },
  "& .insta": {
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  },
  "& .lin": {
    background: "#0a66c2",
  },
}));

function ProfileView() {
  const theme = useTheme();
  const params = useParams();
  const { slug } = params;
  const [loading, setLoading] = useState();
  const [value, setValue] = useState("1");
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [profileData, setProfileData] = useState();


  useEffect(() => {
    setLoading(true);
    STUDENT_PROFILE_VIEW_CALL(slug)
      .then((res) => {
        setProfileData({
          ...res.data,
          studentPhone:
            JSON.parse(res.data.studentPhone).dialCode +
            JSON.parse(res.data.studentPhone).phoneNumber,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [slug]);


  return loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress
        sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
      />
    </Box>
  ) : !profileData ? (
    <div>
      <p>Not found</p>
    </div>
  ) : (
    <RootStyle>
      <Container sx={{ py: matchesSm ? 0 : 8 }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box
            py={3}
            display="flex"
            flexDirection={matchesSm ? "column" : "row"}
            alignItems={matchesSm ? "center" : "center"}
          >
            <Avatar
              sx={{ width: 150, height: 150 }}
              src={`${BASE_URL}/${profileData?.studentProfilePic}`}
            />

            <Box pl={matchesSm ? 0 : 3} mt={matchesSm ? 2 : 0}>
              <Typography variant={matchesSm ? "body1" : "h4"}>
                {profileData?.studentName}
              </Typography>
              <Typography variant={matchesSm ? "caption" : "subtitle1"}>
                {profileData?.studentEmail}
              </Typography>
            </Box>
          </Box>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", m: 2 }}>
              <TabList aria-label="lab API tabs example">
                <Tab
                  label="Profile Information"
                  value="1"
                  sx={{ fontWeight: "bold" }}
                />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ m: 2 }}>
              <Grid container spacing={6}>
                {profileViewData("student").map((section, idx) => (
                  <Grid item xs={12} md={6} key={idx}>
                    {section.type !== "social" ? (
                      <>
                        <Typography
                          variant={matchesSm ? "p" : "p"}
                          pt={3}
                          textTransform="uppercase"
                        >
                          {section.sectionName}
                        </Typography>
                        <Divider />
                        {section.data.map((item, i) => (
                          <React.Fragment key={i}>
                            <Title variant="h5">{item.title}</Title>
                            <Typography
                              variant={matchesSm ? "body1" : "subtitle1"}
                            >
                              {item.key === "mentorPhone"
                                ? formatPhoneNumber(profileData[item.key])
                                : profileData[item.key]}
                            </Typography>
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      <>
                        <Typography
                          variant={matchesSm ? "body1" : "h4"}
                          pt={3}
                          fontWeight="bold"
                        >
                          {section.sectionName}
                        </Typography>
                        <SocialWrapper>
                          {section.data.map((item, i) => (
                            <a
                              className={`icon-wrap ${item.className}`}
                              href={
                                item.title === "Instagram"
                                  ? `https://www.instagram.com/${
                                      profileDeatails[item.key]
                                    }`
                                  : item.title === "WhatsApp"
                                  ? `https://wa.me/${profileData[item.key]}`
                                  : profileData[item.key]
                              }
                              target="_blank"
                              rel="noreferrer"
                              key={i}
                            >
                              {item.icon &&
                                React.cloneElement(item.icon, {
                                  size: 25,
                                  color: "#FFFF",
                                })}
                            </a>
                          ))}
                        </SocialWrapper>
                      </>
                    )}
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </RootStyle>
  );
}

export default ProfileView;
