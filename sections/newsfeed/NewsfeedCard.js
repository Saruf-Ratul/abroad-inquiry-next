import Iconify from "@/components/Iconify";
import { BASE_URL } from "@/utils/axios";
import { Alert } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "timeago.js";

function NewsfeedCard({ blogs }) {
  const router = useRouter();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [like, setLike] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState({
    status: false,
    text: "",
    severity: "",
  });

  // Handle opening the menu and passing the blogId
  const handleMenuClick = (event, blogId) => {
    setAnchorEl({ target: event.currentTarget, blogId });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    setLike(!like);
  };

  // Copy the link to clipboard
  const handleCopyLink = () => {
    const postLink = `${window.location.origin}/newsfeed/${anchorEl.blogId}`;
    navigator.clipboard
      .writeText(postLink)
      .then(() => {
        setSnackbarOpen({
          status: true,
          severity: "success",
          text: "Link copied to clipboard!",
        });
      })
      .catch(() => {
        setSnackbarOpen({
          status: true,
          severity: "error",
          text: "Failed to copy the link!",
        });
      });
  };

  // Share the post on selected platform
  const handleShare = (platform) => {
    const postLink = `${window.location.origin}/newsfeed/${anchorEl.blogId}`;
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
    <>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={6} key={blog.blogId}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                cursor: "pointer",
                boxShadow: theme.shadows[3],
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={`${BASE_URL}/${blog.blogFeaturedImage}`}
                  alt={blog.blogTitle}
                  layout="fill"
                  objectFit="cover"
                  style={{ borderRadius: "8px 8px 0 0" }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Avatar
                    src={`${BASE_URL}/${blog.author.authorPicture}`}
                    alt={blog.author.authorName}
                    sx={{ width: 32, height: 32, marginRight: "8px" }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="subtitle2" component="div">
                      {blog.author.authorName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(blog.blogCreatedAt)}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {blog.blogTitle}
                </Typography>
                {/* <Typography variant="body2" noWrap>
                  {blog.blogDescription}
                </Typography> */}
              </CardContent>

              <CardActions
                sx={{ justifyContent: "space-between", padding: "16px" }}
              >
                <Box>
                  <IconButton onClick={handleLike} aria-label="like">
                    <Iconify
                      icon={like ? "bxs:like" : "bx:like"}
                      sx={{
                        color: like
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      }}
                    />
                  </IconButton>
                  <IconButton aria-label="comment">
                    <Iconify icon="ant-design:comment-outlined" />
                  </IconButton>
                  <IconButton
                    onClick={(event) => handleMenuClick(event, blog.blogId)}
                    aria-label="share"
                  >
                    <Iconify icon="mdi:share-outline" />
                  </IconButton>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/newsfeed/${blog.blogId}`);
                  }}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl?.target}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: { borderRadius: 8, minWidth: 200 },
        }}
      >
        <MenuItem onClick={() => handleCopyLink(anchorEl?.dataset?.blogId)}>
          <Iconify icon="tabler:copy" sx={{ marginRight: "8px" }} />
          Copy link
        </MenuItem>
        <MenuItem
          onClick={() => handleShare("twitter", anchorEl?.dataset?.blogId)}
        >
          <Iconify
            icon="ant-design:twitter-outlined"
            sx={{ marginRight: "8px" }}
          />
          Share on Twitter
        </MenuItem>
        <MenuItem
          onClick={() => handleShare("facebook", anchorEl?.dataset?.blogId)}
        >
          <Iconify icon="ic:twotone-facebook" sx={{ marginRight: "8px" }} />
          Share on Facebook
        </MenuItem>
        <MenuItem
          onClick={() => handleShare("linkedin", anchorEl?.dataset?.blogId)}
        >
          <Iconify icon="mingcute:linkedin-fill" sx={{ marginRight: "8px" }} />
          Share on LinkedIn
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbarOpen.status}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbarOpen({ status: false, text: "", severity: "" })
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
    </>
  );
}

export default NewsfeedCard;
