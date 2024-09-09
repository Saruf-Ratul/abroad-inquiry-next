import { m } from "framer-motion";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Iconify from "@/components/Iconify";
import { MotionViewport, varFade } from "@/components/animate";
import { useRouter } from "next/navigation";


export const SERVICES = [
  {
    id: 1,
    title: "Online Guidance",
    description:
      "Get comprehensive guidance and information for your desired country from expert mentors",
    icon: "fluent:video-person-call-32-regular",
  },
  {
    id: 2,
    title: "Admission and Visa",
    description:
      "Apply for admission and visa with our assistance after meeting your mentor",
    icon: "mdi:passport",
  },
  {
    id: 3,
    title: "Scholorship and Visa",
    description:
      "Awarded scholars guide you through applying for scholarships, admission, and visas",
    icon: "carbon:education",
  },
  {
    id: 4,
    title: "Spouse/Dependent Visa",
    description:
      "We assist students in applying for dependent visas, enabling them to bring their family..",
    icon: "ic:round-family-restroom",
  },
  {
    id: 5,
    title: "Documents Legalization",
    description:
      "Legalize your documents quickly with our Notary Public attestation services",
    icon: "fluent:document-checkmark-16-regular",
  },
  {
    id: 6,
    title: "Ticket Service",
    description:
      "Buy domestic and international air tickets at competitive prices from Abroad Tickets",
    icon: "icon-park-twotone:in-flight",
  },
];

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(6, 4, 6),
    boxShadow: `-10px 10px 20px 0 ${shadowCard(0.4)}`,
  };
});

// ----------------------------------------------------------------------

export default function HomeServices() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const route = useRouter();

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 10, md: 15 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography
              component="div"
              variant="overline"
              sx={{ mb: 2, color: "text.disabled" }}
            >
              Services
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography variant="h3">What we do?</Typography>
          </m.div>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, lg: 7 },
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
          }}
        >
          {SERVICES.map((card, index) => (
            <m.div 
            variants={varFade().inUp} 
            key={card.title}
            onClick={()=>route.push("/services")}
            >
              <CardStyle>
                <Stack
                  sx={{
                    bgcolor: "secondary.main",
                    display: "flex",
                    width: 60,
                    height: 60,
                    m: "auto",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Iconify
                    icon={card.icon}
                    color="#FFFF"
                    sx={{
                      mx: "auto",
                      width: 30,
                      height: 30,
                    }}
                  />
                </Stack>
                <Typography variant="h5" paragraph color={"secodary.main"}>
                  {card.title}
                </Typography>
                <Typography
                  textAlign={"center"}
                  sx={{ color: isLight ? "text.secondary" : "common.white" }}
                >
                  {card.description}
                </Typography>
              </CardStyle>
            </m.div>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
