"use client";
import { varFade } from "@/components/animate";
import FeedbackForm from "@/components/FeedbackForm";
import Iconify from "@/components/Iconify";
import Logo from "@/components/Logo";
import SocialsButton from "@/components/SocialsButton";
import { email, officeLocation, phoneNumbers } from "@/data/contact";
import appleStore from "@/public/assets/banner-slide-imgs/apple-app-store.webp";
import googlePlay from "@/public/assets/banner-slide-imgs/google-play-store.webp";
import footer from "@/public/assets/images/img/footer.webp";
import logo from "@/public/assets/images/img/logo.png";
import { PATH_PAGE } from "@/routes/paths";
import {
  Box,
  ButtonBase,
  Container,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { m } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";

const LINKS = [
  {
    headline: "Quick Links",
    children: [
      { name: "Home", href: PATH_PAGE.home },
      { name: "Mentors", href: PATH_PAGE.mentors },
      { name: "Countries", href: PATH_PAGE.countries },
      { name: "Services", href: PATH_PAGE.services },
      { name: "Newsfeed", href: PATH_PAGE.newsfeed },
      { name: "About us", href: PATH_PAGE.about },
      { name: "Contact us", href: PATH_PAGE.contact },
      { name: "Career", href: PATH_PAGE.career },
    ],
  },
  {
    headline: "Useful Links",
    children: [
      { href: "/refund-policy", name: "Refund Policy" },
      { href: "/disclaimer", name: "Disclaimer" },
      { href: "/payment-method", name: "Payment Method" },
      { href: "/privacy-policy", name: "Privacy Policy" },
      { href: "/cookie-policy", name: "Cookie Policy" },
      { href: "/terms-and-conditions", name: "Terms & Conditions" },
      {
        href: "https://forms.swisscare.com/#/isie?icd=3049",
        name: "Swisscare",
        target: "_blank", // Ensures the link opens in a new tab
        rel: "noreferrer", // Adds security for opening a new tab
      },
      { href: "/office-visit-student", name: "Office Visit Form" },
      { href: "", name: "Feedback", type: "feedback" },
    ],
  },
];

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.neutral,
}));

const FooterImgStyle = styled(Image)(({ theme }) => ({
  objectFit: "contain",
  position: "absolute",
  height: "auto",
  right: 0,
  bottom: 0,
  zIndex: 0,
  opacity: theme.palette.mode === "light" ? 0.1 : 0.5,
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function MainFooter() {
  const matchesSm = useMediaQuery("(max-width:400px)");
  const [openForm, setOpenForm] = useState(false);

  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 10 }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Logo sx={{ mx: { xs: "auto", md: "inherit" } }} />
          </Grid>
          <Grid item xs={12} sm={6} lg={2.5}>
            <Stack spacing={2}>
              <Typography component="p" variant="overline">
                Address
              </Typography>
              {officeLocation.map((item, idx) => (
                <div key={idx}>
                  <Typography component="p" variant="overline">
                    {item.title}
                  </Typography>
                  <Typography
                    component={NextLink}
                    target="_blank"
                    href={item.href}
                    variant="body2"
                    color={"text.primary"}
                    sx={{ textDecoration: "none" }}
                  >
                    {item.address}
                  </Typography>
                </div>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} lg={2.5}>
            <Stack spacing={2}>
              <Typography component="p" variant="overline">
                Email:{" "}
              </Typography>
              <Link
                omponent={NextLink}
                href={`mailto:${email.href}`}
                variant="body2"
                color={"text.primary"}
              >
                {" "}
                {email.href}
              </Link>

              <Typography component="p" variant="overline">
                Phone
              </Typography>
              <Stack>
                {phoneNumbers.map((num, idx) => {
                  return (
                    <Link
                      omponent={NextLink}
                      key={idx}
                      variant="body2"
                      color={"text.primary"}
                      href={`tel:${num}`}
                    >
                      {`${num}${idx !== phoneNumbers.length - 1 ? ", " : ""} `}
                    </Link>
                  );
                })}
              </Stack>
            </Stack>
          </Grid>

          {LINKS.map((list) => (
            <Grid item xs={6} md={3} lg={2} key={list.headline}>
              <Stack key={list.headline} spacing={1}>
                <Typography component="p" variant="overline">
                  {list.headline}
                </Typography>
                {list.children.map((link, idx) => (
                  <div key={idx}>
                    {link.type === "feedback" ? (
                      <>
                        <Typography
                          onClick={() => setOpenForm(true)}
                          variant="body2"
                          sx={{
                            ":hover": {
                              textDecoration: "underline",
                              cursor: "pointer",
                            },
                          }}
                        >
                          {link.name}
                        </Typography>
                      </>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        component={NextLink}
                        target={link.target}
                        color="inherit"
                        variant="body2"
                        sx={{ display: "block" }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </Stack>
            </Grid>
          ))}

          <Grid item sm={6} md={6} lg={3}>
            <Stack spacing={2}>
              <Typography component="p" variant="overline">
                Follow us
              </Typography>
              <Typography variant="caption">
                {/* FOLLOW ABROAD INQUIRY ON SOCIAL MEDIA. */}
                Stay up to date with our latest news, activities and vacancies
              </Typography>
              <Stack
                direction="row"
                // justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
              >
                <SocialsButton sx={{ mx: 0.5 }} initialColor />
              </Stack>

              <Stack direction="row" mt={2} alignItems={"center"}>
                <Typography component="p" variant="overline" mt={2}>
                  Our Sister <br /> Concern
                </Typography>

                <Link
                  href="https://abroadtickets.com/"
                  target="_blank"
                  rel="noreferrer"
                  component={NextLink}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      marginTop: 2,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "15px",
                    }}
                  >
                    <Image
                      src={logo}
                      alt="abroad ticket"
                      width={70}
                      height={70}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Box
          display="flex"
          flexDirection={matchesSm ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          maxWidth={480}
          paddingBottom={2}
          marginTop={5}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            display={matchesSm ? "block" : "inline"}
          >
            App available at
          </Typography>
          <Box>
            <Stack direction="row" spacing={1.5} justifyContent={"flex-start"}>
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
          </Box>
        </Box>

        <Typography variant="body2" textAlign="justify">
          This app will allow a student to check his/her eligibility in hundreds
          of universities and programs worldwide with only one tap! Moreover, it
          makes the connection easier than ever between the expert mentors of
          Abroad Inquiry and the students. Now it becomes easier to apply in
          European countries, e.g. Belgium, Denmark, Germany, Finland, Sweden,
          Netherlands, Norway, and other popular study destinations like the
          U.S.A, U.K., Canada, Australia, New Zealand, Japan, Malaysia and so
          on.
        </Typography>

        <Divider style={{ marginTop: "30px" }} />
      </Container>

      <Typography
        component="p"
        variant="body2"
        sx={{
          mt: 4,
          pb: 5,
          fontSize: 13,
          textAlign: "center",
        }}
      >
        Copyright © Abroad Inquiry {new Date().getFullYear()}. All Rights
        Reserved
      </Typography>

      <FooterImgStyle width={500} height={300} src={footer} />

      <CustomDialog
        onClose={() => setOpenForm(false)}
        aria-labelledby="customized-dialog-title"
        open={openForm} // Changed to use the correct state 'openForm'
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center" }}
          id="customized-dialog-title"
        >
          Provide Feedback
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenForm(false)} // Corrected 'onClose' to 'onClick'
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon={"material-symbols:close"} />
        </IconButton>
        <FeedbackForm setFormOpen={setOpenForm} />
      </CustomDialog>
    </RootStyle>
  );
}
