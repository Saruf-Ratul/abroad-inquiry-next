"use client";
import React, { useEffect } from "react";
import NewsfeedCard from "./NewsfeedCard";
import NewsfeedFacebookPost from "./NewsfeedFacebookPost";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "@/redux/features/newsfeed/newsfeedSlice";
import DataLoading from "@/components/DataLoading";

const NewsfeedIndex = () => {
  const matchSm = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogPosts(1));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Container style={{ marginTop: "100px" }}>
          <DataLoading />
        </Container>
      ) : (
        <Box sx={{m:matchSm ? 8 : 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <NewsfeedCard blogs={blogs} />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewsfeedFacebookPost />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default NewsfeedIndex;
