"use client";
import { Box, Container, Grid } from "@mui/material";

import DataLoading from "@/components/DataLoading";
import MentorCard from "@/components/mentor-card/MentorCard";
import { fetchMentors } from "@/redux/features/mentor/mentorSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MentorsList() {
  const dispatch = useDispatch();
  const { mentors, loading } = useSelector((state) => state.mentors);

  useEffect(() => {
    dispatch(fetchMentors(1));
  }, [dispatch]);

  return (
    <>
      <Container>
        <Box>
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
