"use client";
import VisaSuccessCard from "@/components/VisaSuccessCard";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useRef } from "react";
import Slider from "react-slick";
import { visaSuccessData } from "../../data/visaSuccess";

var settings = {
  dots: false,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  initialSlide: 0,
  infinite: true,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

/**
 * Service pages
 * @memberof module:service
 * @type {React.Component}
 * @returns {JSX.Element}
 */
function OurSuccessStory() {
  const sliderRef = useRef();
  const matchesSm = useMediaQuery("(max-width:400px)");

  const gotoNext = () => {
    sliderRef.current.slickNext();
  };

  const gotoPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      <Box position="relative">
        <Container>
          <Box py={5}>
            <Box>
              <Typography variant="h3" sx={{ mb: 3 }}>
                OUR SUCCESS STORY
              </Typography>
            </Box>

            <Slider
              {...settings}
              ref={sliderRef}
              style={{
                marginTop: "-20px",
              }}
            >
              {visaSuccessData.map((data, idx) => (
                <VisaSuccessCard key={idx} data={data} />
              ))}
            </Slider>
          </Box>
        </Container>
        <Container sx={{ marginTop: "30px" }}>
          <Stack>
            <Typography variant="h3">WHAT OUR STUDENTS SAY?</Typography>
          </Stack>

          <div>
            <div
              className="container"
              style={{
                paddingBottom: matchesSm ? "340%" : "22.25%",
                height: 0,
                overflow: "hidden",
                maxWidth: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <iframe
                style={{ marginTop: "20px", borderRadius: "10px" }}
                width={matchesSm ? "515" : "275"}
                height={matchesSm ? "280" : "220"}
                src="https://www.youtube.com/embed/Axi6t1IBjUU?si=RwSEPPmlp5SANwVJ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              <iframe
                style={{ marginTop: "20px", borderRadius: "10px" }}
                width={matchesSm ? "515" : "275"}
                height={matchesSm ? "280" : "220"}
                src="https://www.youtube.com/embed/tKxBD0SRl4A?si=tQve4quztKoiVwJe"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              <iframe
                style={{ marginTop: "20px", borderRadius: "10px" }}
                width={matchesSm ? "515" : "275"}
                height={matchesSm ? "280" : "220"}
                src="https://www.youtube.com/embed/jQdV74fH3YY?si=XmgzC2C-RBFiPFl8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              <iframe
                style={{ marginTop: "20px", borderRadius: "10px" }}
                width={matchesSm ? "515" : "275"}
                height={matchesSm ? "280" : "220"}
                src="https://www.youtube.com/embed/lWSgfYgoHgQ?si=49MFkyQuwBNASqCr"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </Container>
      </Box>
    </>
  );
}

export default OurSuccessStory;
