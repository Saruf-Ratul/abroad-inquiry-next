"use client";
import Iconify from "@/components/Iconify";
import { fetchCountries } from "@/redux/features/country/countrySlice";
import { STUDENT_APPLY_ABROAD } from "@/services/studentRequests";
import {
  Button,
  Card,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Select,
  Chip,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  Box,
  Container,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import img from "@/public/assets/images/others/study-abroad.webp";
// import { RiArrowGoBackFill } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
// import img from "../../assets/images/study-abroad.webp";

const ApplySuccessContainer = styled(Container)({
  position: "relative",
  overflow: "hidden",
  marginTop: "40px",
  height: "600px",
  width: "100%",
  "&::before": {
    content: '""',
    backgroundColor: "#071213",
    backgroundImage: `url(${img.src})`,
    backgroundBlendMode: "lighten",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.1,
  },
});

function ApplicationApplyForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const form = useRef();
  const [subject, setSubject] = useState("");
  const [whatsapp, setWhatsApp] = useState("");
  const [address, setAddress] = useState("");
  const [program, setProgram] = useState("");
  const [countryName, setCountryName] = useState([]);
  const [moi, setMoi] = useState("");
  const [publication, setPublication] = useState("");
  const [job, setJob] = useState("");
  const [masters, setMasters] = useState({
    institute: "",
    passingYear: "",
    subject: "",
    gpa: "",
  });
  const [bachelor, setBachelor] = useState({
    institute: "",
    passingYear: "",
    subject: "",
    gpa: "",
  });
  const [hsc, setHsc] = useState({
    institute: "",
    passingYear: "",
    subject: "",
    gpa: "",
  });
  const [ssc, setSsc] = useState({
    institute: "",
    passingYear: "",
    subject: "",
    gpa: "",
  });
  const { userInfo } = useSelector((state) => state.user);
  const { countries } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries(1));
  }, [dispatch]);


  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (whatsapp.length !== 11 || isNaN(Number(whatsapp))) {
        setError(`What'sApp Number must be exactly 11 digits.`);
        return;
      }
      if (subject === "") {
        setError(`Please Fill Up Your Interested Subject`);
        return;
      }
      if (address === "") {
        setError(`Please Fill Up Your Address`);
        return;
      }
      if (program === "") {
        setError(`Please Fill Up Your Program`);
        return;
      }
      if (moi === "") {
        setError(`Please Select Your MOI`);
        return;
      }
      if (publication === "") {
        setError(`Please Select Your Publication`);
        return;
      }

      if (hsc.institute === "") {
        setError(`Please Fill Up Your HSC Institute`);
        return;
      }
      if (hsc.passingYear === "") {
        setError(`Please Fill Up Your HSC Passing Year`);
        return;
      }

      if (hsc.subject === "") {
        setError(`Please Fill Up Your HSC Group`);
        return;
      }
      if (hsc.gpa === "") {
        setError(`Please Fill Up Your HSC GPA`);
        return;
      }
      if (ssc.institute === "") {
        setError(`Please Fill Up Your SSC Institute`);
        return;
      }
      if (ssc.passingYear === "") {
        setError(`Please Fill Up Your SSC Passing Year`);
        return;
      }

      if (ssc.subject === "") {
        setError(`Please Fill Up Your SSC Group`);
        return;
      }
      if (ssc.gpa === "") {
        setError(`Please Fill Up Your SSC GPA`);
        return;
      }
      if (countryName?.length === 0) {
        setError(`Please SELECT Your Interested Country`);
        return;
      }

      const data = {
        id: userInfo.id,
        countryName: countryName,
        program: program,
        subject: subject,
        moi: moi,
        masters: {
          institute: masters.institute,
          passingYear: masters.passingYear,
          subject: masters.subject,
          gpa: masters.gpa,
        },
        bachelor: {
          institute: bachelor.institute,
          passingYear: bachelor.passingYear,
          subject: bachelor.subject,
          gpa: bachelor.gpa,
        },
        hsc: {
          institute: hsc.institute,
          passingYear: hsc.passingYear,
          subject: hsc.subject,
          gpa: hsc.gpa,
        },
        ssc: {
          institute: ssc.institute,
          passingYear: ssc.passingYear,
          subject: ssc.subject,
          gpa: ssc.gpa,
        },
        publication: publication,
        job: job,
        whatsapp: whatsapp,
        address: address,
      };
      const response = await STUDENT_APPLY_ABROAD(data);
      setSnackbarOpen(true);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something Wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <div>
        <Snackbar
          open={snackbarOpen}
          severity="success"
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Application Abroad Successfully! If any queries contact our office.
          </Alert>
        </Snackbar>
      </div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginBottom: "50px",
          }}
        >
          <CircularProgress sx={{ color: "black" }} />
        </Box>
      ) : success ? (
        <ApplySuccessContainer
          style={{
            position: "relative",
            overflow: "hidden",
            marginTop: "40px",
            height: "600px",
            width: "100%",
          }}
        >
          <Box margin="auto" textAlign="center" py={5}>
            {/* <img src={Img} alt="" width="20%" height="10%" /> */}
            <Typography variant="h2" marginY={3} textAlign="center">
              Apply Abroad Successful
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              marginY={3}
              textAlign="left"
            >
              Dear Candidates
            </Typography>
            <Typography variant="body1" marginY={3} textAlign="justify">
              Thank you for your interest in higher study abroad via{" "}
              <strong>Abroad Inquiry</strong>. Our team is dedicated to your
              service. We will complete all the processes of university
              application, visa application by experienced mentors. We will
              analyze your profile and suggest you the best option.
            </Typography>
            <Typography variant="body1" marginY={3} textAlign="left">
              Thank you.<br></br>Kind regards,<br></br> Abroad Inquiry.
            </Typography>
            <Button
              variant="contained"
              color="success"
              endIcon={
                <Iconify
                  icon={"icon-park-outline:back"}
                  width={18}
                  height={18}
                />
              }
            >
              Back
            </Button>
          </Box>
        </ApplySuccessContainer>
      ) : (
        <div style={{ marginTop: matchesSm ? "40px" : "0px" }}>
          <Card>
            <Box
              sx={{
                textAlign: "center",
                paddingY: "30px",
              }}
            >
              <Typography variant="h3">Application Abroad</Typography>
            </Box>

            <Box paddingX={matchesSm ? 2 : 8} paddingY={5}>
              <form onSubmit={handleApply} ref={form}>
                <Stack>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={matchesSm ? 12 : 6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel
                            for="program"
                            sx={{
                              color: theme.palette.text.primary,
                              mt: 2,
                              mb: 2,
                            }}
                          >
                            {matchesSm
                              ? "Interested Program?*"
                              : "Which program you are interested in? *"}
                          </InputLabel>
                          <Select
                            sx={{
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "gray",
                                },
                            }}
                            required
                            id="program"
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                          >
                            <MenuItem value="Bachelor">Bachelor</MenuItem>
                            <MenuItem value="Masters">Masters</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid item xs={matchesSm ? 12 : 6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel
                            for="subject"
                            sx={{
                              color: theme.palette.text.primary,
                              mt: 2,
                              mb: 2,
                            }}
                          >
                            {matchesSm
                              ? "Interested Subject?*"
                              : "In which subject are you interested to study? *"}
                          </InputLabel>
                          <TextField
                            sx={{
                              "& label.Mui-focused": {
                                color: "gray",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottomColor: "gray",
                              },
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "gray",
                                },
                                "&:hover fieldset": {
                                  borderColor: "gray",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "gray",
                                },
                              },
                            }}
                            required
                            onChange={(e) => setSubject(e.target.value)}
                            id="subject"
                            fullWidth
                            value={subject}
                            name="subject"
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    style={{ marginTop: "10px" }}
                  >
                    <Grid item xs={matchesSm ? 12 : 6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel
                            for="categories-dropdown"
                            sx={{
                              color: theme.palette.text.primary,
                              mt: 2,
                              mb: 2,
                            }}
                          >
                            {matchesSm
                              ? "MOI Certificate?*"
                              : "Do you have an MOI Certificate?*"}
                          </InputLabel>
                          <Select
                            sx={{
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "gray",
                                },
                            }}
                            required
                            id="moi"
                            value={moi}
                            onChange={(e) => setMoi(e.target.value)}
                          >
                            <MenuItem value="YES">YES</MenuItem>
                            <MenuItem value="NO">No</MenuItem>
                          </Select>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid item xs={matchesSm ? 12 : 6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel
                            for="title"
                            sx={{
                              color: theme.palette.text.primary,
                              mt: 2,
                              mb: 2,
                            }}
                          >
                            {matchesSm
                              ? "Any Publications?*"
                              : "Do you have any publications?*"}
                          </InputLabel>
                          <Select
                            sx={{
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "gray",
                                },
                            }}
                            required
                            id="publication"
                            value={publication}
                            onChange={(e) => setPublication(e.target.value)}
                          >
                            <MenuItem value="YES">YES</MenuItem>
                            <MenuItem value="NO">No</MenuItem>
                          </Select>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    style={{ marginTop: "10px" }}
                  >
                    <Grid item xs={matchesSm ? 12 : 6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel
                            for="categories-dropdown"
                            sx={{
                              color: theme.palette.text.primary,
                              mt: 2,
                              mb: 2,
                            }}
                          >
                            {matchesSm
                              ? "Any Job Experience"
                              : "Do you have any Job Experience Certificate?"}
                          </InputLabel>
                          <Select
                            sx={{
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "gray",
                                },
                            }}
                            required
                            id="job"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                          >
                            <MenuItem value="YES">YES</MenuItem>
                            <MenuItem value="NO">No</MenuItem>
                          </Select>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid item xs={matchesSm ? 12 : 6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel
                            for="whatapp"
                            sx={{
                              color: theme.palette.text.primary,
                              mt: 2,
                              mb: 2,
                            }}
                          >
                            {matchesSm
                              ? "WhatsApp number?*"
                              : "What is your WhatsApp number?*"}
                          </InputLabel>
                          <TextField
                            sx={{
                              "& label.Mui-focused": {
                                color: "gray",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottomColor: "gray",
                              },
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "gray",
                                },
                                "&:hover fieldset": {
                                  borderColor: "gray",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "gray",
                                },
                              },
                            }}
                            required
                            onChange={(e) => setWhatsApp(e.target.value)}
                            id="whatsApp"
                            fullWidth
                            value={whatsapp}
                            name="whatsApp"
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    style={{ marginTop: "10px" }}
                  >
                    <Grid item xs={matchesSm ? 12 : 6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel
                            for="title"
                            sx={{
                              color: theme.palette.text.primary,
                              mt: 2,
                              mb: 2,
                            }}
                          >
                            {matchesSm
                              ? "Interested Country?*"
                              : "Which country you are interested in?*"}
                          </InputLabel>
                          <Select
                            sx={{
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "gray",
                                },
                            }}
                            required
                            multiple
                            value={countryName}
                            onChange={(e) => setCountryName(e.target.value)}
                            renderValue={(selected) => (
                              <Stack gap={1} direction="row" flexWrap="wrap">
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={value}
                                    onDelete={() =>
                                      setCountryName(
                                        countryName.filter(
                                          (item) => item !== value
                                        )
                                      )
                                    }
                                    deleteIcon={
                                      <Iconify
                                        icon={
                                          "material-symbols-light:cancel-rounded"
                                        }
                                        width={24}
                                        height={24}
                                      />
                                    }
                                  />
                                ))}
                              </Stack>
                            )}
                          >
                            {countries?.map((item) => (
                              <MenuItem
                                key={item.countryId}
                                value={item.countryName}
                                sx={{ justifyContent: "space-between" }}
                              >
                                {item.countryName}
                                {countryName.includes(item.countryName) ? (
                                  <Iconify
                                    icon={"material-symbols-light:check"}
                                    width={24}
                                    height={24}
                                  />
                                ) : null}
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid item xs={matchesSm ? 12 : 6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel
                            for="address"
                            sx={{
                              color: theme.palette.text.primary,
                              mt: 2,
                              mb: 2,
                            }}
                          >
                            {matchesSm
                              ? "Your Address?*"
                              : "What is your address?*"}
                          </InputLabel>
                          <TextField
                            sx={{
                              "& label.Mui-focused": {
                                color: "gray",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottomColor: "gray",
                              },
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "gray",
                                },
                                "&:hover fieldset": {
                                  borderColor: "gray",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "gray",
                                },
                              },
                            }}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            id="address"
                            fullWidth
                            value={address}
                            name="address"
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid sx={12} style={{ marginTop: "15px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: matchesSm ? "column" : "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        style={{ width: "200px", marginBottom: "17px" }}
                      >
                        Masters program:{" "}
                      </Typography>
                      <div>
                        <TextField
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
                          InputLabelProps={{
                            style: {
                              fontSize: matchesSm ? "12px" : "16px",
                            },
                          }}
                          onChange={(e) =>
                            setMasters((prev) => ({
                              ...prev,
                              institute: e.target.value,
                            }))
                          }
                          id="institute"
                          fullWidth
                          value={masters.institute}
                          name="institute"
                          label="Institute"
                          variant="outlined"
                        />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <TextField
                            sx={{
                              marginTop: "10PX",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            onChange={(e) =>
                              setMasters((prev) => ({
                                ...prev,
                                subject: e.target.value,
                              }))
                            }
                            id="subject"
                            fullWidth
                            value={masters.subject}
                            name="subject"
                            label="Subject"
                            variant="outlined"
                          />

                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            onChange={(e) =>
                              setMasters((prev) => ({
                                ...prev,
                                passingYear: e.target.value,
                              }))
                            }
                            id="passingYear"
                            fullWidth
                            value={masters.passingYear}
                            name="passingYear"
                            label="Passing Year"
                            variant="outlined"
                          />

                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            onChange={(e) =>
                              setMasters((prev) => ({
                                ...prev,
                                gpa: e.target.value,
                              }))
                            }
                            id="cgpa"
                            fullWidth
                            value={masters.gpa}
                            name="cgpa"
                            label="CGPA"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid sx={12} style={{ marginTop: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: matchesSm ? "column" : "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        style={{ width: "200px", marginBottom: "7px" }}
                      >
                        Bachelor program :{" "}
                      </Typography>
                      <div>
                        <TextField
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
                          InputLabelProps={{
                            style: {
                              fontSize: matchesSm ? "12px" : "16px",
                            },
                          }}
                          onChange={(e) =>
                            setBachelor((prev) => ({
                              ...prev,
                              institute: e.target.value,
                            }))
                          }
                          id="institute"
                          fullWidth
                          value={bachelor.institute}
                          name="institute"
                          label="Institute"
                          variant="outlined"
                        />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            onChange={(e) =>
                              setBachelor((prev) => ({
                                ...prev,
                                subject: e.target.value,
                              }))
                            }
                            id="subject"
                            fullWidth
                            value={bachelor.subject}
                            name="subject"
                            label="Subject"
                            variant="outlined"
                          />

                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            onChange={(e) =>
                              setBachelor((prev) => ({
                                ...prev,
                                passingYear: e.target.value,
                              }))
                            }
                            id="passingYear"
                            fullWidth
                            value={bachelor.passingYear}
                            name="passingYear"
                            label="Passing Year"
                            variant="outlined"
                          />

                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            onChange={(e) =>
                              setBachelor((prev) => ({
                                ...prev,
                                gpa: e.target.value,
                              }))
                            }
                            id="gpa"
                            fullWidth
                            value={bachelor.gpa}
                            name="gpa"
                            label="CGPA"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid sx={12} style={{ marginTop: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: matchesSm ? "column" : "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        style={{ width: "200px", marginBottom: "7px" }}
                      >
                        HSC exam ?* :{" "}
                      </Typography>
                      <div>
                        <TextField
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
                          InputLabelProps={{
                            style: {
                              fontSize: matchesSm ? "12px" : "16px",
                            },
                          }}
                          required
                          onChange={(e) =>
                            setHsc((prev) => ({
                              ...prev,
                              institute: e.target.value,
                            }))
                          }
                          id="Institute"
                          fullWidth
                          value={hsc.institute}
                          name="institute"
                          label="Institute"
                          variant="outlined"
                        />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            required
                            onChange={(e) =>
                              setHsc((prev) => ({
                                ...prev,
                                subject: e.target.value,
                              }))
                            }
                            id="subject"
                            fullWidth
                            value={hsc.subject}
                            name="subject"
                            label="Group"
                            variant="outlined"
                          />

                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            required
                            onChange={(e) =>
                              setHsc((prev) => ({
                                ...prev,
                                passingYear: e.target.value,
                              }))
                            }
                            id="passing Year"
                            fullWidth
                            value={hsc.passingYear}
                            name="passingYear"
                            label="Passing Year"
                            variant="outlined"
                          />

                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            required
                            onChange={(e) =>
                              setHsc((prev) => ({
                                ...prev,
                                gpa: e.target.value,
                              }))
                            }
                            id="gpa"
                            fullWidth
                            value={hsc.gpa}
                            name="gpa"
                            label="GPA"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid sx={12} style={{ marginTop: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: matchesSm ? "column" : "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        style={{ width: "200px", marginBottom: "7px" }}
                      >
                        SSC exam ?* :{" "}
                      </Typography>
                      <div>
                        <TextField
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
                          InputLabelProps={{
                            style: {
                              fontSize: matchesSm ? "12px" : "16px",
                            },
                          }}
                          required
                          onChange={(e) =>
                            setSsc((prev) => ({
                              ...prev,
                              institute: e.target.value,
                            }))
                          }
                          id="institute"
                          fullWidth
                          value={ssc.institute}
                          name="institute"
                          label="Institute"
                          variant="outlined"
                        />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            required
                            onChange={(e) =>
                              setSsc((prev) => ({
                                ...prev,
                                subject: e.target.value,
                              }))
                            }
                            id="subject"
                            fullWidth
                            value={ssc.subject}
                            name="subject"
                            label="Group"
                            variant="outlined"
                          />

                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            required
                            onChange={(e) =>
                              setSsc((prev) => ({
                                ...prev,
                                passingYear: e.target.value,
                              }))
                            }
                            id="passingYear"
                            fullWidth
                            value={ssc.passingYear}
                            name="passingYear"
                            label="Passing Year"
                            variant="outlined"
                          />

                          <TextField
                            sx={{
                              marginTop: "10px",
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
                            InputLabelProps={{
                              style: {
                                fontSize: matchesSm ? "12px" : "16px",
                              },
                            }}
                            required
                            onChange={(e) =>
                              setSsc((prev) => ({
                                ...prev,
                                gpa: e.target.value,
                              }))
                            }
                            id="gpa"
                            fullWidth
                            value={ssc.gpa}
                            name="gpa"
                            label="GPA"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Stack>

                {error && (
                  <Typography variant="body1" color="error" gutterBottom>
                    {error}
                  </Typography>
                )}

                <Box
                  sx={{
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size={matchesSm ? "medium" : "large"}
                    style={{
                      color: "#FFFF",
                      marginTop: "20px",
                      width: "400px",
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Card>
        </div>
      )}
    </>
  );
}

export default ApplicationApplyForm;
