"use client";
import { countries as country } from "@/data/countryData";
import { fetchCountries } from "@/redux/features/country/countrySlice";
import { MENTOR_SIGNUP_3 } from "@/services/mentorRequests";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

let professionalInfoValidationschema = yup.object().shape({
  know_abroad_inquiry: yup
    .string()
    .required("Know about Abroad Inquiry is required"),
  about_yourself: yup.string().required("About Yourself is required"),
});

function MentorRegistrationForm3({ userId, setActiveStep }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [signupUserId, setSignupUserId] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [mentorData, setMentorData] = useState({
    mentoring_for: [],
    responsible_for: [],
    country_studying_working: "",
  });

  const { countries } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries(1));
  }, [dispatch]);

  const mentorProfessionalInputData = [
    {
      type: "dropdown",
      label: "Country Living or Studying*",
      name: "country_studying_working",
      placeholder: "",
      options: country,
      multiple: false,
    },
    {
      type: "radioButton",
      options: ["Service Holder", "Student"],
      label: "Select a Profession *",
      name: "profession",
      placeHolder: "",
    },
    {
      label: "Institution Studying or Studied *",
      name: "study_institution",
      placeholder: "",
    },
    {
      label: "Program Studying/Studied *",
      name: "study_program",
      placeholder: "",
    },
    {
      label: "Company Working for *",
      name: "company_working",
      placeholder: "",
    },
    {
      label: "Position of working in your company *",
      name: "company_working_position",
      placeholder: "",
    },
    {
      type: "availableFor",
      options: countries,
      label: "Available For *",
      name: "responsible_for",
      placeholder: "",
      multiple: true,
    },
    {
      type: "dropdown",
      options: [
        {
          name: "Student Visa/Permanent Residence(PR)",
          value: "Student Visa/Permanent Residence(PR)",
        },
        {
          name: "Dependent Visa(Spouse Visa)",
          value: "Dependent Visa(Spouse Visa)",
        },
      ],
      label: "Mentoring For *",
      name: "mentoring_for",
      placeholder: "",
      multiple: true,
    },

    {
      label: "Previous Completed Education",
      name: "previous_education",
      placeholder: "",
    },
    {
      label: "Awarded any Scholarship ?",
      name: "awarded_scholarship",
      placeholder: "If yes, then which scholarship ?",
    },
    {
      type: "multiline",
      label: "Extracurricular Activities",
      name: "extracurricular_activities",
      placeholder:
        "If yes, please tell us the name of ECA and activities in short? Perhaps you are involved with any student association or NGO. If so, then please describe your responsibility details in short?",
    },
    {
      type: "multiline",
      label: "Involved with Any Community Group ?",
      name: "community_group",
      placeholder:
        "Involved with any community group for helping students for free or are you a higher study blogger? If yes, then write about it in short with possible links and proof.",
    },
    {
      type: "radioButton",
      options: ["Yes", "No"],
      label: "Working with any student consultancy firm currently? *",
      name: "working_consultancy_currently",
    },
    {
      type: "radioButton",
      options: ["Yes", "No"],
      label:
        "Intention to work with any other student consultancy firm in the future while working with Abroad Inquiry? *",
      name: "intention_working_other_firm",
    },
    {
      label: "Know about Abroad Inquiry ? *",
      name: "know_abroad_inquiry",
      placeholder: "Short answer",
    },
    {
      type: "multiline",
      label: "Any Comment About Abroad Inquiry ? ",
      name: "comments",
      placeholder: "Short answer",
    },
    {
      type: "multiline",
      label: "About Yourself *",
      name: "about_yourself",
      placeholder: "We would like to show this information to our aspirants",
    },
  ];

  const formik = useFormik({
    initialValues: {
      profession: "",
      intention_working_other_firm: "",
      working_consultancy_currently: "",
      study_institution: "",
      study_program: "",
      company_working: "",
      company_working_position: "",
      // country_studying_working: "",
      previous_education: "",
      awarded_scholarship: "",
      extracurricular_activities: "",
      community_group: "",
      know_abroad_inquiry: "",
      comments: "",
      about_yourself: "",
    },
    validationSchema: professionalInfoValidationschema,
    onSubmit: (values, { resetForm }) => {
      handleFormSubmit(values, resetForm);
    },
  });

  const handleFormSubmit = (formData, resetForm) => {
    setLoading(true);
    const data = { ...formData, ...mentorData, mentor_id: userId };
    MENTOR_SIGNUP_3(data)
      .then((res) => {
        setLoading(false);
        setSignupUserId(res.data.mentorId);
        setError("");
        resetForm();
        setActiveStep(3);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        // console.log(err.response.data);
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: "60px" }}>
        <form onSubmit={formik.handleSubmit} method="post">
          {mentorProfessionalInputData.map((data, idx) => (
            <div key={idx}>
              {data.type === "radioButton" ? (
                <>
                  <br />
                  <FormLabel sx={{ color: theme.palette.text.primary }}>
                    {data.label}
                  </FormLabel>
                  <RadioGroup
                    row
                    name={data.name}
                    style={{ display: "flex" }}
                    value={formik.values[data.name]}
                    onChange={formik.handleChange}
                  >
                    {data.options.map((item, idx) => (
                      <FormControlLabel
                        he
                        key={idx}
                        value={item}
                        control={
                          <Radio
                            style={{ color: theme.palette.text.primary }}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </>
              ) : data.type === "multiline" ? (
                <>
                  <FormLabel sx={{ color: theme.palette.text.primary }}>
                    {data.label}
                  </FormLabel>
                  <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    maxRows={4}
                    name={data.name}
                    value={formik.values[data.name]}
                    onChange={formik.handleChange}
                    style={{ width: "100%" }}
                    placeholder={data.placeHolder}
                    error={
                      formik.touched[data.name] &&
                      Boolean(formik.errors[data.name])
                    }
                    helperText={
                      formik.touched[data.name] && formik.errors[data.name]
                    }
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    sx={{
                      mt: 2,
                      mb: 2,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.background.paper
                          : theme.palette.background.default,
                    }}
                  />
                </>
              ) : data.type === "dropdown" ? (
                <>
                  <br />
                  <FormLabel sx={{ color: theme.palette.text.primary }}>
                    {data.label}
                  </FormLabel>
                  <Select
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    multiple={data.multiple}
                    defaultValue=""
                    name={data.name}
                    value={mentorData[data.name]}
                    onChange={(e) => {
                      setMentorData({
                        ...mentorData,
                        [data.name]: data.multiple
                          ? [...e.target.value]
                          : e.target.value,
                      });
                    }}
                    // value={formik.values[data.name]}
                    // onChange={formik.handleChange}
                    error={
                      formik.touched[data.name] &&
                      Boolean(formik.errors[data.name])
                    }
                    helperText={
                      formik.touched[data.name] && formik.errors[data.name]
                    }
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.background.paper
                          : theme.palette.background.default,
                    }}
                  >
                    {data.options.map((option) => (
                      <MenuItem
                        key={option.label ? option.code : option.value}
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
                </>
              ) : data.type === "availableFor" ? (
                <>
                  <br />
                  <FormLabel sx={{ color: theme.palette.text.primary }}>
                    {data.label}
                  </FormLabel>
                  <Select
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    multiple={data.multiple}
                    defaultValue=""
                    name={data.name}
                    value={mentorData[data.name]}
                    onChange={(e) => {
                      setMentorData({
                        ...mentorData,
                        [data.name]: data.multiple
                          ? [...e.target.value]
                          : e.target.value,
                      });
                    }}
                    // value={formik.values[data.name]}
                    // onChange={formik.handleChange}
                    error={
                      formik.touched[data.name] &&
                      Boolean(formik.errors[data.name])
                    }
                    helperText={
                      formik.touched[data.name] && formik.errors[data.name]
                    }
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.background.paper
                          : theme.palette.background.default,
                    }}
                  >
                    {data.options.map((option) => (
                      <MenuItem key={option.countryId} value={option.countryId}>
                        {option.countryImg && (
                          <>
                            <img
                              loading="lazy"
                              width="25"
                              src={`${BASE_URL}/${option.countryImg}`}
                              alt={option.countryName}
                            />
                            &nbsp; &nbsp;
                          </>
                        )}

                        {option.countryName}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <>
                  <br />
                  <FormLabel sx={{ color: theme.palette.text.primary }}>
                    {data.label}
                  </FormLabel>

                  <TextField
                    fullWidth
                    name={data.name}
                    value={formik.values[data.name]}
                    onChange={formik.handleChange}
                    error={
                      formik.touched[data.name] &&
                      Boolean(formik.errors[data.name])
                    }
                    helperText={
                      formik.touched[data.name] && formik.errors[data.name]
                    }
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    sx={{
                      mt: 2,
                      mb: 2,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.background.paper
                          : theme.palette.background.default,
                    }}
                  />
                </>
              )}
            </div>
          ))}
          <br />
          <Button
            //  disabled={!(formik.isValid && formik.dirty) || loading}
            disabled={loading}
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
    </>
  );
}

export default MentorRegistrationForm3;
