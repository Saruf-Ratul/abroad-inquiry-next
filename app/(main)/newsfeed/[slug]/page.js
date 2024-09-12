"use client";
import { fetchBlogPostDetails } from "@/redux/features/newsfeed/newsfeedSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStyle } from "../../contact/style";
import NewsfeedDetails from "@/sections/newsfeed/NewsfeedDetails";
import {
  Box,
  Container,
  useMediaQuery,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";
import NewsfeedFacebookPost from "@/sections/newsfeed/NewsfeedFacebookPost";

const BlogPostDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchSm = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const { slug } = params;
  const { blogDetails, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
   if(slug){
    dispatch(fetchBlogPostDetails(slug));
   }
  }, [dispatch,slug]);

  return (
    <RootStyle>
      {loading ? (
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
      ) : (
        <Container
          style={{
            display: "flex",
            marginTop: "50px",
            flexDirection: matchSm ? "row" : "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: matchSm ? "70%" : "100%", marginRight: matchSm ? 2 : 0 }}>
            <NewsfeedDetails blogDetails={blogDetails} />
          </Box>
          <Box sx={{ width: matchSm ? "30%" : "100%",}}>
            <NewsfeedFacebookPost />
          </Box>
        </Container>
      )}
    </RootStyle>
  );
};

export default BlogPostDetails;
