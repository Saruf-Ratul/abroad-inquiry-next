import {
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { carrierJobApplication } from "@/redux/features/career/careerSlice";
import { useDispatch } from "react-redux";
import successImg from "@/public/assets/images/others/success.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Iconify from "@/components/Iconify";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const ApplyForm = ({ title, careerPostId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(null);
  const matchesSm = useMediaQuery("(max-width:600px)");
  const form = useRef();
  const fileInputRef = useRef();
  const [applicationFor, setApplicationFor] = useState(title);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState("");
  const [showFile, setShowFile] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size exceeds 2MB. Please upload a smaller file.");
      setShowFile(false);
      return;
    }

    setCvFile(file);
    setShowFile(true);
    setError(null);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z.\s]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setError("First Name and Last Name must be strings.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }

    if (phone.length !== 11 || isNaN(Number(phone))) {
      setError("Mobile Number must be exactly 11 digits.");
      return;
    }

    // const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/.*$/;
    const linkedinRegex = /^[a-zA-Z.\s]+$/;
    if (!linkedinRegex.test(linkedinLink)) {
      setError("Invalid LinkedIn Profile URL.");
      return;
    }

    if (coverLetter.split(/\s+/).length > 500) {
      setError("Cover Letter must be a maximum of 500 words.");
      return;
    }

    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(cvFile.name)) {
      setError("Invalid CV file format. Please upload a PDF file.");
      return;
    }
    if (!cvFile) {
      setError("PDF Not Selected");
      return;
  }


    // Prepare form data
    const myForm = new FormData();
    myForm.append("careerPostId", careerPostId);
    myForm.append("applicationFor", applicationFor);
    myForm.append("firstName", firstName);
    myForm.append("lastName", lastName);
    myForm.append("status", "Pending");
    myForm.append("email", email);
    myForm.append("phone", phone);
    myForm.append("linkedinLink", linkedinLink);
    myForm.append("coverLetter", coverLetter);
    myForm.append("cvFile", cvFile);

    // Log the FormData contents
    myForm.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      await dispatch(carrierJobApplication(myForm)).unwrap();
      setError(null);
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("You have already applied for this position.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      {success ? (
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            py={10}
          >
            <Image
              src={successImg}
              width={250}
              height={250}
              alt="Success Image"
            />
            <Typography variant="h4" marginY={3} textAlign="center">
              Application Successful
            </Typography>
            <Typography variant="body1" marginY={3} textAlign="center">
              If you are shortlisted, we will contact you as soon as possible.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/")}
              endIcon={
                <Iconify icon={"lets-icons:back"} width={24} height={24} />
              }
            >
              Back to home
            </Button>
          </Box>
        </Container>
      ) : (
        <Card>
          <Box paddingX={matchesSm ? 3 : 8} paddingY={5}>
            <form onSubmit={handleApply}>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <TextField
                    required
                    onChange={(e) => setApplicationFor(e.target.value)}
                    id="applicationFor"
                    fullWidth
                    value={applicationFor}
                    size={matchesSm ? "small" : "medium"}
                    label="Application For"
                    disabled
                    name="applicationFor"
                    variant="filled"
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={5.8} sx={{ marginTop: "12px" }}>
                  <TextField
                    required
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    name="firstName"
                    label="First Name"
                    variant="filled"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={0.4} />

                <Grid item xs={12} md={5.8} sx={{ marginTop: "12px" }}>
                  <TextField
                    required
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    variant="filled"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} sx={{ marginTop: "12px" }}>
                  <TextField
                    required
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    label="Email Address"
                    name="email"
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} sx={{ marginTop: "12px" }}>
                  <TextField
                    required
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    label="Enter mobile number must have 11 digit"
                    variant="filled"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} sx={{ marginTop: "12px" }}>
                  <TextField
                    required
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    label="Linkedin Profile (https://www.linkedin.com/)"
                    name="linkedinLink"
                    variant="filled"
                    value={linkedinLink}
                    onChange={(e) => setLinkedinLink(e.target.value)}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <br />
                  <TextField
                    required
                    variant="filled"
                    id="outlined-multiline-static"
                    label="Cover Letter in 400 words max 500 words"
                    name="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    InputLabelProps={{
                      style: { color: "#787A80" },
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <br />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                      component="span"
                      variant="contained"
                      onClick={() => fileInputRef.current.click()}
                      style={{ fontSize: matchesSm ? "12px" : "16px" }}
                    >
                      {showFile ? cvFile.name : "Upload Your Resume in PDF"}
                    </Button>
                    <VisuallyHiddenInput
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf"
                      onChange={handleFileChange}
                    />

                    <h4
                      style={{
                        marginLeft: "10px",
                        fontSize: matchesSm ? "12px" : "16px",
                      }}
                    >
                      PDF File Size max 2MB
                    </h4>
                  </div>
                </Grid>
              </Grid>

              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    style={{ color: "green" }}
                    color="success"
                    onChange={() => {
                      setAgree(!agree);
                    }}
                  />
                }
                label={
                  <small>
                    Yes, I have read{" "}
                    <u
                      style={{ fontWeight: "bold" }}
                      onClick={() => router.push("/terms-and-conditions")}
                    >
                      The Job Description
                    </u>{" "}
                    and{" "}
                    <u
                      style={{ fontWeight: "bold" }}
                      onClick={() => router.push("/privacy-policy")}
                    >
                      I Fulfill All The Requirements.
                    </u>
                  </small>
                }
              />

              <Box mb={1} />

              {error && (
                <Typography variant="body1" color="error" gutterBottom>
                  {error}
                </Typography>
              )}

              <Button
                disabled={!agree}
                type="submit"
                color="secondary"
                variant="contained"
                size={matchesSm ? "medium" : "large"}
                fullWidth
                style={{ color: "#FFFF" }}
              >
                APPLY
              </Button>
            </form>
          </Box>
        </Card>
      )}
    </>
  );
};

export default ApplyForm;
