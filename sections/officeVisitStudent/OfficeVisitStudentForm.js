"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Button,
  TextField,
  useMediaQuery,
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  Stack,
  Radio,
  RadioGroup,
  FormControl,
  FormHelperText,
  Checkbox,
} from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import { countriesVisit } from "@/data/countryData";
import { useFormik } from "formik";
import * as yup from "yup";
import img from "../../public/assets/images/others/success.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentors } from "@/redux/features/mentor/mentorSlice";
import Image from "next/image";
import Iconify from "@/components/Iconify";
import { OFFICE_VISITED_STUDENT } from "@/services/studentRequests";
import { useRouter } from "next/navigation";

const signupValidationschema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  want_to_go: yup.string().required("This field is required"),
  mentors: yup.string().required("Please select mentor"),
  phone: yup.string().required("Phone number is required"),
  whatsApp: yup.string().required("WhatsApp number is required"),
  program: yup.string().required("Program field is required"),
  prefferedSubject: yup.string().required("Preffered subject is required"),
  last_academic_qualification: yup.string().required("This field is required"),
  institution_name: yup.string().required("This field is required"),
  passingYear: yup.string().required("Passing year is required"),
  group: yup.string().required("Group/Subject is required"),
  last_academic_result: yup.string().required("CGPA/GPA is required"),
  publications: yup.string().required("Publications is required"),
  english_proficiency: yup.string().required("IELTS/TOEFL/OTHERS is required"),
  working_experience: yup.string().required("Job Experience is required"),
  extracurricular_activities: yup
    .string()
    .required("Extracurricular is required"),
});

