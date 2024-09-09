import { m } from "framer-motion";
// @mui
import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import { MotionViewport, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  // maxWidth: 456,
  margin: "auto",
  overflow: "hidden",
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg, ${theme.palette.secondary.main} 10%, ${theme.palette.secondary.light} 100%)`,
  display: "flex",
  maxWidth: "100%",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  alignItems: "center",
  flexDirection: "column",
  // marginTop: theme.spacing(-10),
  marginBottom: theme.spacing(15),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("md")]: {},
}));

// ----------------------------------------------------------------------

export default function HomeExplore() {
  const matchesSm = useMediaQuery("(max-width:600px)");
  return (
    <Container component={MotionViewport} sx={{marginTop:matchesSm? "20px":"120px"}}>
      <ContentStyle>
        <Box
          component={m.div}
          variants={varFade().inDown}
          sx={{ color: "common.white", textAlign: "center" }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            Explore Universities & Programs
          </Typography>
        </Box>

        <m.div variants={varFade().inUp}>
          <Typography
            sx={{
              mx: "auto",
              maxWidth: 630,
              color: "common.white",
              mt: 2,
              mb: 4,
              textAlign: "center",
            }}
          >
            Discover global academic opportunities with detailed information on
            what to study, application deadlines, tuition fees, scholarships,
            language requirements, part-time job options, and more.
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Button
            size="large"
            variant="contained"
            sx={{
              whiteSpace: "nowrap",
              boxShadow: (theme) => theme.customShadows.z8,
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.common.white),
              bgcolor: "common.white",
              "&:hover": { bgcolor: "grey.300" },
              paddingX: 4,
              paddingY: 2,
            }}
          >
            Explore Now
          </Button>
        </m.div>
      </ContentStyle>
    </Container>
  );
}
