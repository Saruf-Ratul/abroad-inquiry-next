"use client";
import { RootStyle } from "@/app/(main)/contact/style";
import { fetchBlogPostDetails } from "@/redux/features/newsfeed/newsfeedSlice";
import NewsfeedFacebookPost from "@/sections/newsfeed/NewsfeedFacebookPost";
import {
  Box,
  CircularProgress,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsfeedDetails from "./NewsfeedDetails";

export default function NewsfeedSinglePost({ blogId }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchSm = useMediaQuery("(min-width:600px)");
  const params = useParams();

  const { blogDetails, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (blogId) {
      dispatch(fetchBlogPostDetails(blogId));
    }
  }, [dispatch, blogId]);

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
          <Box
            sx={{
              width: matchSm ? "70%" : "100%",
              marginRight: matchSm ? 2 : 0,
            }}
          >
            <NewsfeedDetails blogDetails={blogDetails} />
          </Box>
          <Box sx={{ width: matchSm ? "30%" : "100%" }}>
            <NewsfeedFacebookPost />
          </Box>
        </Container>
      )}
    </RootStyle>
  );
}
