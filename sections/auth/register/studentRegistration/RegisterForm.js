"use client";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Container,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Iconify from "../../../../components/Iconify";
import { useFormik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import RegistrationFrom2 from "./RegistrationFrom2";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { STUDENT_SIGNUP_CALL } from "@/services/studentRequests";
import { useRouter } from "next/navigation";

const steps = ["Basic Information", "Personal Information"];

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

const signupInputData = [
  {
    label: "Full Name *",
    name: "name",
    placeHolder: "",
    type: "text",
  },
  {
    label: "Email Address *",
    name: "email",
    placeHolder: "",
    type: "email",
  },
  {
    label: "Phone",
    name: "phone",
    placeHolder: "",
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
    name: "confirmPassword",
    placeholder:
      "Must contain an uppercase, lowercase, number & special character",
    type: "password",
  },
];

const signupValidationschema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must contain 6 characters, one uppercase, one lowercase, one number, and one special case character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  checked: yup.bool().oneOf([true], "Field must be checked"),
});

export default function RegisterForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [signupUserId, setSignupUserId] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      checked: false,
    },
    validationSchema: signupValidationschema,
    onSubmit: (values, { resetForm }) => {
      handleFormSubmit(values, resetForm);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    },
  });

  const handleFormSubmit = (formData, resetForm) => {
    let data = {
      email: formData.email,
      name: formData.name,
      phone: phoneNumber,
      password: formData.password,
    };
    setSignupUserId();
    setLoading(true);
    setError("");

    STUDENT_SIGNUP_CALL(data)
      .then((res) => {
        setLoading(false);
        let token = res.data.token;
        let userId = res.data.userId;
        Cookies.set("token", token, { expires: 7, secure: true });
        Cookies.set("userId", userId, { expires: 7, secure: true });
        Cookies.set("userStatus", "student", { expires: 7, secure: true });
        setSignupUserId(userId);
        // alert.success("Account Created Successfully!");
        setError("");
        resetForm();
        setNextPage(true);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data.message);
      });
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ 
          marginTop: "150px", 
          marginBottom: "100px" 
        }}
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
                  <form onSubmit={formik.handleSubmit} method="post">
                    {signupInputData.map((data, idx) => (
                      <div key={idx}>
                        <br />
                        {data.type === "tel" ? (
                          <PhoneInput
                            country={"bd"}
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
                            onChange={(value, country) => {
                              let phoneData = JSON.stringify({
                                countryCode: country.countryCode,
                                dialCode: "+" + country.dialCode,
                                phoneNumber: value.slice(
                                  country.dialCode.length
                                ),
                              });
                              setPhoneNumber(phoneData);
                            }}
                            enableSearch={true}
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
                                      setShowPassword({
                                        ...showPassword,
                                        [data.name]: !showPassword[data.name],
                                      })
                                    }
                                    edge="end"
                                  >
                                    {showPassword[data.name] ? (
                                      <Iconify
                                        icon={"f7:eye-fill"}
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
                          />
                        )}
                      </div>
                    ))}
                    <br />
                    <FormControlLabel
                      onChange={formik.handleChange}
                      name="checked"
                      value={formik.values.checked}
                      control={
                        <Checkbox
                          checked={formik.values.checked}
                          onClick={() => !formik.values.checked}
                          size="small"
                          style={{ color: "green" }}
                          color="success"
                        />
                      }
                      label={
                        <small>
                          I agree with the{" "}
                          <u style={{ fontWeight: "bold" }} onClick={() => router.push("/terms-and-conditions")}>
                           Terms & Conditions
                          </u>
                          ,{" "}
                          <u style={{ fontWeight: "bold" }} onClick={() => router.push("/privacy-policy")}>
                            {" "}
                            Privacy Policy
                          </u>{" "}
                          and{" "}
                          <u style={{ fontWeight: "bold" }} onClick={() => router.push("/refund-policy")}>Refund Policy</u>
                        </small>
                      }
                    />

                    <Box mb={1} />
                    <Button
                      disabled={!formik.values.checked}
                      type="submit"
                      color="primary"
                      variant="contained"
                      size={matchesSm ? "medium" : "large"}
                      fullWidth
                    >
                      Next
                    </Button>
                  </form>
                </Container>
              )}

              {activeStep === 1 && <RegistrationFrom2 userId={signupUserId} />}
            </Typography>
          </div>
        </Box>
      </Container>
    </>
  );
}
