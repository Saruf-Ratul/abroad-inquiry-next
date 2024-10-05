"use client";
import Iconify from "@/components/Iconify";
import AuthHeaderSignUp from "@/layouts/auth/MainHeaderSignUp";
import MainFooter from "@/layouts/main/MainFooter";
import MentorRegistrationForm1 from "@/sections/auth/register/mentorRegistration/MentorRegistrationForm1";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const mentorDetails = [
  {
    title: "Flexible Work as a Mentor:",
    description:
      "Mentors can work on their own schedule, providing guidance to international students, much like a freelancer.",
    icon: "mdi:clock-outline",
  },
  {
    title: "Support for Students:",
    description:
      "Mentors assist students with university admissions, visa applications, and sharing insights about studying and working abroad.",
    icon: "mdi:university",
  },
  {
    title: "Earn Through Mentorship:",
    description:
      "Mentors receive 50-70% of the fees for student guidance and 50% for successful applications, along with bonuses for referrals, blogs, and seminars.",
    icon: "mdi:cash-multiple",
  },
  {
    title: "International Networking:",
    description:
      "Mentors can expand their network globally by connecting with students, other mentors, and participating in international seminars.",
    icon: "mdi:network",
  },
  {
    title: "Qualifications:",
    description:
      "Mentors must have lived abroad for at least one year, be proficient in English, and have experience with admissions and visa processes.",
    icon: "mdi:account-check",
  },
];

const MentorSignUp1 = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: { xs: 8, md: 15 },
      }}
    >
      <AuthHeaderSignUp />
      <Container maxWidth="xl">
        {/* Title */}
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}
        >
          Become a Mentor: Empower Students with Your Experience
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: theme.palette.text.secondary,
            mb: 5,
          }}
        >
          Join our mentorship program and help international students achieve
          their dreams while earning rewards.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 1, md: 3 },
                bgcolor: theme.palette.secondary.main,
                color: "#FFFF",
              }}
            >
              <List
                sx={{
                  width: "100%",
                }}
              >
                {mentorDetails.map((item, index) => (
                  <div key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Stack
                          width={40} // Set the icon background size
                          height={40}
                          sx={{
                            bgcolor: theme.palette.background.default,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%", // Fully rounded
                            boxShadow: theme.shadows[2], // Subtle shadow for depth
                          }}
                        >
                          <Iconify
                            icon={item.icon}
                            sx={{
                              color: theme.palette.secondary.main,
                              objectFit: "contain", // Maintain aspect ratio
                            }}
                          />
                        </Stack>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {item.title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: "justify",
                            }}
                          >
                            {item.description}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < mentorDetails.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <MentorRegistrationForm1 />
          </Grid>
        </Grid>
      </Container>
      <MainFooter />
    </Box>
  );
};

export default MentorSignUp1;
