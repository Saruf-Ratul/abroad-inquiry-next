import Iconify from "@/components/Iconify";
import { BASE_URL } from "@/utils/axios";
import { Alert } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { format } from "timeago.js";

function truncate(str, { length: maxLength, omission = "..." }) {
  return str.length > maxLength
    ? str.slice(0, maxLength - omission.length) + omission
    : str;
}

function NewsfeedDetails({ blogDetails }) {
  const { blogTitle, blogFeaturedImage, blogBody, author, blogCreatedAt } =
    blogDetails;
  const parsedBlogBody = blogBody ? JSON.parse(blogBody) : "";

  const [like, setLike] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState({
    status: false,
    text: "",
    severity: "",
  });

  const handleLike = () => {
    setLike(!like);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    const postLink = `${window.location.origin}/newsfeed/${blogDetails.blogId}`;
    navigator.clipboard
      .writeText(postLink)
      .then(() => {
        setSnackbarOpen({
          ...snackbarOpen,
          status: true,
          severity: "success",
          text: "The link has been copied to your clipboard",
        });
      })
      .catch((err) => {
        setSnackbarOpen({
          ...snackbarOpen,
          status: true,
          severity: "error",
          text: "Sorry! The link has not been copied to your clipboard",
        });
      });
  };

  const handleShareFacebook = () => {
    const postLink = `${window.location.origin}/newsfeed/${blogDetails.blogId}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postLink
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

  const handleShareTwitter = () => {
    const postLink = `${window.location.origin}/newsfeed/${blogDetails.blogId}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postLink
    )}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleShareLinkedin = () => {
    const postLink = `${window.location.origin}/newsfeed/${blogDetails.blogId}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      postLink
    )}`;
    window.open(linkedinShareUrl, "_blank");
  };

  return (
    <Container>
      <Box my={5}>
        <Card>
          <Box m={3}>
            {/* Author Info */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  style={{ width: 40, height: 40, marginRight: "10px" }}
                  src={`${BASE_URL}/${author?.authorPicture}`}
                />
                <Box>
                  <Typography variant="body1">{author?.authorName}</Typography>
                  <Typography variant="caption">
                    {format(blogCreatedAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Blog Title */}
            <Typography
              component="div"
              variant="h5"
              mt={2}
              mb={2}
              fontWeight="bold"
            >
              {blogTitle}
            </Typography>

            {/* Featured Image */}
            <Box
              position="relative"
              width="100%"
              height={300}
              mb={3}
              sx={{
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Image
                src={`${BASE_URL}/${blogFeaturedImage}`}
                layout="fill"
                objectFit="cover"
                alt={blogTitle}
              />
            </Box>

            {/* Blog Content */}
            <Box
              px={3}
              pb={5}
              style={{ wordBreak: "break-word", textAlign: "justify" }}
              dangerouslySetInnerHTML={{
                __html: parsedBlogBody,
              }}
            />

            {/* Actions: Like, Comment, Share */}
            <Box display="flex" alignItems="center" mt={3}>
              <Button
                size="small"
                startIcon={
                  like ? (
                    <Iconify
                      icon={"bxs:like"}
                      width={24}
                      height={24}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <Iconify
                      icon={"bx:like"}
                      width={24}
                      height={24}
                      style={{ color: "black" }}
                    />
                  )
                }
                onClick={handleLike}
              >
                {like ? "Liked" : "Like"}
              </Button>

              <IconButton onClick={handleMenuClick}>
                <Iconify
                  icon={"mdi:share-outline"}
                  width={24}
                  height={24}
                  style={{ color: "black" }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleCopyLink}>
                  <Iconify
                    icon={"tabler:copy"}
                    width={24}
                    height={24}
                    style={{ marginRight: "5px" }}
                  />
                  Copy link
                </MenuItem>

                <MenuItem onClick={handleShareTwitter}>
                  <Iconify
                    icon={"ant-design:twitter-outlined"}
                    width={24}
                    height={24}
                    style={{ marginRight: "5px" }}
                  />
                  Share on Twitter
                </MenuItem>

                <MenuItem onClick={handleShareFacebook}>
                  <Iconify
                    icon={"ic:twotone-facebook"}
                    width={24}
                    height={24}
                    style={{ marginRight: "5px" }}
                  />
                  Share on Facebook
                </MenuItem>

                <MenuItem onClick={handleShareLinkedin}>
                  <Iconify
                    icon={"mingcute:linkedin-fill"}
                    width={24}
                    height={24}
                    style={{ marginRight: "5px" }}
                  />
                  Share on LinkedIn
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Card>
      </Box>

      <Snackbar
        open={snackbarOpen.status}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen({ ...snackbarOpen, status: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen({ ...snackbarOpen, status: false })}
          severity={snackbarOpen.severity}
          sx={{ width: "100%" }}
        >
          {snackbarOpen.text}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default NewsfeedDetails;