export default function OfficeVisitStudentForm() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [ielts, setIelts] = useState("");
  const [overall, setOverAll] = useState("");
  const [read, setRead] = useState("");
  const [write, setWrite] = useState("");
  const [listen, setListen] = useState("");
  const [speak, setSpeak] = useState("");
  const [otherTxt, setOtherTxt] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState();
  const { mentors } = useSelector((state) => state.mentors);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchMentors(1));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      whatsApp: "",
      mentors: "",
      want_to_go: "",
      program: "",
      prefferedSubject: "",
      last_academic_qualification: "",
      institution_name: "",
      passingYear: "",
      group: "",
      last_academic_result: "",
      publications: "",
      working_experience: "",
      extracurricular_activities: "",
      english_proficiency: "",
      comment: "pending",
    },
    validationSchema: signupValidationschema,
    onSubmit: (values, { resetForm }) => {
      if (!ielts) {
        setError("Please select IELTS/TOEFL/OTHERS");
      } else if (!overall && !read && !write && !listen && !speak) {
        setError("Please provide ovverall score and others");
      } else {
        setError("");
      }

      handleFormSubmit(values, resetForm);
    },
  });

  const handleFormSubmit = (formData, resetForm) => {
    let data = {
      ...formData,
      english_proficiency:
        ielts === "IELTS" || ielts === "TOEFL"
          ? `${ielts}-Overall Score: ${overall}, Reading: ${read}, Writing: ${write}, Listening: ${listen}, Speaking: ${speak}`
          : `${ielts}: ${otherTxt}`,
    };

    if (!ielts) {
      setError("Please select IELTS/TOEFL/OTHERS");
    } else if (ielts === "IELTS" || ielts === "TOEFL") {
      if (!overall || !read || !write || !listen || !speak) {
        setError("Please provide overall score and all section scores.");
      } else {
        setError("");
        submitData(data, resetForm);
      }
    } else if (otherTxt.trim() === "") {
      setError("Please provide a value for others.");
    } else {
      setError("");
      submitData(data, resetForm);
    }
  };

  const submitData = (data, resetForm) => {
    OFFICE_VISITED_STUDENT(data)
      .then((res) => {
        setSuccess(true);
        resetForm();
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setError("This email is already submitted!");
        } else if (error.response && error.response.status === 403) {
          setError("This email is already submitted!");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <Box
      style={{
        marginTop: matchesSm ? "40px" : "120px",
        marginBottom: "100px",
        marginLeft: matchesSm ? "0px" : "150px",
        marginRight: matchesSm ? "0px" : "100px",
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "80px",
        paddingBottom: "60px",
        backgroundColor: "#FFFFFF",
        flexDirection: matchesSm ? "column" : "row",
      }}
    >
      {success ? (
        <Box
          style={{
            borderRadius: "10px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(5px)",
            marginLeft: matchesSm ? "20px" : "230px",
            marginRight: matchesSm ? "20px" : "20px",
            padding: "10px",
          }}
        >
          <Box margin="auto" textAlign="center" py={10}>
            <Box display="flex" justifyContent="center" marginBottom={3}>
              <Image src={img} alt="success" width={150} height={150} />
            </Box>
            <Typography
              variant="h4"
              color="primary"
              marginY={3}
              textAlign="center"
            >
              Thank you !
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              marginY={3}
              textAlign="center"
            >
              Please wait a moment, Our consultant will talk to you soon.
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              mt: matchesSm ? 1 : 28,
              mr: matchesSm ? 8 : 0,
              ml: matchesSm ? 4 : 0,
              mb: matchesSm ? 12 : 0,
            }}
          >
            <Container>
              <Typography
                variant="h2"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : "#125533",
                }}
              >
                Consult with Our Expert!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                }}
              >
                Provide your information for a FREE consultation with our expert
                team.
              </Typography>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  mt: 4,
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  boxShadow:
                    "rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px",
                }}
                endIcon={
                  <Iconify
                    icon={"ph:arrow-right-bold"}
                    width={24}
                    height={24}
                  />
                }
              >
                FREE consultation
              </Button>
            </Container>
          </Box>
          <Container
            maxWidth={matchesSm ? "sm" : "md"}
            style={{
              borderRadius: "10px",
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F4F5FB",
              backdropFilter: "blur(5px)",
            }}
          >
            <Box
              sx={{
                mt: 8,
                mb: 4,
              }}
            >
              <div>
                <Container maxWidth="md">
                  <Typography
                    variant={matchesSm ? "h5" : "h3"}
                    sx={{
                      color: "#125533",
                      mb: 4,
                      fontFamily: "sans-serif",
                    }}
                  >
                    Please fill out the form, talk to a consultant
                  </Typography>
                  <form onSubmit={formik.handleSubmit} method="post">
                    <Box
                      sx={{
                        width: "auto",
                        height: "auto",
                        marginTop: "20px",
                      }}
                      sm={{ marginLeft: "50px", marginRight: "50px" }}
                    >
                      <Stack spacing={1}>
                        <Grid container>
                          <Grid item xs={11.5} sm={6}>
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="name"
                                >
                                  Student Name
                                </InputLabel>
                                <TextField
                                  name="name"
                                  value={formik.values.name}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  placeholder="write your name"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                  }
                                  helperText={
                                    formik.touched.name && formik.errors.name
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={11.5}
                            sm={5.5}
                            sx={{
                              ml: matchesSm ? 0 : 1,
                              mt: matchesSm ? 1 : 0,
                            }}
                          >
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="email"
                                >
                                  Email
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="email"
                                  value={formik.values.email}
                                  onChange={formik.handleChange}
                                  placeholder="write your email"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                  }
                                  helperText={
                                    formik.touched.email && formik.errors.email
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item xs={11.5} sm={6}>
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="applicationFor"
                                >
                                  Phone Number
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="phone"
                                  value={formik.values.phone}
                                  onChange={formik.handleChange}
                                  placeholder="write your phone number"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.phone &&
                                    Boolean(formik.errors.phone)
                                  }
                                  helperText={
                                    formik.touched.phone && formik.errors.phone
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={11.5}
                            sm={5.5}
                            sx={{
                              ml: matchesSm ? 0 : 1,
                              mt: matchesSm ? 1 : 0,
                            }}
                          >
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="email"
                                >
                                  What'sApp Number
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="whatsApp"
                                  value={formik.values.whatsApp}
                                  onChange={formik.handleChange}
                                  placeholder="write your what'sAPP number"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.whatsApp &&
                                    Boolean(formik.errors.whatsApp)
                                  }
                                  helperText={
                                    formik.touched.whatsApp &&
                                    formik.errors.whatsApp
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item xs={11.5} sm={6}>
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="applicationFor"
                                >
                                  Select Mentor /consultant
                                </InputLabel>

                                <FormControl
                                  fullWidth
                                  error={
                                    formik.touched.mentors &&
                                    Boolean(formik.errors.mentors)
                                  } // Show error if touched and has errors
                                  sx={{
                                    borderRadius: "10px",
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
                                >
                                  <Select
                                    value={formik.values.mentors || ""}
                                    onChange={formik.handleChange}
                                    displayEmpty
                                    name="mentors"
                                    placeholder="select mentors"
                                    onBlur={formik.handleBlur}
                                  >
                                    <MenuItem disabled value="">
                                      Select mentor
                                    </MenuItem>
                                    <MenuItem value="N/A">N/A</MenuItem>
                                    {mentors.map((mentor) => (
                                      <MenuItem
                                        key={mentor.id}
                                        value={mentor.mentorName}
                                      >
                                        {mentor.mentorName}
                                      </MenuItem>
                                    ))}
                                  </Select>

                                  {/* Show the error message below the select */}
                                  {formik.touched.mentors &&
                                    formik.errors.mentors && (
                                      <FormHelperText>
                                        {formik.errors.mentors}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={11.5}
                            sm={5.5}
                            sx={{
                              ml: matchesSm ? 0 : 1,
                              mt: matchesSm ? 1 : 0,
                            }}
                          >
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="email"
                                >
                                  Where you want to study abroad
                                </InputLabel>
                                <FormControl
                                  fullWidth
                                  error={
                                    formik.touched.want_to_go &&
                                    Boolean(formik.errors.want_to_go)
                                  } // Show error if touched and has errors
                                  sx={{
                                    borderRadius: "10px",
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
                                >
                                  <Select
                                    name="want_to_go"
                                    value={formik.values.want_to_go || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    displayEmpty
                                  >
                                    <MenuItem disabled value="">
                                      Select Country
                                    </MenuItem>
                                    {countriesVisit.map((option) => (
                                      <MenuItem
                                        key={
                                          option.label
                                            ? option.code
                                            : option.value
                                        }
                                        value={
                                          option.label
                                            ? `${option.code}-${option.label}`
                                            : option.value
                                        }
                                      >
                                        <Box display="flex" alignItems="center">
                                          {option.code && (
                                            <>
                                              <img
                                                loading="lazy"
                                                width="25"
                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                alt={`Flag of ${option.label}`}
                                              />
                                              &nbsp; &nbsp;
                                            </>
                                          )}
                                          {option.label
                                            ? option.label
                                            : option.name}
                                        </Box>
                                      </MenuItem>
                                    ))}
                                  </Select>

                                  {/* Show error message if there's an error */}
                                  {formik.touched.want_to_go &&
                                    formik.errors.want_to_go && (
                                      <FormHelperText>
                                        {formik.errors.want_to_go}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item xs={11.5} sm={6}>
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="applicationFor"
                                >
                                  Which program you want to apply
                                </InputLabel>

                                <FormControl
                                  fullWidth
                                  error={
                                    formik.touched.program &&
                                    Boolean(formik.errors.program)
                                  } // Show error if touched and has errors
                                  sx={{
                                    borderRadius: "10px",
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
                                >
                                  <Select
                                    name="program"
                                    value={formik.values.program || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    displayEmpty
                                  >
                                    <MenuItem disabled value="">
                                      Select program
                                    </MenuItem>
                                    <MenuItem value="Bachelor">
                                      Bachelor
                                    </MenuItem>
                                    <MenuItem value="Masters">Masters</MenuItem>
                                  </Select>

                                  {/* Show error message if there's an error */}
                                  {formik.touched.program &&
                                    formik.errors.program && (
                                      <FormHelperText>
                                        {formik.errors.program}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={11.5}
                            sm={5.5}
                            sx={{
                              ml: matchesSm ? 0 : 1,
                              mt: matchesSm ? 1 : 0,
                            }}
                          >
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="email"
                                >
                                  Preffered Subject
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="prefferedSubject"
                                  value={formik.values.prefferedSubject}
                                  onChange={formik.handleChange}
                                  placeholder="write here prefferd subject"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.prefferedSubject &&
                                    Boolean(formik.errors.prefferedSubject)
                                  }
                                  helperText={
                                    formik.touched.prefferedSubject &&
                                    formik.errors.prefferedSubject
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item xs={11.5} sm={6}>
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="applicationFor"
                                >
                                  Last Academic Qualification
                                </InputLabel>
                                <FormControl
                                  fullWidth
                                  error={
                                    formik.touched
                                      .last_academic_qualification &&
                                    Boolean(
                                      formik.errors.last_academic_qualification
                                    )
                                  } // Show error if touched and has errors
                                  sx={{
                                    borderRadius: "10px",
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
                                >
                                  <Select
                                    name="last_academic_qualification"
                                    value={
                                      formik.values
                                        .last_academic_qualification || ""
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    displayEmpty
                                  >
                                    <MenuItem disabled value="">
                                      Select last academic qualification
                                    </MenuItem>
                                    <MenuItem value="HSC">HSC</MenuItem>
                                    <MenuItem value="Bachelor">
                                      Bachelor
                                    </MenuItem>
                                    <MenuItem value="Masters">Masters</MenuItem>
                                  </Select>

                                  {/* Show error message if there's an error */}
                                  {formik.touched.last_academic_qualification &&
                                    formik.errors
                                      .last_academic_qualification && (
                                      <FormHelperText>
                                        {
                                          formik.errors
                                            .last_academic_qualification
                                        }
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={11.5}
                            sm={5.5}
                            sx={{
                              ml: matchesSm ? 0 : 1,
                              mt: matchesSm ? 1 : 0,
                            }}
                          >
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="email"
                                >
                                  Institution Name
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="institution_name"
                                  value={formik.values.institution_name}
                                  onChange={formik.handleChange}
                                  placeholder="write here last academic Group/Subject"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.institution_name &&
                                    Boolean(formik.errors.institution_name)
                                  }
                                  helperText={
                                    formik.touched.institution_name &&
                                    formik.errors.institution_name
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item xs={11.5} sm={6}>
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="applicationFor"
                                >
                                  Passing Year
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="passingYear"
                                  value={formik.values.passingYear}
                                  onChange={formik.handleChange}
                                  placeholder="write here last academic passing year"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.passingYear &&
                                    Boolean(formik.errors.passingYear)
                                  }
                                  helperText={
                                    formik.touched.passingYear &&
                                    formik.errors.passingYear
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={11.5}
                            sm={5.5}
                            sx={{
                              ml: matchesSm ? 0 : 1,
                              mt: matchesSm ? 1 : 0,
                            }}
                          >
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="email"
                                >
                                  Group / Subject
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="group"
                                  value={formik.values.group}
                                  onChange={formik.handleChange}
                                  placeholder="write here last academic CGPA/GPA"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.group &&
                                    Boolean(formik.errors.group)
                                  }
                                  helperText={
                                    formik.touched.group && formik.errors.group
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item xs={11.5} sm={6}>
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="applicationFor"
                                >
                                  CGPA / GPA
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="last_academic_result"
                                  value={formik.values.last_academic_result}
                                  onChange={formik.handleChange}
                                  placeholder="If YES , write something?"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.last_academic_result &&
                                    Boolean(formik.errors.last_academic_result)
                                  }
                                  helperText={
                                    formik.touched.last_academic_result &&
                                    formik.errors.last_academic_result
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={11.5}
                            sm={5.5}
                            sx={{
                              ml: matchesSm ? 0 : 1,
                              mt: matchesSm ? 1 : 0,
                            }}
                          >
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="email"
                                >
                                  Any publications ?
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="publications"
                                  value={formik.values.publications}
                                  onChange={formik.handleChange}
                                  placeholder="If YES , write something?"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.publications &&
                                    Boolean(formik.errors.publications)
                                  }
                                  helperText={
                                    formik.touched.publications &&
                                    formik.errors.publications
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item xs={11.5} sm={6}>
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="applicationFor"
                                >
                                  Any Job experience?
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="working_experience"
                                  value={formik.values.working_experience}
                                  onChange={formik.handleChange}
                                  placeholder="If YES , write something?"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.working_experience &&
                                    Boolean(formik.errors.working_experience)
                                  }
                                  helperText={
                                    formik.touched.working_experience &&
                                    formik.errors.working_experience
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={11.5}
                            sm={5.5}
                            sx={{
                              ml: matchesSm ? 0 : 1,
                              mt: matchesSm ? 1 : 0,
                            }}
                          >
                            <Stack>
                              <Stack>
                                <InputLabel
                                  sx={{
                                    color: "black",
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    marginBottom: "2px",
                                  }}
                                  for="email"
                                >
                                  Any extracurricular activities ?
                                </InputLabel>
                                <TextField
                                  fullWidth
                                  sx={{
                                    borderRadius: "10px",
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
                                  name="extracurricular_activities"
                                  value={
                                    formik.values.extracurricular_activities
                                  }
                                  onChange={formik.handleChange}
                                  placeholder="If YES , write something?"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.extracurricular_activities &&
                                    Boolean(
                                      formik.errors.extracurricular_activities
                                    )
                                  }
                                  helperText={
                                    formik.touched.extracurricular_activities &&
                                    formik.errors.extracurricular_activities
                                  }
                                />
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>

                        <div
                          style={{
                            backgroundColor: "white",
                            padding: "5px",
                            borderRadius: "10px",
                            marginRight: matchesSm ? "10px" : "20px",
                          }}
                        >
                          <Grid
                            container
                            sx={{
                              backgroundColor: "white",
                              p: 2,
                              borderRadius: "10px",
                            }}
                          >
                            <Grid item xs={10}>
                              <Stack>
                                <Stack>
                                  <InputLabel
                                    sx={{ color: "black", fontWeight: "bold" }}
                                  >
                                    IELTS / TOEFL / OTHERS?
                                  </InputLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="english_proficiency" // Match Formik's field name
                                    value={ielts}
                                    onChange={(e) => {
                                      setIelts(e.target.value); // Update local state
                                      formik.setFieldValue(
                                        "english_proficiency",
                                        e.target.value
                                      ); // Update Formik value
                                    }}
                                    onBlur={formik.handleBlur} // Handle blur event for Formik
                                  >
                                    {["IELTS", "TOEFL", "OTHERS"].map(
                                      (value) => (
                                        <FormControlLabel
                                          key={value}
                                          value={value}
                                          control={
                                            <Radio
                                              sx={{
                                                color: "black",
                                                "&.Mui-checked": {
                                                  color: "black",
                                                },
                                              }}
                                            />
                                          }
                                          label={
                                            <Box
                                              component="span"
                                              sx={{
                                                fontWeight: "bold",
                                                color: "black",
                                              }}
                                            >
                                              {value}
                                            </Box>
                                          }
                                        />
                                      )
                                    )}
                                  </RadioGroup>
                                  {formik.touched.english_proficiency &&
                                    formik.errors.english_proficiency && (
                                      <FormHelperText error>
                                        {formik.errors.english_proficiency}
                                      </FormHelperText>
                                    )}
                                </Stack>
                              </Stack>
                            </Grid>
                          </Grid>

                          {ielts === "IELTS" || ielts === "TOEFL" ? (
                            <Grid
                              container
                              maxWidth="sm"
                              sx={{ ml: matchesSm ? 0 : 2, mb: 1 }}
                            >
                              <Grid item xs={2} sm={2.5}>
                                <Stack>
                                  <Stack>
                                    <InputLabel
                                      sx={{
                                        color: "black",
                                        fontWeight: "500",
                                        fontSize: "15px",
                                        marginBottom: "2px",
                                      }}
                                      for="applicationFor"
                                    >
                                      Overall Score
                                    </InputLabel>
                                    <TextField
                                      placeholder="overall score"
                                      fullWidth
                                      sx={{
                                        borderRadius: "10px",
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
                                            borderColor:
                                              theme.palette.primary.main,
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
                                      name="overall"
                                      value={overall}
                                      onChange={(e) =>
                                        setOverAll(e.target.value)
                                      }
                                    />
                                  </Stack>
                                </Stack>
                              </Grid>

                              <Grid item xs={2.5} sx={{ ml: 1 }}>
                                <Stack>
                                  <Stack>
                                    <InputLabel
                                      sx={{
                                        color: "black",
                                        fontWeight: "500",
                                        fontSize: "15px",
                                        marginBottom: "2px",
                                      }}
                                      for="applicationFor"
                                    >
                                      Reading
                                    </InputLabel>
                                    <TextField
                                      placeholder="Reading"
                                      fullWidth
                                      sx={{
                                        borderRadius: "10px",
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
                                            borderColor:
                                              theme.palette.primary.main,
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
                                      name="read"
                                      value={read}
                                      onChange={(e) => setRead(e.target.value)}
                                    />
                                  </Stack>
                                </Stack>
                              </Grid>

                              <Grid item xs={2} sx={{ ml: 1 }}>
                                <Stack>
                                  <Stack>
                                    <InputLabel
                                      sx={{
                                        color: "black",
                                        fontWeight: "500",
                                        fontSize: "15px",
                                        marginBottom: "2px",
                                      }}
                                      for="applicationFor"
                                    >
                                      Writing
                                    </InputLabel>
                                    <TextField
                                      placeholder="Writing"
                                      fullWidth
                                      sx={{
                                        borderRadius: "10px",
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
                                            borderColor:
                                              theme.palette.primary.main,
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
                                      name="write"
                                      value={write}
                                      onChange={(e) => setWrite(e.target.value)}
                                    />
                                  </Stack>
                                </Stack>
                              </Grid>

                              <Grid item xs={2} sx={{ ml: 1 }}>
                                <Stack>
                                  <Stack>
                                    <InputLabel
                                      sx={{
                                        color: "black",
                                        fontWeight: "500",
                                        fontSize: "15px",
                                        marginBottom: "2px",
                                      }}
                                      for="applicationFor"
                                    >
                                      Listening
                                    </InputLabel>
                                    <TextField
                                      placeholder="Listening"
                                      fullWidth
                                      sx={{
                                        borderRadius: "10px",
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
                                            borderColor:
                                              theme.palette.primary.main,
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
                                      name="listen"
                                      value={listen}
                                      onChange={(e) =>
                                        setListen(e.target.value)
                                      }
                                    />
                                  </Stack>
                                </Stack>
                              </Grid>

                              <Grid item xs={2} sx={{ ml: 1 }}>
                                <Stack>
                                  <Stack>
                                    <InputLabel
                                      sx={{
                                        color: "black",
                                        fontWeight: "500",
                                        fontSize: "15px",
                                        marginBottom: "2px",
                                      }}
                                      for="email"
                                    >
                                      Speaking
                                    </InputLabel>
                                    <TextField
                                      placeholder="Speaking"
                                      fullWidth
                                      sx={{
                                        borderRadius: "10px",
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
                                            borderColor:
                                              theme.palette.primary.main,
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
                                      name="speak"
                                      value={speak}
                                      onChange={(e) => setSpeak(e.target.value)}
                                    />
                                  </Stack>
                                </Stack>
                              </Grid>
                            </Grid>
                          ) : ielts === "OTHERS" ? (
                            <Grid container>
                              <Grid item xs={11.5} sx={{ ml: 2, mb: 1 }}>
                                <Stack>
                                  <Stack>
                                    <TextField
                                      fullWidth
                                      sx={{
                                        borderRadius: "10px",
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
                                            borderColor:
                                              theme.palette.primary.main,
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
                                      name="others"
                                      value={otherTxt}
                                      onChange={(e) =>
                                        setOtherTxt(e.target.value)
                                      }
                                      placeholder="Write Something"
                                    />
                                  </Stack>
                                </Stack>
                              </Grid>
                            </Grid>
                          ) : null}
                        </div>

                        {error && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="caption" sx={{ color: "red" }}>
                              {error}
                            </Typography>
                          </Box>
                        )}

                        <FormControlLabel
                          // onChange={formik.handleChange}
                          name="checked"
                          // value={formik.values.checked}
                          control={
                            <Checkbox
                              // checked={formik.values.checked}
                              // onClick={() => !formik.values.checked}
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
                                onClick={() =>
                                  router.push("/terms-and-conditions")
                                }
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
                              and{" "}
                              <u
                                style={{ fontWeight: "bold" }}
                                onClick={() => router.push("/refund-policy")}
                              >
                                Refund Policy
                              </u>
                            </small>
                          }
                        />

                        <Box mb={1} />
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          size={matchesSm ? "medium" : "large"}
                          fullWidth
                        >
                          Submit
                        </Button>
                      </Stack>
                    </Box>
                  </form>
                </Container>
              </div>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
}
