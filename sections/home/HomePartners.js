import { MotionViewport, varFade } from "@/components/animate";
import partners from "@/data/partners";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { m } from "framer-motion";
import Image from "next/image";
import Slider from "react-slick";

const RootStyle = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  marginTop: "40px",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(10),
  },
}));

const PartnerLogo = styled(Image)(({ theme }) => ({}));

const settings = {
  dots: false,
  arrows: false,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  slidesToShow: 4,
  autoplay: true,
  initialSlide: 0,
  infinite: true,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1279,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 400,
      settings: { slidesToShow: 2 },
    },
  ],
};

export default function HomePartners() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 10, md: 5 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography textAlign={"center"} variant="h3" sx={{ mb: 1 }}>
              Our Partners
            </Typography>
          </m.div>
        </Box>

        <Slider {...settings}>
          {partners.map((item, idx) => (
            <Box key={idx} mx={2}>
              <PartnerLogo
                src={item.img}
                sx={{
                  objectFit: "contain",
                  backgroundColor: "white",
                  boxShadow: "2px 2px 5px  rgba(0, 0, 0, 0.3)",
                  borderRadius: "12px",
                  paddingX: "20px",
                  width: { xs: 100, md: 150, lg: 200 },
                  height: { xs: 100, md: 150, lg: 120 },
                }}
                alt=""
              />
            </Box>
          ))}
        </Slider>
      </Container>
    </RootStyle>
  );
}
