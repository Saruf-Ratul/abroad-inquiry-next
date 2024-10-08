import { m } from "framer-motion";
import { useRef, useState } from "react";
import Slider from "react-slick";
// @mui
import Iconify from "@/components/Iconify";
import { MotionViewport, varFade } from "@/components/animate";
import { CarouselDots } from "@/components/carousel";
import {
  Box,
  ButtonBase,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";

// Importing images
import appleStore from "@/public/assets/banner-slide-imgs/apple-app-store.webp";
import googlePlay from "@/public/assets/banner-slide-imgs/google-play-store.webp";
import slide1 from "@/public/assets/banner-slide-imgs/slide-1.webp";
import slide2 from "@/public/assets/banner-slide-imgs/slide-2.webp";
import slide3 from "@/public/assets/banner-slide-imgs/slide-3.webp";
import slide4 from "@/public/assets/banner-slide-imgs/slide-4.webp";
import slide6 from "@/public/assets/banner-slide-imgs/slide-6.webp";
import slide7 from "@/public/assets/banner-slide-imgs/slide-7.webp";
import slide5 from "@/public/assets/banner-slide-imgs/slide-8.webp";
import shape from "@/public/assets/images/img/shape-7.webp";
import { bgBlur } from "@/theme/css";

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up("md")]: {
    width: "100%",
  },
}));

const OverlayStyle = styled("div")({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: "absolute",
  zIndex: 1,
  backgroundColor: "black",
  "& video": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    opacity: 0.4,
  },
});

const HeroImgStyle = styled(Image)({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const FlyImg = styled(Image)({
  objectFit: "fill",
  position: "absolute",
  right: 0,
  bottom: 0,
  height: 200,
  width: 240,
});

const StyledPolygon = styled("div")(
  ({ opacity = 1, anchor = "left", theme }) => ({
    ...bgBlur({
      opacity,
      color: theme.palette.background.default,
    }),
    zIndex: 9,
    bottom: 0,
    height: 80,
    width: "50%",
    position: "absolute",
    clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
    ...(anchor === "left" && {
      left: 0,
    }),
    ...(anchor === "right" && {
      right: 0,
      transform: "scaleX(-1)",
    }),
  })
);

const _appFeatured = [
  { image: slide1, title: "A Whole World of Opportunities", id: 1 },
  { image: slide2, title: "Explore Global Education", id: 2 },
  { image: slide3, title: "Navigate Your Path", id: 3 },
  { image: slide4, title: "Empowering Dreams", id: 4 },
  { image: slide5, title: "Shape Your Future", id: 5 },
  { image: slide6, title: "Discover Dream Education", id: 6 },
  { image: slide7, title: "Shape Your Future", id: 7 },
];

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    centerMode: true,
    infinite: true,
    pauseOnHover: false,
    slidesToShow: 1,
    centerPadding: isMobile ? "30px" : "215px",
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      color: "secondary.main",
      position: "absolute",
      bottom: isMobile ? 10 : 80,
      right: { xs: "35%", md: "40%" },
    }),
  };

  return (
    <RootStyle>
      <OverlayStyle>
        <video autoPlay muted loop>
          <source
            src="/assets/images/img/backgroundVideo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </OverlayStyle>

      <Container
        sx={{ position: "relative", zIndex: 2, py: theme.spacing(10) }}
        component={MotionViewport}
      >
        <Grid
          container
          spacing={{ xs: 0, md: 3 }}
          alignItems="center"
          justifyContent="center"
        >
          {/* Left Content */}
          <Grid item xs={12} md={5}>
            <Box component={m.div} pb={2} variants={varFade().inRight}>
              <Typography variant="h2" sx={{ color: "common.white" }}>
                A Whole World of
                <Typography
                  component="span"
                  variant="h2"
                  sx={{ color: "secondary.main", ml: 1 }}
                >
                  Opportunities
                </Typography>
                <br /> Awaits you
              </Typography>
            </Box>

            <Stack spacing={2.5}>
              <Stack my={3} spacing={2} textAlign="left">
                {[
                  {
                    title: "Explore global education opportunities",
                    icon: "ion:earth-outline",
                  },
                  {
                    title: "Receive personalized guidance",
                    icon: "tabler:user-search",
                  },
                  {
                    title: "Book appointments for expert advice",
                    icon: "fluent:calendar-16-regular",
                  },
                  {
                    title: "Stay updated on application statuses",
                    icon: "akar-icons:bell",
                  },
                ].map((itm, i) => (
                  <m.div key={i} variants={varFade().inRight}>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Stack width={20} px={1}>
                        <Iconify
                          icon={itm.icon}
                          color="secondary.main"
                          sx={{ width: 25, height: 25 }}
                        />
                      </Stack>
                      <Typography sx={{ color: "common.white" }}>
                        {itm.title}
                      </Typography>
                    </Stack>
                  </m.div>
                ))}
              </Stack>

              <m.div variants={varFade().inRight}>
                <Typography
                  variant="overline"
                  sx={{ color: "secondary.light" }}
                >
                  App Available For
                </Typography>
              </m.div>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{ pb: { xs: 0, md: 10 } }}
              >
                <ButtonBase
                  onClick={() =>
                    window.open("https://play.google.com", "_blank")
                  }
                >
                  <m.img variants={varFade().inRight} src={googlePlay.src} />
                </ButtonBase>

                <ButtonBase
                  onClick={() =>
                    window.open("https://apps.apple.com", "_blank")
                  }
                >
                  <m.img variants={varFade().inRight} src={appleStore.src} />
                </ButtonBase>
              </Stack>
            </Stack>
          </Grid>

          {/* Carousel Section */}
          <Grid item xs={12} md={7} sx={{ marginTop: { xs: 5, md: 0 } }}>
            <Box component={m.div} variants={varFade().inLeft}>
              <Slider ref={carouselRef} {...settings}>
                {_appFeatured.map((app, index) => (
                  <CarouselItem
                    key={app.id}
                    item={app}
                    isActive={index === currentIndex}
                  />
                ))}
              </Slider>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <FlyImg
        src={shape}
        alt=""
        width={550}
        height={500}
        style={{ zIndex: 2 }}
      />

      {renderPolygons}
    </RootStyle>
  );
}

const renderPolygons = (
  <>
    <StyledPolygon />
    <StyledPolygon anchor="right" opacity={0.48} />
    <StyledPolygon
      anchor="right"
      opacity={0.48}
      sx={{ height: 48, zIndex: 10 }}
    />
    <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
  </>
);

// Carousel Item Component
function CarouselItem({ item, isActive }) {
  return (
    <Stack
      sx={{
        height: { xs: "80vh", md: "100vh" },
        position: "relative",
        transform: isActive ? "scale(1.2)" : "scale(0.9)", // Scale non-active slides
        zIndex: isActive ? 2 : 1,
        transition: "transform 0.5s ease, z-index 0.5s ease",
      }}
      alignItems="center"
    >
      <HeroImgStyle
        alt={item.title}
        width={800}
        height={800}
        src={item.image}
      />
    </Stack>
  );
}
