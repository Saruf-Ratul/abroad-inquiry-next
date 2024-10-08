"use client";
import { Alert, Box, Container, Grid, Typography } from "@mui/material";

import DataLoading from "@/components/DataLoading";
import MentorCard from "@/components/mentor-card/MentorCard";
import { fetchMentors } from "@/redux/features/mentor/mentorSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MentorsList() {
  const dispatch = useDispatch();
  const { mentors, loading } = useSelector((state) => state.mentors);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchMentors(1));
  }, [dispatch]);

  return (
    <>
      <Container>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Chat or Book Appointment with our Mentors
          </Typography>
          {!userInfo.id && (
            <Alert severity="info" sx={{ marginBottom: "30px" }}>
              Login or Sign Up is required to message or schedule an appointment
              with our esteemed mentors.
            </Alert>
          )}

          {loading ? (
            <DataLoading />
          ) : (
            <Grid container spacing={3}>
              {mentors.map((mentor) => (
                <Grid key={mentor.id} item xs={12} md={4}>
                  <MentorCard mentor={mentor} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}
