import Iconify from "@/components/Iconify";
import { BASE_URL } from "@/utils/axios";
import { Alert } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
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
          status: true,
          severity: "success",
          text: "The link has been copied to your clipboard",
        });
      })
      .catch(() => {
        setSnackbarOpen({
          status: true,
          severity: "error",
          text: "Sorry! The link has not been copied",
        });
      });
  };

  const handleShare = (platform) => {
    const postLink = `${window.location.origin}/newsfeed/${blogDetails.blogId}`;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        postLink
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        postLink
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        postLink
      )}`,
    };
    window.open(shareUrls[platform], "_blank");
  };

  return (
    <Container>
      <Box>
        <Card>
          <Box sx={{ p: { xs: 2, md: 3 } }}>
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

              {/* Share Button */}

              <Button
                onClick={handleMenuClick}
                startIcon={<Iconify icon="mdi:share-outline" />}
                aria-label="share"
                variant="outlined"
              >
                Share
              </Button>

              {/* <IconButton onClick={handleMenuClick} >
                <Iconify icon="mdi:share-outline" />
              </IconButton> */}
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

            {/* Like and Comment Buttons */}
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={3}
            >
              <Button
                onClick={handleLike}
                startIcon={
                  <Iconify
                    icon={like ? "bxs:like" : "bx:like"}
                    sx={{ color: like ? "red" : "black" }}
                  />
                }
              >
                {like ? "Liked" : "Like"}
              </Button>
              <Button
                startIcon={<Iconify icon="ant-design:comment-outlined" />}
                aria-label="comment"
              >
                Comment
              </Button>
            </Box>

            {/* Share Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: { borderRadius: 8, minWidth: 200 },
              }}
            >
              <MenuItem onClick={handleCopyLink}>
                <Iconify icon="tabler:copy" sx={{ marginRight: "8px" }} />
                Copy link
              </MenuItem>
              <MenuItem onClick={() => handleShare("twitter")}>
                <Iconify
                  icon="ant-design:twitter-outlined"
                  sx={{ marginRight: "8px" }}
                />
                Share on Twitter
              </MenuItem>
              <MenuItem onClick={() => handleShare("facebook")}>
                <Iconify
                  icon="ic:twotone-facebook"
                  sx={{ marginRight: "8px" }}
                />
                Share on Facebook
              </MenuItem>
              <MenuItem onClick={() => handleShare("linkedin")}>
                <Iconify
                  icon="mingcute:linkedin-fill"
                  sx={{ marginRight: "8px" }}
                />
                Share on LinkedIn
              </MenuItem>
            </Menu>

            {/* Snackbar Notification */}
            <Snackbar
              open={snackbarOpen.status}
              autoHideDuration={4000}
              onClose={() =>
                setSnackbarOpen({ status: false, text: "", severity: "" })
              }
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={() =>
                  setSnackbarOpen({ status: false, text: "", severity: "" })
                }
                severity={snackbarOpen.severity}
                sx={{ width: "100%" }}
              >
                {snackbarOpen.text}
              </Alert>
            </Snackbar>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default NewsfeedDetails;
