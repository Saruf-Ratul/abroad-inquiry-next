"use client";
import Iconify from "@/components/Iconify";
import AuthHeaderSignUp from "@/layouts/auth/MainHeaderSignUp";
import MainFooter from "@/layouts/main/MainFooter";
import { RegisterForm } from "@/sections/auth/register";
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

const studentDetails = [
  {
    title: "A Whole World of Opportunities Awaits You",
    description:
      "Explore endless global education opportunities and find the perfect program to match your ambitions.",
    icon: "mdi:earth",
  },
  {
    title: "Explore Global Education Opportunities",
    description:
      "Pursue academic success with diverse educational programs from top universities around the world.",
    icon: "mdi:school-outline",
  },
  {
    title: "Receive Personalized Guidance from Experienced Mentors",
    description:
      "Get expert advice from mentors who have lived and studied abroad, providing you with insights and support every step of the way.",
    icon: "mdi:account-tie",
  },
  {
    title: "Book Appointments for Expert Advice",
    description:
      "Schedule sessions with mentors to receive tailored advice and guidance on your education and career path.",
    icon: "mdi:calendar-check-outline",
  },
  {
    title: "Stay Updated on Application Statuses and Deadlines",
    description:
      "Keep track of your application progress and never miss an important deadline with our status updates and reminders.",
    icon: "mdi:bell-check-outline",
  },
];

const SignupPage = () => {
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
          Explore Global Education with Personalized Mentorship
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
          Your journey to studying abroad starts here—connect with mentors, stay
          informed, and seize global opportunities.
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
                {studentDetails.map((item, index) => (
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
                    {index < studentDetails.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <RegisterForm />
          </Grid>
        </Grid>
      </Container>
      <MainFooter />
    </Box>
  );
};

export default SignupPage;
