"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentProfileInfo,
  updateStudentProfile,
} from "@/redux/features/student/studentSlice";
import {
  fetchMentorProfileInfo,
  updateMentorProfile,
} from "@/redux/features/mentor/mentorSlice";
import { profileInputData } from "@/data/profileData";
import withAuth from "@/sections/auth/withAuth";
import Image from "next/image";
import Iconify from "@/components/Iconify";

const InputField = styled("input")((props) => ({
  backgroundColor: props.edit ? "#FFF" : "#ededed",
  border: props.edit ? "1px solid grey" : "none",
  width: "100%",
  margin: "0px",
  padding: "15px 10px",
  fontSize: "16px",
  borderRadius: "5px",
  "&:focus": {
    outline: "none",
  },
}));

const Label = styled("label")((props) => ({
  paddingLeft: "8px",
  display: "block",
  textTransform: "uppercase",
  fontSize: "13px",
  fontWeight: 600,
  marginBottom: 5,
  color: "grey",
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
}));

function Profile() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { studentProfileInfo, loading } = useSelector((state) => state.student);
  const { mentorProfileInfo } = useSelector((state) => state.mentors);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchStudentProfileInfo());
    dispatch(fetchMentorProfileInfo());
  }, [dispatch]);

  const [editProfile, setEditProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const matchesSm = useMediaQuery("(max-width:600px)");

  const initialValues = {
    ...studentProfileInfo,
    ...mentorProfileInfo,
    phone:
      studentProfileInfo?.phone?.dialCode +
        studentProfileInfo?.phone?.phoneNumber ||
      mentorProfileInfo?.phone?.dialCode +
        mentorProfileInfo?.phone?.phoneNumber ||
      "",
  };

  useEffect(() => {
    if (studentProfileInfo) {
      setAlert("Your profile information will be updated");
    }

    if (mentorProfileInfo) {
      setAlert(
        "You profile update request will be submitted to the admins for approval"
      );
    }
  }, [studentProfileInfo, mentorProfileInfo]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      const data = {
        ...values,
        phone: JSON.stringify(values.phone),
      };

      try {
        if (studentProfileInfo) {
          await dispatch(updateStudentProfile(data)).unwrap();
          setMessage("Your profile update is successful");
        } else if(mentorProfileInfo) {
          setMessage("")
          await dispatch(updateMentorProfile(data)).unwrap();
          setMessage(
            "You have applied to update your profile. Please wait for approval."
          );
        }
        setOpenState(true);
        setOpen(false);
        setEditProfile(false);
      } catch (error) {
        // console.error(error);
        setAlert("Failed to update profile. Please try again.");
        setOpenState(true);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ m: 4 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            mt: 12,
          }}
        >
          <CircularProgress
            sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
          />
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginY={2}
          >
            <Typography variant={matchesSm ? "body1" : "h4"}>
              User Details
            </Typography>
            {editProfile ? (
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  style={{ marginRight: 10 }}
                  onClick={() => setEditProfile(!editProfile)}
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  style={{ backgroundColor: "#008357" }}
                  size="small"
                >
                  Save
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Update and save profile?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      // style={{ color: "#3c3c3c" }}
                    >
                      {alert}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      color="success"
                      onClick={formik.handleSubmit}
                      autoFocus
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => setEditProfile(!editProfile)}
                size="small"
                startIcon={<Iconify icon={"bx:edit"} width={18} height={18} />}
              >
                Edit {!matchesSm && "Profile"}
              </Button>
            )}
          </Box>
          <Grid container spacing={3}>
            {profileInputData(userInfo.userStatus).map((data, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Label htmlFor={data.name}>{data.title}</Label>
                {data.type === "phoneInput" ? (
                  <PhoneInput
                    country={
                      studentProfileInfo?.phone?.countryCode.toLowerCase() ||
                      undefined
                    }
                    inputStyle={{
                      backgroundColor: editProfile ? "#FFF" : "#ededed",
                      width: "100%",
                    }}
                    disabled={!editProfile}
                    value={formik.values.phone}
                    onChange={(phone, country) => {
                      let phoneData = {
                        countryCode: country?.countryCode,
                        dialCode: "+" + country?.dialCode,
                        phoneNumber: phone.slice(country?.dialCode.length),
                      };
                      formik.setFieldValue(
                        "phone",
                        phoneData.dialCode + phoneData.phoneNumber
                      );
                    }}
                  />
                ) : data.type === "countryDropdown" ? (
                  <Select
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    id={data.name}
                    name={data.name}
                    value={formik.values[data.name]}
                    onChange={formik.handleChange}
                    disabled={!editProfile}
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
                              <Image
                                width={35}
                                height={20} // Adjust as needed to maintain aspect ratio
                                loading="lazy"
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
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
                ) : data.type === "dropdown" ? (
                  <Select
                    size={matchesSm ? "small" : "medium"}
                    fullWidth
                    multiple={data.multiple}
                    disabled={!editProfile}
                    name={data.name}
                    value={formik?.values[data.name]}
                    onChange={formik.handleChange}
                  >
                    {data.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label ? option.label : option.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <InputField
                    id={data.name}
                    name={data.name}
                    onChange={formik.handleChange}
                    value={formik.values[data.name]}
                    disabled={!editProfile || data.disabled}
                    edit={editProfile}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </form>
      )}
      {openState && (
        <div>
          <Snackbar
            open={openState}
            autoHideDuration={5000}
            onClose={handleClose}
            message={message}
          />
        </div>
      )}
    </Box>
  );
}

export default withAuth(Profile);
