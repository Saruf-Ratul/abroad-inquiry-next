"use client";
import { MotionViewport, varFade } from "@/components/animate";
import { CarouselArrows } from "@/components/carousel";
import DataLoading from "@/components/DataLoading";
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import { fetchMentors } from "@/redux/features/mentor/mentorSlice";
import { BASE_URL } from "@/utils/axios";
import cssStyles from "@/utils/cssStyles";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Rating,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { m } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

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

export default function HomeMentorList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mentors, loading } = useSelector((state) => state.mentors);

  useEffect(() => {
    dispatch(fetchMentors(1));
  }, [dispatch]);

  const carouselRef = useRef(null);

  const theme = useTheme();

  const settings = {
    arrows: false,
    slidesToShow: 3,
    speed: 2000,
    autoplaySpeed: 2000,
    autoplay: true,
    centerMode: true,
    centerPadding: "0px",
    rtl: Boolean(theme.direction === "rtl"),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container
      component={MotionViewport}
      sx={{ pb: 10, mt: { xs: 10, md: 0 }, textAlign: "center" }}
    >
      <m.div variants={varFade().inDown}>
        <Typography
          component="p"
          variant="overline"
          sx={{ mb: 2, color: "text.secondary" }}
        >
          Our Mentors
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Connect with Expert Mentors
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: "auto",
            maxWidth: 630,
            color: (theme) =>
              theme.palette.mode === "light"
                ? "text.secondary"
                : "common.white",
          }}
        >
          Our mentors are here to support you on your academic journey. Schedule
          appointments for personalized guidance or start a chat to discuss your
          study abroad plans. Get tailored advice from experienced professionals
          to navigate your educational path with confidence.
        </Typography>
      </m.div>

      <Box sx={{ position: "relative" }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          {loading ? (
            <DataLoading />
          ) : (
            <Slider ref={carouselRef} {...settings}>
              {mentors.map((mentor) => (
                <Box
                  key={mentor.id}
                  component={m.div}
                  // variants={varFade().in}
                  sx={{ px: 1.5, py: 10 }}
                >
                  <MemberCard mentor={mentor} />
                </Box>
              ))}
            </Slider>
          )}
        </CarouselArrows>
      </Box>
      <Button
        variant="outlined"
        color="inherit"
        size="large"
        endIcon={
          <Iconify icon={"ic:round-arrow-right-alt"} width={24} height={24} />
        }
        sx={{ mx: "auto" }}
        onClick={() => router.push("/mentors")}
      >
        View all Mentors
      </Button>
    </Container>
  );
}

// ----------------------------------------------------------------------

function MemberCard({ mentor }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState("");
  const theme = useTheme();

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const router = useRouter();
  const token = Cookies.get("token");
  const { userInfo } = useSelector((state) => state.user);

  const handleMessageClick = (mentorId) => {
    if (token) {
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
  return (
    <>
      <Card>
        <Box sx={{ position: "relative" }}>
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
              // position: "absolute",
            }}
          />
          <OverlayStyle />
          {/* 
            <Image src={cover} alt={cover} ratio="16/9" /> */}
        </Box>

        <Box>
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
            onClick={() => handleMessageClick(mentor.id)}
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
              Appoinment
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
            <Rating
              name="simple-controlled"
              value={5}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
              size="small"
            />
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
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>

            <Button
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
