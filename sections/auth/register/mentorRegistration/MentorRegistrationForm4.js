"use client";

import Iconify from "@/components/Iconify";
import { MENTOR_SIGNUP_4 } from "@/services/mentorRequests";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  FormLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { useState } from "react";

const data = [
  {
    title:
      "A valid color copy of your current resident permit & passport (both sides). *",
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
  const router = useRouter();
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
    setLoading(true); // Start loading spinner
    const formData = new FormData();
    formData.append("resident_permit_passport", files.resident_permit_passport);
    formData.append("campus_or_employee_card", files.campus_or_employee_card);
    formData.append("signature", files.signature);
    setError(null);

    MENTOR_SIGNUP_4(userId, formData)
      .then((res) => {
        setLoading(false); // Stop loading spinner
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
        setLoading(false); // Stop loading spinner on error
        setError("File Not Valid. Please Select Valid Files.");
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "40px", marginBottom: "50px" }}>
      {!success ? (
        <Box pt={2}>
          <Alert severity={error ? "error" : "info"}>
            {error
              ? error
              : "File size cannot exceed 500kb & only PDF and image types are allowed."}
          </Alert>
          {data.map((item, idx) => (
            <div key={idx}>
              <br />
              <FormLabel sx={{ color: theme.palette.text.primary }}>
                {item.title}
              </FormLabel>
              <Box mt={1} />
              <label htmlFor={item.name}>
                <ImageUpload
                  id={item.name}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
                  type="file"
                  name={item.name}
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
              {files[item.name] && <small>{files[item.name].name}</small>}
              <br />
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
            startIcon={loading ? <CircularProgress size={20} /> : null} // Show spinner when loading
            size={matchesSm ? "medium" : "large"}
            fullWidth
            style={{ color: "#FFFF" }}
          >
            {loading ? "Submitting..." : "Submit"} {/* Button text change */}
          </Button>
          <br />
          <br />
          <br />
        </Box>
      ) : (
        <Box textAlign="center" py={8}>
          <Box
            sx={{
              bgcolor: theme.palette.success.main,
              width: 150,
              height: 150,
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              m: "auto",
            }}
          >
            <Iconify
              icon="line-md:check-all"
              sx={{ height: 120, width: 120, color: "#FFFF" }}
            />
          </Box>

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
            onClick={() => router.push("/")}
            startIcon={<Iconify icon="icon-park-outline:back" />}
          >
            Back to home
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default MentorRegistrationForm4;
