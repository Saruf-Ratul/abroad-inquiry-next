"use client";
import Iconify from "@/components/Iconify";
import {
  Avatar,
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
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { countries } from "@/data/countryData";
import {
  UPDATE_ALL_STUDENT_DATA_CALL,
  UPDATE_STUDENT_PROFILE_PIC,
} from "@/services/studentRequests";

const additionalInfoInputData = [
  {
    type: "countryDropdown",
    label: "Where you want to study abroad? *",
    name: "want_to_go",
    placeHolder: "Ex: Canada",
    options: countries,
  },
  {
    type: "radioButton",
    options: ["Male", "Female", "Other"],
    label: "Select a Gender *",
    name: "gender",
    placeHolder: "",
  },
  {
    type: "imageUpload",
    label: "Upload your Picture *",
    name: "profile_pic",
  },
  {
    label: "Which program you want to apply? *",
    name: "want_to_study",
    placeHolder: "Ex: MBA",
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
  {
    type: "countryDropdown",
    label: "Currently live in? *",
    name: "currently_live_in",
    placeHolder: "",
    options: countries,
  },
  {
    type: "countryDropdown",
    label: "Country of origin? *",
    name: "country_of_origin",
    placeHolder: "",
    options: countries,
  },
  {
    type: "multiline",
    label:
      "Involved with any community to help others? If yes, write about the community.",
    name: "community_work",
    placeHolder: "",
  },
  {
    type: "multiline",
    label: "About yourself",
    name: "about_yourself",
    placeHolder: "Within 500 words",
  },
];

let additionalInfoValidationschema = yup.object().shape({
  want_to_go: yup.string().required("This field is required"),
  gender: yup.string().required("This field is required"),
  want_to_study: yup.string().required("This field is required"),
  last_academic_qualification: yup.string().required("This field is required"),
  institution_name: yup.string().required("This field is required"),
  currently_live_in: yup.string().required("This field is required"),
  country_of_origin: yup.string().required("This field is required"),
});

const ImageUpload = styled("input")({
  display: "none",
});

function RegistrationFrom2({ userId }) {
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [upLoading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(undefined);
  const theme = useTheme();
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      last_academic_qualification: "",
      last_academic_result: "",
      institution_name: "",
      want_to_go: "",
      want_to_study: "",
      english_proficiency: "",
      working_experience: "",
      extracurricular_activities: "",
      publications: "",
      currently_live_in: "",
      country_of_origin: "",
      community_work: "",
      about_yourself: "",
      gender: "",
    },
    validationSchema: additionalInfoValidationschema,
    onSubmit: (values, { resetForm }) => {
      handleFormSubmit(values, resetForm);
    },
  });

  const handleFormSubmit = (userData, resetForm) => {
    setLoading(true);
    let data = {
      last_academic_qualification: userData.last_academic_qualification,
      last_academic_result: userData.last_academic_result,
      institution_name: userData.institution_name,
      want_to_go: userData.want_to_go,
      want_to_study: userData.want_to_study,
      english_proficiency: userData.english_proficiency,
      working_experience: userData.working_experience,
      extracurricular_activities: userData.extracurricular_activities,
      publications: userData.publications,
      currently_live_in: userData.currently_live_in,
      country_of_origin: userData.country_of_origin,
      community_work: userData.community_work,
      about_yourself: userData.about_yourself,
      gender: userData.gender,
    };
    UPDATE_ALL_STUDENT_DATA_CALL(data)
      .then((res) => {
        const userInfo = {
          ...res.data,
          userStatus: "student",
          email: res.data.studentEmail,
          name: res.data.studentName,
          phone: res.data.studentPhone,
          profilePic: res.data.studentProfilePic,
          id: res.data.studentId,
        };
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
      });
  };

  const handleImageChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    let data = event.target.files[0];
    handleImageUpload(data);
  };

  const handleImageUpload = (data) => {
    setUploading(true);
    let formData = new FormData();
    formData.append("profile", data);
    UPDATE_STUDENT_PROFILE_PIC(userId, formData)
      .then((res) => {
        setUploading(false);
      })
      .catch((err) => {
        // console.log(err.response);
        setUploading(false);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "8px", marginBottom: "100px" }}>
      <form onSubmit={formik.handleSubmit} method="post">
        {additionalInfoInputData.map((data, idx) => (
          <div key={idx}>
            {data.type === "countryDropdown" ? (
              <>
                <FormLabel
                  sx={{ color: theme.palette.text.primary, mt: 2, mb: 2 }}
                >
                  {data.label}
                </FormLabel>
                <Select
                  size={matchesSm ? "small" : "medium"}
                  fullWidth
                  name={data.name}
                  value={formik.values[data.name]}
                  onChange={formik.handleChange}
                  placeholder={data.placeHolder}
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
            ) : data.type === "multiline" ? (
              <>
                <FormLabel
                  sx={{ color: theme.palette.text.primary, mt: 2, mb: 2 }}
                >
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
                    style: { color: theme.palette.text.primary },
                  }}
                  sx={{ mt: 2, mb: 2 }}
                />
              </>
            ) : data.type === "radioButton" ? (
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <FormLabel
                  sx={{ color: theme.palette.text.primary, mt: 2, mb: 2 }}
                >
                  {data.label}
                </FormLabel>
                <RadioGroup
                  name={data.name}
                  row
                  style={{ display: "flex" }}
                  value={formik.values[data.name]}
                  onChange={formik.handleChange}
                >
                  {data.options.map((item, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={item}
                      control={
                        <Radio style={{ color: theme.palette.text.primary }} />
                      }
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </div>
            ) : data.type === "imageUpload" ? (
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <FormLabel
                  sx={{ color: theme.palette.text.primary, mt: 2, mb: 2 }}
                >
                  {data.label}
                </FormLabel>
                <br></br>
                {file && (
                  <Avatar
                    src={file}
                    sizes=""
                    sx={{
                      width: 100,
                      height: 100,
                      marginBottom: 2,
                      border: `1px solid ${
                        theme.palette.mode === "dark" ? "grey" : "black"
                      }`,
                    }}
                  />
                )}
                <label htmlFor="contained-button-file">
                  <ImageUpload
                    accept="image/png,image/jpg ,image/jpeg"
                    id="contained-button-file"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    startIcon={
                      upLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Iconify
                          icon={"material-symbols:upload"}
                          width={24}
                          height={24}
                        />
                      )
                    }
                    disabled={upLoading}
                    variant="contained"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              </div>
            ) : (
              <>
                <FormLabel
                  sx={{ color: theme.palette.text.primary, mt: 2, mb: 2 }}
                >
                  {data.label}
                </FormLabel>
                <TextField
                  fullWidth
                  name={data.name}
                  value={formik.values[data.name]}
                  onChange={formik.handleChange}
                  placeholder={data.placeHolder}
                  error={
                    formik.touched[data.name] &&
                    Boolean(formik.errors[data.name])
                  }
                  helperText={
                    formik.touched[data.name] && formik.errors[data.name]
                  }
                  InputLabelProps={{
                    style: { color: theme.palette.text.primary },
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
          type="submit"
          color="primary"
          variant="contained"
          size={matchesSm ? "medium" : "large"}
          fullWidth
          style={{ color: "#FFFF" }}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default RegistrationFrom2;
