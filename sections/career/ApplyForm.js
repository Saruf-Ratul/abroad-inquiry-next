import Iconify from "@/components/Iconify";
import successImg from "@/public/assets/images/others/success.png";
import { carrierJobApplication } from "@/redux/features/career/careerSlice";
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
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
`;

const ScrollableForm = styled(Box)`
  max-height: 80vh;
  overflow-y: auto;
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
  const [cvFile, setCvFile] = useState(null);
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

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z.\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //  const linkedinRegex = /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/;
    const allowedExtensions = /(\.pdf)$/i;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return "First Name and Last Name must be strings.";
    }

    if (!emailRegex.test(email)) {
      return "Invalid email address.";
    }

    if (phone.length !== 11 || isNaN(Number(phone))) {
      return "Mobile Number must be exactly 11 digits.";
    }

    // const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/.*$/;
    const linkedinRegex = /^[a-zA-Z.\s]+$/;
    if (!linkedinRegex.test(linkedinLink)) {
      setError("Invalid LinkedIn Profile URL.");
      return;
    }

    if (coverLetter.split(/\s+/).length > 500) {
      return "Cover Letter must be a maximum of 500 words.";
    }

    if (!cvFile || !allowedExtensions.exec(cvFile.name)) {
      return "Invalid CV file format. Please upload a PDF file.";
    }

    return null;
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
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
      setError(
        error.response && error.response.status === 409
          ? "You have already applied for this position."
          : "Something went wrong. Please try again later."
      );
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
          <ScrollableForm paddingX={matchesSm ? 3 : 5} paddingY={5}>
            <form onSubmit={handleApply}>
              <Typography variant="h6" pb={2}>
                Application for {applicationFor}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Application For"
                    fullWidth
                    variant="filled"
                    name="applicationFor"
                    value={applicationFor}
                    disabled
                    size={matchesSm ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    required
                    variant="filled"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    size={matchesSm ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    required
                    name="lastName"
                    variant="filled"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    size={matchesSm ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email Address"
                    fullWidth
                    required
                    variant="filled"
                    value={email}
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    size={matchesSm ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mobile Number (11 digits)"
                    fullWidth
                    required
                    name="phone"
                    type="tel"
                    inputProps={{ pattern: "\\d{11}", maxLength: 11 }}
                    variant="filled"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    size={matchesSm ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="LinkedIn Profile"
                    fullWidth
                    required
                    variant="filled"
                    name="linkedin"
                    value={linkedinLink}
                    type="url"
                    onChange={(e) => setLinkedinLink(e.target.value)}
                    size={matchesSm ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Cover Letter (Max 500 words)"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    variant="filled"
                    name="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {showFile ? cvFile.name : "Upload Your Resume (PDF)"}
                  </Button>
                  <VisuallyHiddenInput
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf"
                    name="cvFile"
                    onChange={handleFileChange}
                  />
                  <Typography variant="body2" color="textSecondary">
                    PDF file, max 2MB
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                        color="primary"
                        name="agree"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I have read the{" "}
                        <a onClick={() => router.push("/terms-and-conditions")}>
                          Job Description
                        </a>{" "}
                        and{" "}
                        <u onClick={() => router.push("/privacy-policy")}>
                          Privacy Policy
                        </u>
                        .
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>

              {error && <Typography color="error">{error}</Typography>}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!agree}
                fullWidth
                size="large"
              >
                Apply
              </Button>
            </form>
          </ScrollableForm>
        </Card>
      )}
    </>
  );
};

export default ApplyForm;
