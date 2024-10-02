import { backIn, color, m } from "framer-motion";
import { useRef, useState } from "react";
import Slider from "react-slick";
// @mui
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
  ButtonBase,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";

// components
import Iconify from "@/components/Iconify";
import {
  MotionContainer,
  MotionViewport,
  varBounce,
  varFade,
} from "@/components/animate";
import { CarouselArrows, CarouselDots } from "@/components/carousel";
import zIndex from "@mui/material/styles/zIndex";
import Image from "next/image";
import slide1 from "@/public/assets/banner-slide-imgs/slide-1.webp";
import slide2 from "@/public/assets/banner-slide-imgs/slide-2.webp";
import slide3 from "@/public/assets/banner-slide-imgs/slide-3.webp";
import slide4 from "@/public/assets/banner-slide-imgs/slide-4.webp";
import slide5 from "@/public/assets/banner-slide-imgs/slide-8.webp";
import slide6 from "@/public/assets/banner-slide-imgs/slide-6.webp";
import slide7 from "@/public/assets/banner-slide-imgs/slide-7.webp";
import testimonial from "@/public/assets/images/img/testimonial-bg.webp";
// import backgroundVideo from "@/public/assets/images/img/backgroundVideo.mp4";
import googlePlay from "@/public/assets/banner-slide-imgs/google-play-store.webp";
import appleStore from "@/public/assets/banner-slide-imgs/apple-app-store.webp";
import shape from "@/public/assets/images/img/shape-7.webp";

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up("md")]: {
    // top: 0,
    // left: 0,
    width: "100%",
    // height: "85vh",
    // display: "flex",
    // position: "fixed",
    // alignItems: "center",
  },
}));

// OverlayStyle with video background
const OverlayStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: "absolute",
  zIndex: 1,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor:"black",
  "& video": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    opacity:0.4
  },
}));

const HeroImgStyle = styled(Image)(({ theme }) => ({
  // width: "100%",
  // objectFit: "contain",
  [theme.breakpoints.up("lg")]: {},
}));

const _appFeatured = [
  {
    image: slide1,
    title: "A Whole World of Opportunities Awaits you",
    description: "Sign up for expore the opportuniteis",
    id: 1,
  },
  {
    image: slide2,
    title: "Explore Global Education Opportunities",
    description: "fua sd asd ck",
    id: 2,
  },
  {
    image: slide3,
    title: "Navigate Your Path to Overseas Study",
    description: "fua sd asd ck",
    id: 3,
  },
  {
    image: slide4,
    title: "Empowering Dreams, One Destination at a Time",
    description: "fua sd asd ck",
    id: 4,
  },
  {
    image: slide5,
    title: "Shape Your Future with International Education",
    description: "fua sd asd ck",
    id: 5,
  },
  {
    image: slide6,
    title: "Discover Your Dream Education Destination",
    description: "fua sd asd ck",
    id: 6,
  },
  {
    image: slide7,
    title: "Shape Your Future with World-Class Education",
    description: "fua sd asd ck",
    id: 7,
  },
];

const HeroOverlayStyle = styled(Image)({
  // zIndex: 9,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const FlyImg = styled(Image)({
  objectFit: "fill",
  position: "absolute",
  right: 0,
  bottom: 0,
});

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    fade: true,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      color: "secondary.main",
      position: "absolute",
      bottom: -20,
      right: { xs: "35%", md: "40%" },
    }),
  };

  return (
    <MotionContainer>
      <RootStyle>
        <OverlayStyle>
          <video autoPlay muted loop>
          <source src="/assets/images/img/backgroundVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </OverlayStyle>
        <Container
          sx={{
            position: "relative",
            zIndex: 2, // Ensure the content is above the video
            py: theme.spacing(10),
          }}
          component={MotionViewport}
        >
          <Grid
            container
            spacing={{ sm: 0, md: 3 }}
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <Grid item xs={8} md={7}>
              <Box component={m.div} pb={2} variants={varFade().inRight}>
                <Typography variant="h3" sx={{ color: "common.white" }}>
                  A Whole World of
                  <Typography
                    component="span"
                    variant="h3"
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
                      title:
                        "Receive personalized guidance from experienced mentors",
                      icon: "tabler:user-search",
                    },
                    {
                      title: "Book appointments for expert advice",
                      icon: "fluent:calendar-16-regular",
                    },
                    {
                      title:
                        "Stay updated on application statuses and deadlines",
                      icon: "akar-icons:bell",
                    },
                  ].map((itm, i) => (
                    <m.div key={i} variants={varFade().inRight}>
                      <Stack
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        key={i}
                      >
                        <Stack width={20} px={1}>
                          <Iconify
                            icon={itm.icon}
                            color="secondary.main"
                            sx={{ width: 25, height: 25 }}
                          />
                        </Stack>
                        <Typography
                          sx={{
                            mx: "auto",
                            maxWidth: 630,
                            color: "common.white",
                          }}
                        >
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
                  justifyContent={"flex-start"}
                >
                  <ButtonBase
                    onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.abroadinquiry.app",
                        "_blank"
                      )
                    }
                  >
                    <m.img variants={varFade().inRight} src={googlePlay.src} />
                  </ButtonBase>

                  <ButtonBase
                    onClick={() =>
                      window.open(
                        "https://apps.apple.com/app/abroad-inquiry/id1664679066",
                        "_blank"
                      )
                    }
                  >
                    <m.img variants={varFade().inRight} src={appleStore.src} />
                  </ButtonBase>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5} sx={{ marginTop: "100px" }}>
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

        <FlyImg src={shape} alt="" width={300} height={250} style={{zIndex:"2"}}/>
      </RootStyle>
    </MotionContainer>
  );
}

// ----------------------------------------------------------------------

function CarouselItem({ item, isActive }) {
  const { image } = item;

  return (
    <Stack
      sx={{
        height: "75vh",
      }}
      alignItems="center"
    >
      <HeroImgStyle
        alt={""}
        width={400}
        height={800}
        src={image}
        sx={{
          width: "auto",
          height: "100%",
          // width: { xs: "auto", md: "auto" },
          // height: { xs: 600, md: 800 },
        }}
      />
    </Stack>
  );
}
