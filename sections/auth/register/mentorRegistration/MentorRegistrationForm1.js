"use client";
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Iconify from "@/components/Iconify";
import styled from "@emotion/styled";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import MentorRegistrationForm2 from "./MentorRegistrationForm2.js";
import MentorRegistrationForm3 from "./MentorRegistrationForm3";
import MentorRegistrationForm4 from "./MentorRegistrationForm4";
import { MENTOR_SIGNUP_1 } from "@/services/mentorRequests";
import { useRouter } from "next/navigation.js";

const steps = [
  "Basic Information",
  "Personal Information",
  "Educations & Others",
  "Ducuments Submission",
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: <Iconify icon={"codicon:account"} width={24} height={24} />,
    2: <Iconify icon={"mdi:account-cog"} width={24} height={24} />,
    3: <Iconify icon={"mdi:education-outline"} width={24} height={24} />,
    4: <Iconify icon={"bx:file"} width={24} height={24} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const mentorSignupInputData = [
  {
    label: "Full Name *",
    name: "full_name",
    placeholder: "Ex: Abu Musa",
  },
  {
    label: "Email Address *",
    name: "email",
    placeholder: "Ex: abu_musa@gmail.com",
  },
  {
    label: "Phone Number *",
    name: "phone_number",
    placeholder: "+8801XXXXXXXXXXX",
    type: "tel",
  },
  {
    label: "Password *",
    name: "password",
    placeholder:
      "Must contain an uppercase, lowercase, number & special character",
    type: "password",
  },
  {
    label: "Confirm Password *",
    name: "confirm_password",
    placeholder:
      "Must contain an uppercase, lowercase, number & special character",
    type: "password",
  },
];

const signupValidationschema = yup.object().shape({
  full_name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must contain 6 characters, one uppercase, one lowercase, one number, and one special character"
    ),
  confirm_password: yup
    .string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref("password")], "Both passwords need to be the same"),
  checked: yup.bool().oneOf([true], "Field must be checked"),
});

function MentorRegistrationForm1() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [agree, setAgree] = useState();
  const [checked, setChecked] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [signupUserId, setSignupUserId] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      checked: false,
    },
    validationSchema: signupValidationschema,
    onSubmit: (values, { resetForm }) => {
      handleFormSubmit(values, resetForm);
    },
  });

  const handleFormSubmit = (formData, resetForm) => {
    let data = {
      full_name: formData.full_name,
      email: formData.email,
      phone: phoneNumber,
      password: formData.password,
    };
    setLoading(true);
    MENTOR_SIGNUP_1(data)
      .then((res) => {
        if (res.data.message) {
          setLoading(false);
          setError("This email is already registered!");
        } else {
          // alert.success("Account Created Successfully!");
          setSignupUserId(res.data.mentorId);
          setLoading(false);
          setError("");
          resetForm();
          handleNextPage();
          setNextPage(true);
          window.scrollTo(0, 0);
          setChecked(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setError("This email is already registered!");
        } else {
          setError("Something Wrong. Please try again later.");
        }
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    setActiveStep(1);
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ marginTop: "150px", marginBottom: "80px" }}
      >
        <Box>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {activeStep === 0 && (
                <Container maxWidth="sm">
                  <form
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                    method="post"
                  >
                    {mentorSignupInputData.map((data, idx) => (
                      <div key={idx}>
                        <br />
                        {data.type === "tel" ? (
                          <PhoneInput
                            country={"bd"}
                            onChange={(value, country) => {
                              setPhoneNumber(value);
                            }}
                            inputStyle={{
                              width: "100%",
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? theme.palette.background.paper
                                  : theme.palette.background.default,
                              color:
                                theme.palette.mode === "dark"
                                  ? theme.palette.text.primary
                                  : theme.palette.text.secondary,
                            }}
                            sx={{
                              "& .MuiInputLabel-root": {
                                "&.Mui-focused": {
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "white"
                                      : theme.palette.primary.dark,
                                },
                              },
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            name={data.name}
                            label={data.label}
                            type={
                              data.type === "password"
                                ? showPassword[data.name]
                                  ? "text"
                                  : "password"
                                : data.type
                            }
                            InputProps={{
                              endAdornment: data.type === "password" && (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword((prev) => ({
                                        ...prev,
                                        [data.name]: !prev[data.name],
                                      }))
                                    }
                                    edge="end"
                                  >
                                    {showPassword[data.name] ? (
                                      <Iconify
                                        icon={"eva:eye-fill"}
                                        width={24}
                                        height={24}
                                      />
                                    ) : (
                                      <Iconify
                                        icon={"eva:eye-off-fill"}
                                        width={24}
                                        height={24}
                                      />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            value={formik.values[data.name]}
                            onChange={formik.handleChange}
                            error={
                              formik.touched[data.name] &&
                              Boolean(formik.errors[data.name])
                            }
                            helperText={
                              formik.touched[data.name] &&
                              formik.errors[data.name]
                            }
                            InputLabelProps={{
                              style: { color: theme.palette.text.primary },
                            }}
                            sx={{
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? theme.palette.background.paper
                                  : theme.palette.background.default,
                              "& .MuiInputBase-input": {
                                color:
                                  theme.palette.mode === "dark"
                                    ? theme.palette.text.primary
                                    : theme.palette.text.secondary,
                              },
                              "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                              "& .MuiInputLabel-root": {
                                "&.Mui-focused": {
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "white"
                                      : theme.palette.primary.dark,
                                },
                              },
                            }}
                          />
                        )}
                      </div>
                    ))}

                    <br/>

                    <Box>
                      <Typography sx={{color:"red"}}>{error}</Typography>
                    </Box>
                    <br />
                    <FormControlLabel
                      onChange={formik.handleChange}
                      name="checked"
                      value={formik.values.checked}
                      control={
                        <Checkbox
                          checked={formik.values.checked}
                          onClick={() =>
                            formik.setFieldValue(
                              "checked",
                              !formik.values.checked
                            )
                          }
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
                            onClick={() => router.push("/terms-and-conditions")}
                          >
                            Terms & Conditions
                          </u>
                          ,{" "}
                          <u
                            style={{ fontWeight: "bold" }}
                            onClick={() => router.push("/privacy-policy")}
                          >
                            {" "}
                            Privacy Policy
                          </u>{" "}
                        </small>
                      }
                    />

                    <Box mb={1} />
                    <Button
                      disabled={!formik.values.checked || loading}
                      type="submit"
                      color="primary"
                      variant="contained"
                      startIcon={loading && <CircularProgress size={20} />}
                      size={matchesSm ? "medium" : "large"}
                      fullWidth
                      style={{ color: "#FFFF" }}
                    >
                      Next
                    </Button>
                  </form>
                </Container>
              )}

              {activeStep === 1 && (
                <MentorRegistrationForm2
                  setActiveStep={setActiveStep}
                  userId={signupUserId}
                />
              )}
              {activeStep === 2 && (
                <MentorRegistrationForm3
                  setActiveStep={setActiveStep}
                  userId={signupUserId}
                />
              )}
              {activeStep === 3 && (
                <MentorRegistrationForm4 userId={signupUserId} />
              )}
            </Typography>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default MentorRegistrationForm1;
