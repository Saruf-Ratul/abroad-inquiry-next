"use client";
import DataLoading from "@/components/DataLoading";
import Iconify from "@/components/Iconify";
import { MotionViewport, varFade } from "@/components/animate";
import { CarouselArrows } from "@/components/carousel";
import pattern from "@/public/assets/images/patterns/pattern-2.png";
import { fetchCountries } from "@/redux/features/country/countrySlice";
import { BASE_URL } from "@/utils/axios";
import cssStyles from "@/utils/cssStyles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { m } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: "relative",
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.dark} 0%,
    ${theme.palette.primary.light} 100%)`,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(15, 0),
  },
}));

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 0.2, color: theme.palette.grey[900] }),
  bottom: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  // position: "absolute",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

export default function HomeCountries() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.countries);
  const carouselRef = useRef(null);
  const theme = useTheme();
  const settings = {
    arrows: false,
    slidesToShow: 3,
    centerMode: true,
    autoplay: true,
    infinite: true,
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

  useEffect(() => {
    dispatch(fetchCountries(1));
  }, [dispatch]);

  return (
    <RootStyle>
      <Container component={MotionViewport} sx={{ textAlign: "center" }}>
        <m.div variants={varFade().inDown}>
          <Typography
            component="p"
            variant="overline"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            Choose Country
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography variant="h3" sx={{ mb: 3, color: "common.white" }}>
            Popular place to Study abroad
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography
            sx={{
              mx: "auto",
              maxWidth: 630,
              color: "common.white",
            }}
          >
            You can select each country and learn the basic information, such as
            what to study, application deadlines, tuition fees and all other
            fees, scholarships, language requirements, part-time job etc.
          </Typography>
        </m.div>

        {loading ? (
          <DataLoading />
        ) : (
          <Box sx={{ position: "relative" }}>
            <CarouselArrows
              filled
              onNext={handleNext}
              onPrevious={handlePrevious}
            >
              <Slider ref={carouselRef} {...settings}>
                {countries.map((country) => (
                  <Box
                    key={country.id}
                    component={m.div}
                    variants={varFade().in}
                    sx={{ px: 1.5, py: 10 }}
                  >
                    <CountryCard country={country} />
                  </Box>
                ))}
              </Slider>
            </CarouselArrows>
          </Box>
        )}

        <Button
          onClick={() => router.push("/countries")}
          size="large"
          variant="outlined"
          target="_blank"
          color="secondary"
          rel="noopener"
          endIcon={
            <Iconify icon={"ic:round-arrow-right-alt"} width={24} height={24} />
          }
          sx={{
            whiteSpace: "nowrap",
            boxShadow: (theme) => theme.customShadows.z8,
          }}
        >
          View All Countries
        </Button>
      </Container>
      <Image
        src={pattern}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          objectFit: "",
          // height: 400,
          // width: 400,
        }}
      />
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

function CountryCard({ country }) {
  return (
    <Card sx={{ cursor: "pointer", position: "relative" }}>
      <Image
        alt="gallery image"
        src={`${BASE_URL}/${country.countryImage}`}
        width={400}
        height={250}
        style={{ width: "100%", objectFit: "cover", scale: 1.5 }}
      />

      <CaptionStyle>
        <Avatar
          src={`https://flagcdn.com/w80/${country.countryCode}.png`}
          srcset="https://flagcdn.com/w40/za.png 2x"
          sx={{
            marginRight: "15px",
            width: "50px",
            height: "50px",
          }}
        />
        <Typography variant="h5" mt={1}>
          {country.countryName}
        </Typography>
      </CaptionStyle>
    </Card>
  );
}
