"use client";
import { m } from "framer-motion";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Slider from "react-slick";
// @mui
import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";

// components
import { MotionContainer, varFade } from "@/components/animate";
import { CarouselArrows, CarouselDots } from "@/components/carousel";
import Image from "next/image";

// ----------------------------------------------------------------------

const OverlayStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

const _appFeatured = [
  {
    countryId: 1,
    countryName: "Belgium",
    countryImage: "uploads/country/BELGIUM.jpg",
    countryCode: "be",
  },
  {
    countryId: 2,
    countryName: "Canada",
    countryImage: "uploads/country/CANADA.jpg",
    countryCode: "ca",
  },
  {
    countryId: 3,
    countryName: "Denmark",
    countryImage: "uploads/country/DENMARK.jpg",
    countryCode: "dk",
  },
  {
    countryId: 4,
    countryName: "Germany",
    countryImage: "uploads/country/GERMANY.jpg",
    countryCode: "de",
  },
  {
    countryId: 5,
    countryName: "Norway",
    countryImage: "uploads/country/NORWAY.jpg",
    countryCode: "no",
  },
  {
    countryId: 6,
    countryName: "Sweden",
    countryImage: "uploads/country/SWEDEN.jpg",
    countryCode: "se",
  },
  {
    countryId: 7,
    countryName: "Finland",
    countryImage: "uploads/country/FINLAND.jpg",
    countryCode: "fi",
  },
  {
    countryId: 8,
    countryName: "Netherlands",
    countryImage: "uploads/country/Netherlands.jpg",
    countryCode: "nl",
  },
  {
    countryId: 9,
    countryName: "UK",
    countryImage: "uploads/country/UK.jpg",
    countryCode: "gb",
  },
  {
    countryId: 10,
    countryName: "USA",
    countryImage: "uploads/country/USA.jpg",
    countryCode: "us",
  },
];

export default function Countries() {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === "rtl" ? _appFeatured.length - 1 : 0
  );

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === "rtl"),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      zIndex: 9,
      top: 24,
      left: 24,
      position: "absolute",
    }),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {_appFeatured.map((app, index) => (
          <CarouselItem
            key={app.countryId}
            item={app}
            isActive={index === currentIndex}
          />
        ))}
      </Slider>

      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrevious}
        spacing={0}
        sx={{
          top: 16,
          right: 16,
          position: "absolute",
          "& .arrow": {
            p: 0,
            width: 32,
            height: 32,
            opacity: 0.48,
            color: "common.white",
            "&:hover": { color: "common.white", opacity: 1 },
          },
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

function CarouselItem({ item, isActive }) {
  const { countryImage, countryName } = item;

  return (
    <Box sx={{ position: "relative" }}>
      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          bottom: 0,
          width: 1,
          zIndex: 9,
          textAlign: "left",
          position: "absolute",
          color: "common.white",
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography
            variant="overline"
            component="div"
            sx={{ mb: 1, opacity: 0.48 }}
          >
            Featured Countries
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Link color="inherit" underline="none">
            <Typography variant="h5" gutterBottom noWrap>
              {countryName}
            </Typography>
          </Link>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {`${countryName}  is a popular place for study.`}
          </Typography>
        </m.div>
      </CardContent>
      <OverlayStyle />
      <Image
        alt="gallery image"
        src={`${"https://server.abroadinquiry.com:8443"}/${countryImage}`}
        width={800}
        height={400}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: 1,
        }}
      />
    </Box>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.shape({
    countryImage: PropTypes.string.isRequired,
    countryName: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};
