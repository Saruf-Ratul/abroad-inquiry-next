"use client";
import { fetchCountries } from "@/redux/features/country/countrySlice";
import emailjs from "@emailjs/browser";
import {
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
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

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
  const [agree, setAgree] = useState();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const matchesMd = useMediaQuery("(max-width:900px)");
  const form = useRef();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.countries);

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
        },
        (error) => {
          setOpen(true);
          setMessage("Error ! Try again.");
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
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        preferred_destination: selectedCountries.join(", "),
        counselling_mode: values.counselling_mode,
        preferred_service: values.preferred_service,
        description: values.description,
        IELTS: values.IELTS,
        others: values.others,
      };
      sendEmail(data, resetForm);
    },
  });


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message={message}
        />
      </div>
      <Container maxWidth="md">
        <Card>
          <Box paddingX={matchesSm ? 5 : 8} paddingY={5}>
            <form ref={form} onSubmit={formik.handleSubmit}>
              <Grid container>
                <Grid item xs={12} md={5.8}>
                  <TextField
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    name="first_name"
                    label="First Name*"
                    variant="filled"
                    // className={.inpuclassest}
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.first_name &&
                      Boolean(formik.errors.first_name)
                    }
                    helperText={
                      formik.touched.first_name && formik.errors.first_name
                    }
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    sx={{
                      marginBottom: "20px",
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={0.4} />

                <Grid item xs={12} md={5.8}>
                  <TextField
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    label="Last Name*"
                    name="last_name"
                    variant="filled"
                    // className={classes.input}
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.last_name &&
                      Boolean(formik.errors.last_name)
                    }
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    label="Email Address*"
                    name="email"
                    variant="filled"
                    // className={classes.input}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    sx={{
                      marginBottom: "20px",
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    label="Mobile Number with Country Code*"
                    variant="filled"
                    name="phone"
                    // className={classes.input}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    sx={{
                      marginBottom: "20px",
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={5.8}>
                  <TextField
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    name="IELTS"
                    label="IELTS"
                    variant="filled"
                    // className={classes.input}
                    value={formik.values.IELTS}
                    onChange={formik.handleChange}
                    error={formik.touched.IELTS && Boolean(formik.errors.IELTS)}
                    helperText={formik.touched.IELTS && formik.errors.IELTS}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    sx={{
                      marginBottom: "20px",
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={0.4} />

                <Grid item xs={12} md={5.8}>
                  <TextField
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    label="TOEFL/SAT/GRE/GMAT with name & result?"
                    name="others"
                    variant="filled"
                    // className={classes.others}
                    value={formik.values.others}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.others && Boolean(formik.errors.others)
                    }
                    helperText={formik.touched.others && formik.errors.others}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    sx={{
                      marginBottom: "20px",
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={5.8}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel
                      style={{ color: "#787A80" }}
                      id="preferred-destination-label"
                    >
                      Preferred Destination
                    </InputLabel>
                    <Select
                      size={matchesSm ? "small" : "medium"}
                      multiple
                      labelId="preferred-destination-label"
                      id="preferred-destination"
                      name="preferred_destination"
                      label="Preferred Destination"
                      value={formik.values.preferred_destination}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.preferred_destination &&
                        Boolean(formik.errors.preferred_destination)
                      }
                      helperText={
                        formik.touched.preferred_destination &&
                        formik.errors.preferred_destination
                      }
                      InputLabelProps={{
                        style: { color: "#787A80" },
                      }}
                    >
                      {countries.map((option) => (
                        <MenuItem
                          key={option.countryName}
                          value={option.countryName}
                        >
                          {option.countryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {matchesMd && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </Grid>

                <Grid item xs={12} md={0.4} />

                <Grid item xs={12} md={5.8}>
                  <TextField
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    select
                    name="counselling_mode"
                    defaultValue=""
                    label="Preferred Mode of Counselling"
                    variant="filled"
                    value={formik.values.counselling_mode}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.counselling_mode &&
                      Boolean(formik.errors.counselling_mode)
                    }
                    helperText={
                      formik.touched.counselling_mode &&
                      formik.errors.counselling_mode
                    }
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                  >
                    {["In-person", "Virtual Counselling"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={12}>
                  <br />
                  <TextField
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    defaultValue=""
                    select
                    name="preferred_service"
                    label="Preferred Service"
                    variant="filled"
                    value={formik.values.preferred_service}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.preferred_service &&
                      Boolean(formik.errors.preferred_service)
                    }
                    helperText={
                      formik.touched.preferred_service &&
                      formik.errors.preferred_service
                    }
                    style={{ paddingTop: 0 }}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                  >
                    {[
                      "Online Guidance",
                      "Admission and Visa",
                      "Scholarship and Visa",
                      "Spous/Dependent Visa",
                      "Document Ligalization/Attestation",
                      "Ticket Service",
                    ].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={12}>
                  <br />
                  <TextField
                    variant="filled"
                    id="outlined-multiline-static"
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    style={{ paddingTop: 0 }}
                  />
                </Grid>
              </Grid>

              <Typography pb={0.5} pt={0.8} variant="h6" fontWeight="bold">
                Abroad Inquiry will not share your details with others without
                your permission
              </Typography>

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

              <Box mb={1} />

              <Button
                disabled={!agree}
                type="submit"
                color="secondary"
                variant="contained"
                size={matchesSm ? "medium" : "large"}
                fullWidth
                style={{ color: "#FFFF" }}
              >
                REGISTER
              </Button>
            </form>
          </Box>
        </Card>
      </Container>
    </>
  );
}

export default ContactForm;
