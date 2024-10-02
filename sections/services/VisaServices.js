"use client";
import Iconify from "@/components/Iconify";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ServiceRootStyle } from "./style";

export const SERVICES = [
  {
    id: 1,
    title: "Visa-related documents arrangement",
    description:
      "To process the visa, there’s a need for different documents. We support our candidates in arranging all the documents. There’re some documents students cannot manage, and we assist to manage those documents. As example, we help to ready financial declaration document, bank related documents, and many more which are needed to process visa.",
    icon: "mdi:passport",
  },
  {
    id: 2,
    title: "Documents Legalization support",
    description:
      "In some countries, you must legalize all your academic documents before processing your visa. We, Abroad Inquiry, help students legalize their educational documents from the Education Board, Education Ministry, Foreign Ministry, and consulate. Abroad Inquiry also helps candidates get a Police Clearance certificate for their needs.",
    icon: "ion:documents-sharp",
  },
  {
    id: 3,
    title: "VFS Appointment",
    description:
      "In most countries, you have to make a VFS/Embassy appointment to see the embassy. Students face a lot of trouble when making appointments. Without making a VFS appointment, students cannot get their visas. There’s a fee for the appointment; in some countries, there is no need for that. Students must make this payment, and we will make the VFS appointment.",
    icon: "teenyicons:appointments-outline",
  },
  {
    id: 4,
    title: "Indian visa-related support",
    description:
      "When a student is going to study in Belgium or Finland, they need to visit India to face the embassy. Because there’s no embassy of Finland and Belgium in Bangladesh. Most of the students are facing trouble getting an Indian visa. A small amount is needed to apply for an Indian visa. Students must pay us this amount, and we will apply for an Indian passport.",
    icon: "mdi:passport",
  },
  {
    id: 5,
    title: "Sponsor related guidelines",
    description:
      "In most countries except Belgium, Netherlands, and Denmark, students need to show sponsors to afford their accommodation fees. For example, students must show around 10 lac BDT for Finland in their bank statements. Some countries accept second blood, and some accept first blood. So, many sponsor-related documents needed to be shown along with the bank statement.",
    icon: "carbon:user-sponsor",
  },
  {
    id: 6,
    title: "Embassy interview guideline",
    description:
      "Every student needs to face the embassy. An interview is conducted by the embassy. Students feel nervous regarding this embassy appointment. In this segment, we support our candidates through our experience. We guide our students about the interview by letting them know related questions.",
    icon: "maki:embassy",
  },
  {
    id: 7,
    title: "Spouse/Dependent visa & Tourist visa",
    description:
      "Apart from the student visa, we also help the candidates by supporting them in getting their dependent visa and tourist visa. Some students want to go abroad with their spouses and other dependents. When a student with dependents gets their offer letter, we apply for the visa both for the candidate and his spouse.",
    icon: "mdi:account-multiple",
  },
];

export default function VisaServices() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <ServiceRootStyle>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 6 },
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
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                Visa Services
              </Typography>
            </AnimatedComponent>
          </Box>

          {!isMobile ? (
            <Timeline position="alternate">
              {SERVICES.map((step, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined">
                      <Iconify
                        icon={step.icon}
                        color="#FFF"
                        sx={{
                          bgcolor: "secondary.main",
                          width: 40,
                          height: 40,
                          m: "auto",
                          borderRadius: "50%",
                          p: 1,
                        }}
                      />
                    </TimelineDot>
                    {index < SERVICES.length - 1 && (
                      <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Card
                      sx={{
                        p: 3,
                        boxShadow: 4,
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, textAlign: "justify" }}
                      >
                        {step.description}
                      </Typography>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          ) : (
            <Grid container spacing={4}>
              {SERVICES.map((step, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ p: 3, boxShadow: 3 }}>
                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      alignItems="center"
                      mb={2}
                    >
                      <Iconify
                        icon={step.icon}
                        color="#FFF"
                        width={40}
                        height={40}
                        sx={{
                          bgcolor: "secondary.main",
                          borderRadius: "50%",
                          mr: 2,
                          p: 0.5,
                        }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        {step.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, textAlign: "justify" }}
                    >
                      {step.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </ServiceRootStyle>
    </>
  );
}
