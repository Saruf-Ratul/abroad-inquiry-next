"use client";

import Iconify from "@/components/Iconify";
import { MENTOR_SIGNUP_4 } from "@/services/mentorRequests";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  FormLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";

const data = [
  {
    title:
      "A valid color copy of your current resident permit & passport (both side). *",
    name: "resident_permit_passport",
  },
  {
    title: "A campus card/employee card copy. *",
    name: "campus_or_employee_card",
  },
  {
    title:
      "Mentor has to provide his/her signature according to the Passport or ID card. *",
    name: "signature",
  },
];

const ImageUpload = styled("input")({
  display: "none",
});

function MentorRegistrationForm4({ userId }) {
  const theme = useTheme();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({
    resident_permit_passport: null,
    campus_or_employee_card: null,
    signature: null,
  });
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    setFiles({
      ...files,
      [event.target.name]: event.target.files[0],
    });
  };

  const hanleFileUpload = () => {
    //  setLoading(true);
    const formData = new FormData();
    formData.append("resident_permit_passport", files.resident_permit_passport);
    formData.append("campus_or_employee_card", files.campus_or_employee_card);
    formData.append("signature", files.signature);
    setError(null);
    MENTOR_SIGNUP_4(userId, formData)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setError(null);
          setFiles({
            resident_permit_passport: null,
            campus_or_employee_card: null,
            signature: null,
          });
          setSuccess(true);
        } else {
          setError(res.response.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("File No Valid. Please Select Valid Files.");
      });
  };
  return (
    <Container maxWidth="sm" sx={{ marginTop: "40px", marginBottom: "50px" }}>
      {!success ? (
        <Box pt={2}>
          <Alert severity={error ? "error" : "info"}>
            {error
              ? error
              : "File size cannot exceed 500kb & only pdf and image types are allowed"}
          </Alert>
          {data.map((data, idx) => (
            <div key={idx}>
              <br />
              <FormLabel sx={{ color: theme.palette.text.primary }}>
                {data.title}
              </FormLabel>
              <Box mt={1} />
              <label htmlFor={data.name}>
                <ImageUpload
                  id={data.name}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
                  type="file"
                  name={data.name}
                  onChange={handleFileChange}
                />
                <Button
                  startIcon={
                    <Iconify
                      icon={"ic:outline-file-upload"}
                      width={24}
                      height={24}
                    />
                  }
                  variant="contained"
                  component="span"
                >
                  Upload
                </Button>
              </label>
              {files[data.name] && <small>{files[data.name].name}</small>}
              <br />
              {/* {!files[data.name] && (
                <FormHelperText error={true}>
                  This field is required!
                </FormHelperText>
              )} */}
            </div>
          ))}
          <br />
          <br />
          <Button
            disabled={
              !files.campus_or_employee_card ||
              !files.resident_permit_passport ||
              !files.signature ||
              loading
            }
            onClick={hanleFileUpload}
            color="primary"
            variant="contained"
            startIcon={loading && <CircularProgress size={20} />}
            size={matchesSm ? "medium" : "large"}
            fullWidth
            style={{ color: "#FFFF" }}
          >
            Submit
          </Button>
          <br />
          <br />
          <br />
        </Box>
      ) : (
        <Box textAlign="center" py={8}>
          {/* <FaCheckCircle size={120} color="#41AD49" /> */}
          <Typography mt={2}>
            Further Abroad Inquiry will send the confirmation email to your
            domain email.
            <br />
            Next Abroad Inquiry will ask for a short interview through email.
            <br />
            Thank you.
          </Typography>
          <br />
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            //   startIcon={<RiArrowGoBackFill />}
          >
            Back to home
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default MentorRegistrationForm4;
