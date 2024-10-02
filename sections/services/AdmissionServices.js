"use client";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import Iconify from "@/components/Iconify";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
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

const steps = [
  {
    id: 1,
    title: "Documents Arrangement",
    description:
      "We, Abroad Inquiry, firstly take all academic certificates and transcripts, Passport copies, IELTS certificates, one passport-size photo, two Recommendation letters (for master’s mainly), a Job experience letter (if needed), and any additional necessary documents. Then, we make a European-standard CV for the candidate. We arrange all the documents professionally according to how the Universities want them.",
    icon: "mdi:file-document-outline",
  },
  {
    id: 2,
    title: "Motivation letter",
    description:
      "Motivation letter is one of the essential factors to get an offer letter. We have expert SOP writers who work all day long for the motivation letter. At the very beginning, we send a motivation guideline to the students and guide them regarding the motivation letter. We also provide samples to the candidates for reference. When they send us the draft file, our experts work on that motivation letter to finalize it and make it a standard one.",
    icon: "iconoir:page-edit",
  },
  {
    id: 3,
    title: "University Application",
    description:
      "When all the documents, CVs, and motivation letters are ready, we consult with candidates and choose universities based on concerns from both parties. Universities are selected after reviewing academic requirements and matching them to the candidate's profile. If everything is in order, we apply to universities on behalf of the student.",
    icon: "mdi:school-outline",
  },
  {
    id: 4,
    title: "Interview Guidelines",
    description:
      "After submitting all documents, if the university thinks they are appropriate and meet admission requirements, they arrange an interview. We guide the students regarding the interview, including what questions they might be asked, and provide tips to help them prepare and pass the interview successfully.",
    icon: "streamline:group-meeting-call",
  },
  {
    id: 5,
    title: "Exam & Assignment Support",
    description:
      "In some countries, like Finland, entrance exams and assignments are required instead of interviews for assessment. We help our candidates before they attend the entrance exam and assist in completing assignments as part of the university assessment process.",
    icon: "mdi:clipboard-list-outline",
  },
  {
    id: 6,
    title: "Communication with Universities",
    description:
      "Maintaining communications with universities is crucial. On behalf of students, we ensure all communications with universities are handled smoothly, such as clarifying queries, extending tuition fee payment deadlines, and resolving any issues that arise during the admission process.",
    icon: "ri:mail-send-line",
  },
  {
    id: 7,
    title: "Scholarship Application",
    description:
      "Most students seek scholarships due to high tuition fees. We assist students in applying for scholarships based on their academic background and achievements. We guide students on improving their profiles to meet scholarship criteria. Scholarships like the Holland Scholarship, Erasmus Mundus, and OKEP are available, depending on the student's profile.",
    icon: "mdi:seal-outline",
  },
  {
    id: 8,
    title: "Tuition Fee Payment Support",
    description:
      "Students often face challenges when transferring tuition fees due to a lack of information about banks and exchange rates. We advise students on the best banks for opening student files, securing better EURO/DOLLAR exchange rates, and saving money. Additionally, we assist students in purchasing the necessary insurance for visa processing.",
    icon: "tdesign:money",
  },
];

function AdmissionServices() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ServiceRootStyle>
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 3, md: 5 },
            px: { xs: 2, sm: 4 },
          }}
        >
          <AnimatedComponent animationType="inUp">
            <Typography
              component="div"
              variant="overline"
              sx={{
                mb: 2,
                color: theme.palette.text.secondary,
                letterSpacing: "1px",
              }}
            >
              Our Services
            </Typography>
          </AnimatedComponent>
          <AnimatedComponent animationType="inDown">
            <Typography variant={isMobile ? "h4" : "h2"} fontWeight="bold">
              Admission Process
            </Typography>
          </AnimatedComponent>
        </Box>

        {!isMobile ? (
          <Timeline
            position="alternate"
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {steps.map((step, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined" sx={{ p: 1 }}>
                    <Iconify
                      icon={step.icon}
                      color="#FFF"
                      sx={{
                        bgcolor: "secondary.main",
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        p: 0.5,
                      }}
                    />
                  </TimelineDot>
                  <TimelineConnector
                    sx={{ bgcolor: "primary.main", height: 60 }}
                  />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 3 }}>
                  <Card
                    sx={{
                      p: 3,
                      boxShadow: 3,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="span"
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                    >
                      {step.title}
                      <Box component="span" ml={0.5}>
                        <Iconify
                          icon="mdi:arrow-right"
                          width={20}
                          height={20}
                        />
                      </Box>
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
          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ p: 3, boxShadow: 3 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Iconify
                      icon={step.icon}
                      width={30}
                      height={30}
                      color={theme.palette.primary.main}
                    />
                    <Typography variant="h6" fontWeight="bold" ml={2}>
                      {step.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ textAlign: "justify" }}>
                    {step.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </ServiceRootStyle>
  );
}

export default AdmissionServices;
