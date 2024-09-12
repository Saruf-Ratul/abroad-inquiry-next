import React from "react";
import { Box, Typography, Container, Card } from "@mui/material";
import Iconify from "@/components/Iconify";
import { ServiceRootStyle } from "./style";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const steps = [
  {
    id: 1,
    title: "Documents Arrangement",
    description:
      "We, Abroad Inquiry, firstly take all academic certificates and transcripts, Passport copies, IELTS certificates, one passport-size photo, two Recommendation letters (for master’s mainly), a Job experience letter (if needed), and any additional necessary documents. Then, we make a European-standard CV for the candidate. We arrange all the documents professionally according to how the Universities want them.  ",
    icon: "ion:documents-sharp",
  },
  {
    id: 2,
    title: "Motivation letter",
    description:
      "Motivation letter is one of the essential factors to get an offer letter. We have expert SOP writers who work all day long for the motivation letter. At the very beginning, we send a motivation guideline to the students and guide them regarding the motivation letter. We also provide samples to the candidates for reference. When they send us the draft file, our experts work on that motivation letter to finalize it and make it a standard one. ",
    icon: "carbon:education",
  },
  {
    id: 3,
    title: "University Application",
    description:
      "When all the documents, CVs, and motivation letters are ready, we will consult  the candidates and choose the universities for the students. Universities are selected based on both parties' concerns. Before applying to the universities, we check out their academic requirements. If everything matches appropriately, we will apply for the students on their behalf. ",
    icon: "mdi:passport",
  },
  {
    id: 4,
    title: "Interview Guidelines",
    description:
      "After successfully submitting all the documents, if the university thinks they are proper and match the admission requirements, they arrange an interview for the students. We guide the students regarding the interview, such as what questions they will ask them during the interview. We make all the arrangements so students can prepare for the interview and pass it successfully. ",
    icon: "openmoji:interview",
  },
  {
    id: 5,
    title: "Exam & Assignment related supports",
    description:
      "In some countries, like Finland, entrance exams and assignments are required instead of interviews for assessment. We help our candidates before they are attending the entrance exam in Finland. Moreover, in many countries, universities ask for assignments to assess the candidate. We assist our students to complete their assignments and successfully pass the phase.",
    icon: "healthicons:i-exam-multiple-choice-outline",
  },
  {
    id: 6,
    title: "Maintenance of communication with Universities",
    description:
      "Maintaining communications with the universities is a crucial part of admission. We, on behalf of students, always maintain communication with the universities. For example, if we have any confusion, we mail it to the universities directly. Moreover, if students cannot pay their tuition fees on time, we contact the university to extend the date.",
    icon: "carbon:license-maintenance",
  },
  {
    id: 7,
    title: "Scholarship Application",
    description:
      "Most of the students look for scholarship as the tuition fee used to be high. Almost all the universities provide scholarship depending on the previous academic background. So, we help students to apply for the scholarship. There are some criteria for getting scholarship. If there’s anything lack in student’s profile, we recommend them to complete those so. There are different scholarships in terms of Countries such as Holland scholarship, OKEP scholarship, Erasmus Mundus scholarship in Netherlands. There are many more scholarship which are given to the students depending on their merits. These scholarships are given based on the student’s profile, Such as academic background, IELTS score, Publications, and job experiences. ",
    icon: "fa6-brands:google-scholar",
  },
  {
    id: 8,
    title: "Tuition fee payment support",
    description:
      "These days, students usually encounter a common complication when transmitting tuition fees. For instance, there is a lack of information regarding which banks open student files and which banks have a low EURO/DOLLAR rate. We consult students about the information above, which generally helps them choose the right bank at the right time. Thus, our registered students can save some money in their pockets. Furthermore, we assist our candidates in buying the insurance required for visa processing. ",
    icon: "solar:money-bag-linear",
  },
];

function AdmissionServices() {
  return (
    <>
      <ServiceRootStyle>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 4 },
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
              <Typography variant="h2">Admission</Typography>
            </AnimatedComponent>
          </Box>

          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {steps.map((step, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator sx={{ mt: 8 }}>
                  <TimelineDot color="primary" variant="outlined" >
                    <Iconify
                      icon={step.icon}
                      color="#FFFF"
                      sx={{
                        bgcolor: "secondary.main",
                        width: 50,
                        height: 50,
                        m: "auto",
                        borderRadius: "50%",
                        p: 1,
                      }}
                    />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Card sx={{ p: 4 }}>
                    <Typography variant="h6" component="span" display="flex">
                      {step.title}
                      <Box
                        component="span"
                        display="flex"
                        alignItems="center"
                        ml={0.5}
                      >
                        <Iconify
                          icon={"pepicons-print:arrow-right"}
                          width={24}
                          height={24}
                        />
                      </Box>
                    </Typography>
                    <Typography variant="body2" textAlign="justify">
                      {step.description}
                    </Typography>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </ServiceRootStyle>
    </>
  );
}

export default AdmissionServices;
