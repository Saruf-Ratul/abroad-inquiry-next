"use client";
import Iconify from "@/components/Iconify";
import { countries } from "@/data/countryData";
import {
  MENTOR_SIGNUP_2,
  UPDATE_MENTOR_PROFILE_PIC,
} from "@/services/mentorRequests";
import {
  Avatar,
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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";

export const basicInfoInputData = [
  {
    label: "Your Present Address *",
    name: "present_address",
    placeholder: "",
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
    label: "Upload your Picture (Linkedin standard) *",
    name: "profile_pic",
  },
  {
    label: "City *",
    name: "city",
    placeholder: "",
  },
  {
    label: "Country Origin *",
    type: "countryDropdown",
    name: "country",
    placeholder: "Select The Country",
    options: countries,
  },

  {
    label: "Your permanent Address *",
    name: "permanent_address",
    placeholder: "",
  },
  {
    label: "Student or Employee Email Id*",
    name: "student_email",
    placeholder: "Ex: a.musa@student.hhs.nl *",
    type: "email",
  },
  {
    label: "Bangladeshi bank account details",
    name: "bank_account",
    placeholder:
      "Ex: Bank Name, Branch Name, Routing Number, A/C Name, A/C Number etc.",
  },
  {
    label: "WhatsApp number with dial code *",
    name: "whatsapp_number",
    placeholder: "",
    type: "tel",
  },
  {
    label: "Facebook Profile Links *",
    name: "facebook_url",
    placeholder: "http://facebook.com/abu.musa",
  },
  {
    label: "Linkedin Profile Links *",
    name: "linkedIn_url",
    placeholder: "http://linkedin.com/abu.musa",
  },
  {
    label: "Instagram Username ",
    name: "instagram_url",
    placeholder: "@abu_musa",
  },
];

let basicInfoValidationschema = yup.object().shape({
  present_address: yup.string().required("Present Address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  permanent_address: yup.string().required("Permanent Address is required"),
  student_email: yup
    .string()
    .required("Student or Employee Email Id is required"),
  whatsapp_number: yup.number().required("WhatsApp is required"),
  facebook_url: yup.string().required("Facebook Url required"),
  linkedIn_url: yup.string().required("LinkedIn Url required"),
});

const ImageUpload = styled("input")({
  display: "none",
});

function MentorRegistrationForm2({ userId, setActiveStep }) {
  const theme = useTheme();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [file, setFile] = useState(undefined);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [signupUserId, setSignupUserId] = useState();
  const [upLoading, setUploading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const formik = useFormik({
    initialValues: {
      present_address: "",
      city: "",
      country: "",
      permanent_address: "",
      student_email: "",
      bank_account: "",
      whatsapp_number: "",
      facebook_url: "",
      linkedIn_url: "",
      instagram_url: "",
      gender: "",
    },
    validationSchema: basicInfoValidationschema,
    onSubmit: (values, { resetForm }) => {
      handleFormSubmit(values, resetForm);
    },
  });

  const handleFormSubmit = (formData, resetForm) => {
    setLoading(true);
    const data = {
      ...formData,
      mentor_id: userId,
    };
    MENTOR_SIGNUP_2(data)
      .then((res) => {
        setSignupUserId(res.data.mentorId);
        setLoading(false);
        setError("");
        resetForm();
        setActiveStep(2);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setLoading(false);
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
    UPDATE_MENTOR_PROFILE_PIC(userId, formData)
      .then((res) => {
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
        // console.log(err.response.error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginBottom: "60px" }}>
      <form onSubmit={formik.handleSubmit} method="post">
        {basicInfoInputData.map((data, idx) => (
          <div key={idx}>
            {data.type === "tel" ? (
              <>
                <Typography sx={{ paddingTop: "20px" }}>
                  {data.label}
                </Typography>
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
                    let data = "+" + value;
                    formik.setFieldValue("whatsapp_number", data);
                  }}
                  enableSearch={true}
                  isValid={(value, country) => {}}
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
              </>
            ) : data.type === "countryDropdown" ? (
              <>
                <FormLabel sx={{ color: theme.palette.text.primary }}>
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
            ) : data.type === "radioButton" ? (
              <>
                <FormLabel sx={{ color: theme.palette.text.primary }}>
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
              </>
            ) : data.type === "imageUpload" ? (
              <>
                <br />
                <FormLabel sx={{ color: theme.palette.text.primary }}>
                  {data.label}
                </FormLabel>
                <br />
                <br />
                {file && (
                  <Avatar
                    src={file}
                    sizes=""
                    sx={{
                      width: 100,
                      height: 100,
                      marginBottom: 2,
                      border: "1px solid grey",
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
                          icon={"ic:outline-file-upload"}
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
  );
}

export default MentorRegistrationForm2;
