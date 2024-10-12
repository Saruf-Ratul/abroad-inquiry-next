"use client";
import { MotionViewport, varFade } from "@/components/animate";
import { CarouselArrows } from "@/components/carousel";
import DataLoading from "@/components/DataLoading";
import Iconify from "@/components/Iconify";
import MentorCard from "@/components/mentor-card/MentorCard";
import { fetchMentors } from "@/redux/features/mentor/mentorSlice";
import cssStyles from "@/utils/cssStyles";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { m } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
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
                  <MentorCard mentor={mentor} />
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
