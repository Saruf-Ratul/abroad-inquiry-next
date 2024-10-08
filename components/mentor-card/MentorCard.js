import { BASE_URL } from "@/utils/axios";
import cssStyles from "@/utils/cssStyles";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Rating,
  Select,
  Snackbar,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Iconify from "../Iconify";
import Label from "../Label";

// Styled overlay for card blur effect
const OverlayStyle = styled("div")(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  position: "absolute",
  width: "95%",
  height: "100%",
  borderRadius: "15px",
  margin: "7px 10px 10px 10px",
}));

function MentorCard({ mentor }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState("");
  const theme = useTheme();
  const router = useRouter();
  const token = Cookies.get("token");
  const { userInfo } = useSelector((state) => state.user);

  // Routing and token validation
  const handleAuthRedirect = useCallback(
    (path) => {
      token ? router.push(path) : router.push("/auth/login");
    },
    [token, router]
  );

  // Event Handlers
  const handleFeedbackClick = () => setOpen(true);
  //handleAuthRedirect(`/dashboard/feedback/${mentor.id}`);
  const handleAppointmentClick = () =>
    handleAuthRedirect(`/dashboard/appointmentBooking/${mentor.id}`);
  const handleMessageClick = () =>
    handleAuthRedirect(`/dashboard/message/mentor/${mentor.id}`);
  const handleSubmitFeedback = () => {
    setSnackbarOpen(true);
    setOpen(false);
  };
  const handleModalClose = () => setOpen(false);

  return (
    <>
      {/* Snackbar for feedback confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Feedback submitted!
        </Alert>
      </Snackbar>

      {/* Mentor Card */}
      <Card>
        <Box
          sx={{ position: "relative", cursor: "pointer" }}
          onClick={() => router.push(`/mentors/${mentor.id}`)}
        >
          <Avatar
            alt={mentor.mentorName}
            src={`${BASE_URL}/${mentor.profilePic || mentor.mentorProfilePic}`}
            sx={{
              width: 76,
              height: 76,
              zIndex: 11,
              bottom: -32,
              ml: 4,
              border: "4px solid white",
            }}
          />
          <OverlayStyle />
        </Box>

        <Box sx={{ ml: 3 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ m: 1 }}>
            <Typography variant="subtitle1" sx={{ mt: 6 }}>
              {mentor.mentorName}
            </Typography>
            <Label variant="outlined" color="success" sx={{ mt: 6, mr: 4 }}>
              Active
            </Label>
          </Stack>

          <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
            {mentor.mentoringFor}
          </Typography>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mx: 3, my: 2 }}
        >
          <Button
            size="small"
            disabled={userInfo?.userStatus === "mentor"}
            onClick={handleMessageClick}
            variant="contained"
            startIcon={<Iconify icon="tabler:message" width={24} height={24} />}
          >
            Message
          </Button>
          <Button
            size="small"
            disabled={userInfo?.userStatus === "mentor"}
            onClick={handleAppointmentClick}
            variant="contained"
            startIcon={
              <Iconify
                icon="fluent-mdl2:date-time-mirrored"
                width={24}
                height={24}
              />
            }
          >
            Appointment
          </Button>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box
          sx={{
            py: 2,
            px: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            disabled={userInfo?.userStatus === "mentor"}
            onClick={handleFeedbackClick}
            variant="outlined"
            color="error"
            size="small"
            endIcon={<Iconify icon="carbon:review" width={14} height={14} />}
            sx={{ fontSize: "12px" }}
          >
            Feedback
          </Button>
          <Rating name="mentor-rating" value={5} size="small" />
        </Box>
      </Card>

      {/* Feedback Modal */}
      <Modal open={open} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.palette.background.paper,
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
          }}
        >
          <Typography variant="h6">
            Please Provide Feedback for {mentor.mentorName}
          </Typography>
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              label="Rating"
              onChange={(e) => setRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <MenuItem key={value} value={value}>
                  <Rating value={value} readOnly size="small" />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={handleSubmitFeedback}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            endIcon={<Iconify icon="carbon:review" width={14} height={14} />}
          >
            Submit Feedback
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default MentorCard;
