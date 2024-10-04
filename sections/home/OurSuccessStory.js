"use client";
import VisaSuccessCard from "@/components/VisaSuccessCard";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRef } from "react";
import Slider from "react-slick";
import { visaSuccessData } from "../../data/visaSuccess";

const settings = {
  dots: false,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  infinite: true,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function OurSuccessStory() {
  const sliderRef = useRef();
  const matchesXs = useMediaQuery("(max-width: 600px)");

  const gotoNext = () => sliderRef.current.slickNext();
  const gotoPrev = () => sliderRef.current.slickPrev();

  return (
    <Box position="relative">
      <Container>
        <Box py={5}>
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              textAlign: "center",
            }}
          >
            OUR SUCCESS STORY
          </Typography>

          <Slider {...settings} ref={sliderRef} style={{ marginTop: "-20px" }}>
            {visaSuccessData.map((data, idx) => (
              <VisaSuccessCard key={idx} data={data} />
            ))}
          </Slider>
        </Box>
      </Container>

      <Container sx={{ marginTop: "30px" }}>
        <Stack>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              textAlign: "center",
              mb: 3,
            }}
          >
            WHAT OUR STUDENTS SAY?
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            marginTop: "20px",
            mb: { xs: 10, md: 0 },
            flexDirection: matchesXs ? "column" : "row",
          }}
        >
          {["Axi6t1IBjUU", "tKxBD0SRl4A", "jQdV74fH3YY", "lWSgfYgoHgQ"].map(
            (videoId, idx) => (
              <iframe
                key={idx}
                style={{
                  borderRadius: "10px",
                }}
                width={matchesXs ? "100%" : "275px"}
                height={matchesXs ? "auto" : "220px"}
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default OurSuccessStory;
