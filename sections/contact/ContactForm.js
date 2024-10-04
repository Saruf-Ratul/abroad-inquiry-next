"use client";
import { fetchCountries } from "@/redux/features/country/countrySlice";
import emailjs from "@emailjs/browser";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

// Validation schema for form fields
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  first_name: yup
    .string("Enter your First Name")
    .required("First Name is required"),
  last_name: yup
    .string("Enter your Last Name")
    .required("Last Name is required"),
  phone: yup.string("Enter your Phone").required("Phone is required"),
  preferred_destination: yup
    .array()
    .min(1, "Select at least one preferred destination"),
  counselling_mode: yup
    .string("Enter your Counselling Mode")
    .required("Counselling Mode is required"),
  description: yup
    .string("Enter your Description")
    .required("Description is required"),
  IELTS: yup.string("Enter your IELTS").required("IELTS is required"),
});

function ContactForm() {
  const route = useRouter();
  const [agree, setAgree] = useState(false);
  const matchesSm = useMediaQuery("(max-width:600px)");
  const form = useRef();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries(1));
  }, [dispatch]);

  const sendEmail = (values, resetForm) => {
    emailjs
      .sendForm(
        "service_jedhcvp",
        "template_r7yaq7x",
        form.current,
        "user_4KpXNpaBasqQfzUWutRrB"
      )
      .then(
        (result) => {
          setOpen(true);
          resetForm();
          setMessage("Message sent!");
          console.log(result);
        },
        (error) => {
          setOpen(true);
          setMessage("Error! Try again.");
        }
      );
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      preferred_destination: [],
      counselling_mode: "",
      preferred_service: "",
      description: "",
      IELTS: "",
      others: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const selectedCountries = values.preferred_destination.map(
        (country, index) => `${index + 1}. ${country}`
      );
      const data = {
        ...values,
        preferred_destination: selectedCountries.join(", "),
      };
      sendEmail(data, resetForm);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
      <Container maxWidth="md">
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Box paddingX={matchesSm ? 2 : 8} paddingY={5}>
            <form ref={form} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                {/* First Name Field */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size={matchesSm ? "small" : "medium"}
                    name="first_name"
                    label="First Name*"
                    variant="outlined"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.first_name &&
                      Boolean(formik.errors.first_name)
                    }
                    helperText={
                      formik.touched.first_name && formik.errors.first_name
                    }
                  />
                </Grid>
                {/* Last Name Field */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size={matchesSm ? "small" : "medium"}
                    name="last_name"
                    label="Last Name*"
                    variant="outlined"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.last_name &&
                      Boolean(formik.errors.last_name)
                    }
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                  />
                </Grid>
                {/* Email Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size={matchesSm ? "small" : "medium"}
                    name="email"
                    label="Email Address*"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                {/* Phone Number */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size={matchesSm ? "small" : "medium"}
                    name="phone"
                    label="Mobile Number with Country Code*"
                    variant="outlined"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                {/* IELTS Score */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size={matchesSm ? "small" : "medium"}
                    name="IELTS"
                    label="IELTS*"
                    variant="outlined"
                    value={formik.values.IELTS}
                    onChange={formik.handleChange}
                    error={formik.touched.IELTS && Boolean(formik.errors.IELTS)}
                    helperText={formik.touched.IELTS && formik.errors.IELTS}
                  />
                </Grid>
                {/* Additional Exams */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size={matchesSm ? "small" : "medium"}
                    name="others"
                    label="TOEFL/SAT/GRE/GMAT with name & result?"
                    variant="outlined"
                    value={formik.values.others}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.others && Boolean(formik.errors.others)
                    }
                    helperText={formik.touched.others && formik.errors.others}
                  />
                </Grid>
                {/* Preferred Destination */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Preferred Destination</InputLabel>
                    <Select
                      size={matchesSm ? "small" : "medium"}
                      multiple
                      name="preferred_destination"
                      value={formik.values.preferred_destination}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.preferred_destination &&
                        Boolean(formik.errors.preferred_destination)
                      }
                    >
                      {countries.map((country) => (
                        <MenuItem
                          key={country.countryName}
                          value={country.countryName}
                        >
                          {country.countryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Mode of Counselling */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    size={matchesSm ? "small" : "medium"}
                    name="counselling_mode"
                    label="Preferred Mode of Counselling"
                    variant="outlined"
                    value={formik.values.counselling_mode}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.counselling_mode &&
                      Boolean(formik.errors.counselling_mode)
                    }
                  >
                    {["In-person", "Virtual Counselling"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    size={matchesSm ? "small" : "medium"}
                    name="description"
                    label="Any specific questions you have in mind?"
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
                {/* Agreement Checkbox */}
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ my: { sm: 1, md: 2 } }}>
                    Abroad Inquiry will not share your details with others
                    without your permission.
                  </Alert>

                  <FormControlLabel
                    onChange={() => setAgree(!agree)}
                    control={
                      <Checkbox
                        size="small"
                        style={{ color: "green" }}
                        color="success"
                      />
                    }
                    label={
                      <small>
                        I agree with the{" "}
                        <u
                          style={{ fontWeight: "bold" }}
                          onClick={() => route.push("/terms-and-conditions")}
                        >
                          Terms and Conditions
                        </u>{" "}
                        and{" "}
                        <u
                          style={{ fontWeight: "bold" }}
                          onClick={() => route.push("/privacy-policy")}
                        >
                          Privacy Policy
                        </u>
                      </small>
                    }
                  />
                </Grid>
              </Grid>
              <Box mt={4} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size={matchesSm ? "small" : "large"}
                  disabled={!agree}
                  sx={{
                    borderRadius: 2,
                    paddingX: 6,
                    paddingY: 2,
                    textTransform: "none",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      </Container>
    </>
  );
}

export default ContactForm;
