"use client";
import React, { useState } from "react";
import { MotionContainer } from "@/components/animate";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import AuthHeaderSignUp from "@/layouts/auth/MainHeaderSignUp";
import MainFooter from "@/layouts/main/MainFooter";
import { Alert, Box, Button, Container, Link, Typography } from "@mui/material";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Iconify from "@/components/Iconify";

const MentorApplication = () => {
  const [open, setOpen] = useState(false);
  const [benifit, setBinifit] = useState(false);
  const [qualification, setQualification] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickBenifit = () => {
    setBinifit(!benifit);
  };
  const handleClickQualification = () => {
    setQualification(!qualification);
  };

  return (
    <>
      <AuthHeaderSignUp />
      <Container maxWidth="lg" component={MotionContainer} sx={{ mt: 18 }}>
         <Typography variant="h4" sx={{ mb: 3 }}>
            Application for being a mentor of Abroad Inquiry
          </Typography>
        
          <Typography sx={{ mb: 3, textAlign: "justify" }}>
           Are you an international student or have you previously completed your higher education outside your home country and are currently living abroad? Would you like to share your experience abroad with potential international students like yourself? Do you want to share your knowledge and connections with more international students and professionals worldwide? Do you want to work in your free time with complete freedom, like a freelancer? If so, you can work a flexible schedule that you set for yourself, completing tasks during your free time outside of school or work, from anywhere with an internet connection. If you are selected as a mentor, you will receive full guidance and support from the overseas research team. If you are enthusiastic and this role appeals to you, apply now.
          </Typography>
        

        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Iconify
                icon={"healthicons:crisis-response-center-person-outline"}
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Mentors Responsibilities" />
            {open ? (
              <Iconify
                icon={"ic:baseline-expand-less"}
                width={24}
                height={24}
              />
            ) : (
              <Iconify icon={"lets-icons:expand-down"} width={24} height={24} />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="According to the mentor’s flexible time, mentors will talk with prospective students over MicrosoftTeam/WhatsApp after fixing the meeting." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="During the conversation, mentors will share the related factual information with the students to learn about the university, course, study environment, part-time job, internships, and full-time working opportunities. After that, mentors may refer to any university to apply or refer to Abroad Inquiry for further application support." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors must provide guidelines/feedback on how to write the motivation or cover letter and check them. Besides, mentors will guide the aspirants to arrange all required papers such as IELTS, recommendation letters, academic certificates & transcripts, motivation letters, etc." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Further, mentors must guide students in organizing financial documents, i.e., bank statements and solvency certificates." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors must apply for admission to their preferred university on behalf of a student. Moreover, mentors need to complete the application form on behalf of students so that students can submit the papers to the embassy. Besides, mentors must provide visa grooming to the aspirants (if required)." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Later, once students arrive in the country that the mentors are assigned to, mentors may guide how to get accommodation, part-time job, or probably mentors may often guide how to be successful in the exam. (Optional)" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors may occasionally attend our international study seminar or fair or relevant events." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Occasionally, mentors may write a few studies, work, and abroad-related blogs or create vlogs so students can easily reach the mentors." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Finally, mentors will work as a freelancer; therefore, there is no responsibility before the mentor takes any task on his/her hand." />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickBenifit}>
            <ListItemIcon>
              <Iconify icon={"hugeicons:profit"} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Mentors Benefits:" />
            {benifit ? (
              <Iconify
                icon={"ic:baseline-expand-less"}
                width={24}
                height={24}
              />
            ) : (
              <Iconify icon={"lets-icons:expand-down"} width={24} height={24} />
            )}
          </ListItemButton>
          <Collapse in={benifit} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors will get 50-70% of the money that Abroad Inquiry charges for initial guidelines over MirosoftTeam/WhatsApp. Therefore, Abroad Inquiry recommends that mentors create and enlist their free schedules." />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors will get 50% of the service charge that Abroad Inquiry charges for an entirely successful application. The payment depends on the country that the mentors are working for." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="The mentor will get 10,000 BDT of bonus money for his/her referral if the mentor refers any aspirant to Abroad Inquiry for a complete application. That means mentors are often quite busy with study and work. At that time, mentors may refer the aspirants to apply through Abroad Inquiry or other mentors. (However, once the application becomes successful, the mentor will get his/her bonus!)." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors will get a bonus for every complete blog and vlog. (1000 BDT and 5000 BDT)" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors can complete as many applications as they can in their free time. The more a mentor accomplishes the applications, the more he/she earns. That means mentors can work as much as possible in their free time." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors may get the plane fare, accommodation costs, and a bonus for international seminars and activities. The bonus amount depends on time and place. In general (10,000 BDT to 50,000 BDT)." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors will increase their network around the world with students and other mentors." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Mentors may receive 10,000 BDT per applicant if the students get an offer letter and the applicant does not apply for the visa. If there is a refusal from the embassy, the mentor will not get any money." />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickQualification}>
            <ListItemIcon>
              <Iconify
                icon={"healthicons:i-exam-qualification-outline"}
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Qualification:" />
            {qualification ? (
              <Iconify
                icon={"ic:baseline-expand-less"}
                width={24}
                height={24}
              />
            ) : (
              <Iconify icon={"lets-icons:expand-down"} width={24} height={24} />
            )}
          </ListItemButton>
          <Collapse in={qualification} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="A mentor is fluent in English. (If the mentor knows the local language, that will increase the chance of being selected)." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="A mentor is living in that country for a minimum of one year, and he/she has completed his/her degree, is still studying, or has finished his/her degree and is currently working in that country." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="Running bachelor students are also advised to apply if the candidates have completed at least two years of their study and are continuing the study." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="The mentor has to know how to get admission because the mentor has to apply on behalf of Abroad Inquiry’s aspirants." />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="The mentor has to complete the visa application to the selective embassy on behalf of the student. In addition, the mentor has to provide visa grooming to their candidates. " />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>❖</ListItemIcon>
                <ListItemText primary="The Mentor is not working with any other education consultancy company or recruiting students by himself and has no education consulting for processing student files. " />
              </ListItemButton>
            </List>
          </Collapse>
        </List>

        <Alert
          icon={false}
          severity="success"
          sx={{ textAlign: "justify", mt: 4, mb: 8 }}
        >
          N.B. The mentors will not get The referral bonus and application fees for the Abroad Inquiry without successful applications. (Because Abroad Inquiry does not charge the clients for unsuccessful applications). A short course or exchange student will not count as a prospective mentor. However, Abroad Inquiry advises that if someone has completed additional courses or degrees from another university, they should add those courses/degrees to their profile.
        </Alert>

        <Box sx={{ display: "flex", mb: 8 }}>
          <Typography sx={{ mt: 1, ml: 1 }}>
            If you are highly motivated to work with Abroad Inquiry 
          </Typography>
          <Link href="/auth/mentor/mentorSignup">
          <Button
            variant="contained"
            color="primary"
            sx={{
              ml: 8,
            }}
          >
            Apply Now
          </Button>
          </Link>
        </Box>
      </Container>
      <MainFooter />
    </>
  );
};

export default MentorApplication;
