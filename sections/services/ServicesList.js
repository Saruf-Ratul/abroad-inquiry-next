// @mui
import { Box, Container, Stack, Typography } from "@mui/material";
// components
import Iconify from "@/components/Iconify";
import { MotionContainer } from "@/components/animate";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import { CardStyle, ServiceRootStyle } from "./style";

// ----------------------------------------------------------------------

export const SERVICES = [
  {
    id: 1,
    title: "Free Counseling",
    description:
      "Get comprehensive guidance and information for your desired country from expert mentors",
    icon: "fluent:video-person-call-32-regular",
  },
  {
    id: 2,
    title: "Admission",
    description:
      "Apply for admission and visa with our assistance after meeting your mentor",
    icon: "carbon:education",
  },
  {
    id: 3,
    title: "Visa Services",
    description:
      "Awarded scholars guide you through applying for scholarships, admission, and visas",
    icon: "mdi:passport",
  },
  {
    id: 6,
    title: "After Visa Services",
    description:
      "Buy domestic and international air tickets at competitive prices from Abroad Tickets",
    icon: "icon-park-twotone:in-flight",
  },
];

const wordLimit = 5;

function truncateText(text, wordLimit) {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
}


export default function ServicesList() {
  // const isLight = theme.palette.mode === "light";

  return (
    <ServiceRootStyle>
      <Container maxWidth="xl" component={MotionContainer}>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 10, md: 15 },
          }}
        >
          <AnimatedComponent animationType="inUp">
            <Typography
              component="div"
              variant="overline"
              sx={{ mb: 2, color: "text.disabled" }}
            >
              Services
            </Typography>
          </AnimatedComponent>
          <AnimatedComponent animationType="inDown">
            <Typography variant="h2">What we do?</Typography>
          </AnimatedComponent>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, lg: 7 },
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {SERVICES.map((card, index) => (
            <AnimatedComponent animationType={"inUp"} key={card.title}>
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
                <Typography >{truncateText(card.description, wordLimit)}</Typography>
              </CardStyle>
            </AnimatedComponent>
          ))}
        </Box>
      </Container>
    </ServiceRootStyle>
  );
}
