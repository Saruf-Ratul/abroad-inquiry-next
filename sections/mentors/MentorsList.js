"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Rating,
  Stack,
  TextField,
  Typography,
  styled,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";

import Iconify from "@/components/Iconify";
import InputStyle from "@/components/InputStyle";
import Label from "@/components/Label";
import cssStyles from "@/utils/cssStyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMentors } from "@/redux/features/mentor/mentorSlice";
import { BASE_URL } from "@/utils/axios";
import { useRouter } from "next/navigation";
import DataLoading from "@/components/DataLoading";
import { useTheme } from "@mui/material/styles";
import Cookies from "js-cookie";

const OverlayStyle = styled("div")(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: "95%",
  height: "100%",
  position: "absolute",
  borderRadius: "15px",
  margin: "7px 10px 10px 10px",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

export default function MentorsList() {
  const dispatch = useDispatch();
  const { mentors, loading } = useSelector((state) => state.mentors);
  const {userInfo} = useSelector((state)=>state.user);

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
          {/* <InputStyle
            stretchStart={240}
            placeholder="Find Mentors..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={"eva:search-fill"}
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 5 }}
          /> */}

          {loading ? (
            <DataLoading />
          ) : (
            <Grid container spacing={3}>
              {mentors.map((mentor) => (
                <Grid key={mentor.id} item xs={12} md={4}>
                  <FriendCard mentor={mentor} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}

function FriendCard({ mentor }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState("");
  const theme = useTheme();

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const { userInfo } = useSelector((state) => state.user);

  const router = useRouter();
  const token = Cookies.get("token");

  const handleMessageClick = (mentorId) => {
    if (token) {
      Cookies.remove("fcmToken");
      Cookies.remove("conversationId");
      router.push(`/dashboard/chat/${mentorId}`);
    } else {
      router.push("/auth/login");
    }
  };

  const handleAppointmentClick = (mentorId) => {
    if (token) {
      router.push(`/dashboard/appointmentBooking/${mentorId}`);
    } else {
      router.push("/auth/login");
    }
  };

  const handleFeedbackClick = () => {
    if (token) {
      setOpen(true);
    } else {
      router.push("/auth/login");
    }
  };

  const handleSubmitFeedBack = () => {
    setSnackbarOpen(true);
    setOpen(false);
  };

  return (
    <>
      <div>
        <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{mt:"32"}}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Feedback successful!
          </Alert>
        </Snackbar>
      </div>
      <Card>
        <Box
          sx={{ position: "relative" }}
          onClick={() => router.push(`/mentors/${mentor?.id}`)}
        >
          <Avatar
            alt={mentor.mentorName}
            src={`${BASE_URL}/${mentor.profilePic}`}
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

        <Box
          sx={{ ml: 3 }}
          onClick={() => router.push(`/mentors/${mentor.id}`)}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
            <Typography variant="subtitle1" sx={{ mt: 6 }}>
              {mentor.mentorName}
            </Typography>

            <Label variant="outlined" color="success" sx={{ mt: 6, mr: 4 }}>
              Active
            </Label>
          </Box>

          <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
            {mentor.mentoringFor}
          </Typography>
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          sx={{ mx: 3, my: 2 }}
        >
          <Button
            disabled={userInfo?.userStatus === "mentor"}
            onClick={()=> handleMessageClick(mentor.id)}
            variant="contained"
            startIcon={
              <Iconify icon={"tabler:message"} width={24} height={24} />
            }
          >
            Message
          </Button>
          <Stack justifyContent="center" direction="row">
            <Button
              disabled={userInfo?.userStatus === "mentor"}
              onClick={() => handleAppointmentClick(mentor.id)}
              variant="contained"
              startIcon={
                <Iconify
                  icon={"fluent-mdl2:date-time-mirrored"}
                  width={24}
                  height={24}
                />
              }
            >
              Appointment
            </Button>
          </Stack>
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
          <div>
            <Button
              disabled={userInfo?.userStatus === "mentor"}
              onClick={handleFeedbackClick}
              variant="outlined"
              color="error"
              size="small"
              endIcon={
                <Iconify icon={"carbon:review"} width={14} height={14} />
              }
              sx={{ fontSize: "12px" }}
            >
              Feedback
            </Button>
          </div>

          <div>
            <Rating name="simple-controlled" value={5} size="small" />
          </div>
        </Box>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, bgcolor: theme.palette.background.paper }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please Provide {mentor.mentorName} Mentoring Feedback
          </Typography>

          <Box sx={{ mt: 2 }}>
            <TextField
              id="outlined-multiline-static"
              label="Message"
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="demo-simple-select-label">Rating</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rating}
                label="Rating"
                onChange={handleChange}
              >
                <MenuItem value={1}>
                  <Box sx={{ display: "flex" }}>
                    1
                    <Rating name="size-small" value={1} sx={{ ml: 2 }} />
                  </Box>
                </MenuItem>
                <MenuItem value={2}>
                  <Box sx={{ display: "flex" }}>
                    3
                    <Rating name="size-small" value={3} sx={{ ml: 2 }} />
                  </Box>
                </MenuItem>
                <MenuItem value={3}>
                  <Box sx={{ display: "flex" }}>
                    3
                    <Rating name="size-small" value={3} sx={{ ml: 2 }} />
                  </Box>
                </MenuItem>
                <MenuItem value={4}>
                  <Box sx={{ display: "flex" }}>
                    4
                    <Rating name="size-small" value={4} sx={{ ml: 2 }} />
                  </Box>
                </MenuItem>
                <MenuItem value={5}>
                  <Box sx={{ display: "flex" }}>
                    5
                    <Rating name="size-small" value={5} sx={{ ml: 2 }} />
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              onClick={handleSubmitFeedBack}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              endIcon={
                <Iconify icon={"carbon:review"} width={14} height={14} />
              }
            >
              Submit Feedback
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
