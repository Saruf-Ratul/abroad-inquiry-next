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
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useRouter } from "next/navigation";
import visit from "../../public/assets/images/others/study-abroad.webp";
import img from "../../public/assets/images/others/success.png";
import { countries } from "@/data/countryData";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentors } from "@/redux/features/mentor/mentorSlice";
import Image from "next/image";
import { addOfficeVisitedStudent } from "@/redux/features/officeVisitStudent/officeVisitStudentSlice";

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
    type: "countryDropdown",
    label: "Where you want to study abroad? *",
    name: "want_to_go",
    placeHolder: "Ex: Canada",
    options: countries,
  },
  {
    type: "dropdown",
    options: ["Male", "Female", "Other"],
    label: "Select a Gender *",
    name: "gender",
    placeHolder: "",
  },
  {
    type: "dropdown",
    label: "Select Mentor",
    name: "mentors",
    options: [],
  },
  {
    type: "dropdown",
    label: "Which program you want to apply? *",
    name: "want_to_study",
    options: ["Bechelor", "Masters", "Other"],
  },
  {
    label: "Last academic qualification *",
    name: "last_academic_qualification",
    placeHolder: "Ex: Bsc in Computer Science",
  },
  {
    label: "Last academic qualification result *",
    name: "last_academic_result",
    placeHolder: "Ex: CGPA 3.92",
  },
  {
    label: "Institution Name *",
    name: "institution_name",
    placeHolder: "Ex: Dhaka University",
  },
  {
    label:
      "IELTS/TOEFL/SAT/GRE/GMAT/Other with Result? If no, write your plan about it.",
    name: "english_proficiency",
    placeHolder: "Ex: IELTS (7.5) / planning to take it next month",
  },
  {
    type: "multiline",
    label: "Any job experience? If yes, write something about it.",
    name: "working_experience",
    placeHolder: "Ex: Instructor at DU (2020-21)",
  },
  {
    type: "multiline",
    label:
      "Any extracurricular activities? If yes, write a little bit about it.",
    name: "extracurricular_activities",
    placeHolder: "Within 500 words",
  },
  {
    type: "multiline",
    label: "Any publication? If yes, write something.",
    name: "publications",
    placeHolder: "Within 500 words",
  },
];

const signupValidationschema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  want_to_go: yup.string().required("This field is required"),
  gender: yup.string().required("This field is required"),
  want_to_study: yup.string().required("This field is required"),
  last_academic_qualification: yup.string().required("This field is required"),
  institution_name: yup.string().required("This field is required"),
  english_proficiency: yup.string(),
  working_experience: yup.string(),
  extracurricular_activities: yup.string(),
  publications: yup.string(),
});

export default function OfficeVisitStudentForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState();
  const { mentors } = useSelector((state) => state.mentors);

  const {success,loading} = useSelector((state)=>state.offcieVisitStudent)

  useEffect(() => {
    dispatch(fetchMentors(1));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      mentors: "",
      want_to_study: "",
      gender: "",
      last_academic_qualification: "",
      last_academic_result: "",
      institution_name: "",
      english_proficiency: "",
      working_experience: "",
      extracurricular_activities: "",
      publications: "",
      comment:"pending"
    },
    validationSchema: signupValidationschema,
    onSubmit: (values, { resetForm }) => {
      handleFormSubmit(values, resetForm);
    },
  });

  const handleFormSubmit = (formData, resetForm) => {
    let data = {
      ...formData,
      phone: phoneNumber,
    };
    dispatch(addOfficeVisitedStudent(data));
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${visit.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: "120px",
        marginBottom: "100px",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      {success ? (
        <Container
        maxWidth="sm"
        style={{
          borderRadius: "10px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(5px)",
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
      </Container>
      
      ) : (
        <Container
          maxWidth="md"
          style={{
            borderRadius: "10px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
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
                  variant="h3"
                  sx={{
                    color: "black",
                    mb: 4,
                    fontFamily: "sans-serif",
                  }}
                >
                  Please fill out the form, talk to a consultant
                </Typography>
                <form onSubmit={formik.handleSubmit} method="post">
                  <Grid container spacing={2}>
                    {signupInputData.map((data, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
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
                        ) : data.type === "countryDropdown" ? (
                          <FormControl
                            fullWidth
                            size={matchesSm ? "small" : "medium"}
                            error={
                              formik.touched[data.name] &&
                              Boolean(formik.errors[data.name])
                            }
                            sx={{
                              borderRadius: "10px",
                              height: "40px",
                              mb: 2,
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? theme.palette.background.paper
                                  : theme.palette.background.default,
                            }}
                          >
                            <InputLabel sx={{ borderRadius: "10px" }}>
                              {data.label}
                            </InputLabel>
                            <Select
                              name={data.name}
                              value={formik.values[data.name]}
                              onChange={formik.handleChange}
                              placeholder={data.placeHolder}
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
                              {data.options.map((option) => (
                                <MenuItem
                                  key={
                                    option.label ? option.code : option.value
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
                                    {option.label ? option.label : option.name}
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {formik.touched[data.name] &&
                                formik.errors[data.name]}
                            </FormHelperText>
                          </FormControl>
                        ) : data.type === "dropdown" ? (
                          <FormControl
                            fullWidth
                            size={matchesSm ? "small" : "medium"}
                            error={
                              formik.touched[data.name] &&
                              Boolean(formik.errors[data.name])
                            }
                            sx={{
                              borderRadius: "10px",
                              height: "40px",
                              mb: 2,
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? theme.palette.background.paper
                                  : theme.palette.background.default,
                            }}
                          >
                            <InputLabel sx={{ borderRadius: "10px" }}>
                              {data.label}
                            </InputLabel>
                            <Select
                              name={data.name}
                              value={formik.values[data.name]}
                              onChange={formik.handleChange}
                              placeholder={data.placeHolder}
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
                              {data.name === "mentors"
                                ? mentors.map((mentor) => (
                                    <MenuItem
                                      key={mentor.id}
                                      value={mentor.mentorName}
                                    >
                                      {mentor.mentorName}
                                    </MenuItem>
                                  ))
                                : data.options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                            </Select>
                            <FormHelperText>
                              {formik.touched[data.name] &&
                                formik.errors[data.name]}
                            </FormHelperText>
                          </FormControl>
                        ) : (
                          <TextField
                            fullWidth
                            name={data.name}
                            label={data.label}
                            type="text"
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
                      </Grid>
                    ))}
                  </Grid>
                  <br />

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
                </form>
              </Container>
            </div>
          </Box>
        </Container>
      )}
    </Box>
  );
}
