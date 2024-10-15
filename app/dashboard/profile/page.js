"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
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
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import CustomizedSnackbars from "@/components/SnackBar";
import { profileInputData } from "@/data/profileData";
import MentorController from "@/services/controllers/mentor";
import StudentController from "@/services/controllers/student";
import { useUser } from "@/contexts/UserContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { GET_ALL_COUNTRY_NAME } from "@/services/countryRequests";
import { UPDATE_MENTOR_DATA } from "@/services/mentorRequests";
import { UPDATE_STUDENT_INFO } from "@/services/studentRequests";
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
  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [loggedInUser, setLoggedInUser] = user;
  const [error, setError] = useState();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = React.useState(false);
  const [openState, setOpenState] = useState(false);
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState("");
  const [country, setCountry] = useState([]);

  useEffect(() => {
    GET_ALL_COUNTRY_NAME()
      .then((res) => {
        setCountry(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (loggedInUser.userStatus === "student") {
      StudentController.GET_STUDENT_INFO_CALL(
        setUserData,
        setLoading,
        setError
      );
      setMessage("Your profile update is successful");
      setAlert("Your profile information will be updated");
    } else if (loggedInUser.userStatus === "mentor") {
      MentorController.GET_MENTOR_INFO_CALL(setUserData, setLoading, setError);
      setMessage(
        "You have applied to update your profile. Please wait for approval."
      );
      setAlert(
        "You profile update request will be submitted to the admins for approval"
      );
    } else {
    }
  }, [loggedInUser.userStatus]);

  //============{ for alert dialog component} =======================
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = { ...userData };
  initialValues.responsibleFor = Array.isArray(initialValues.responsibleFor)
    ? initialValues.responsibleFor
    : [];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: (values) => {
      const data = {
        ...values,
        phone: JSON.stringify(values.phone),
      };

      if (loggedInUser.userStatus === "mentor") {
        UPDATE_MENTOR_DATA(data)
          .then((res) => {
            setOpen(!open);
            setEditProfile(!editProfile);
            setOpenState(!openState);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (loggedInUser.userStatus === "student") {
        UPDATE_STUDENT_INFO(data)
          .then((res) => {
            setOpen(!open);
            setEditProfile(!editProfile);
            setOpenState(!openState);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  });

  return loading ? (
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
    <>
      <Box>
        <Container maxWidth="lg">
          <form>
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
                    startIcon={
                      <Iconify
                        icon={"ic:round-cancel"}
                        width={18}
                        height={18}
                      />
                    }
                    variant="outlined"
                    style={{ border: "1px solid #02172C", marginRight: 10 }}
                    onClick={() => setEditProfile(!editProfile)}
                    size="small"
                  >
                    Cancel
                  </Button>
                  <Button
                    startIcon={
                      <Iconify
                        icon={"icon-park-outline:correct"}
                        width={18}
                        height={18}
                      />
                    }
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
                        style={{ color: "#3c3c3c" }}
                      >
                        {alert}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        startIcon={
                          <Iconify
                            icon={"ic:round-cancel"}
                            width={18}
                            height={18}
                          />
                        }
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        // type='submit'
                        startIcon={
                          <Iconify
                            icon={"game-icons:confirmed"}
                            width={18}
                            height={18}
                          />
                        }
                        onClick={(handleClose, formik.handleSubmit)}
                        autoFocus
                      >
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              ) : (
                <Button
                  startIcon={
                    <Iconify icon={"mage:edit"} width={18} height={18} />
                  }
                  variant="contained"
                  onClick={() => setEditProfile(!editProfile)}
                  size="small"
                >
                  Edit {!matchesSm && "Profile"}
                </Button>
              )}
            </Box>
            <Grid container spacing={3}>
              {profileInputData(loggedInUser.userStatus).map((data, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Label htmlFor={data.name}>{data.title}</Label>
                  {data.type === "phoneInput" ? (
                    <>
                      <PhoneInput
                        value={
                          userData[data.name]
                            ? `${formik?.values[data.name]?.dialCode || ""}${
                                formik?.values[data.name]?.phoneNumber || ""
                              }`
                            : "+880"
                        }
                        inputStyle={{
                          backgroundColor: editProfile ? "#FFF" : "#ededed",
                          width: "100%",
                        }}
                        disabled={!editProfile}
                        onChange={(phoneNumber = "", country = {}) => {
                          // Ensure phoneNumber is a string before using substring
                          if (typeof phoneNumber !== "string") {
                            console.error("Phone number must be a string.");
                            return;
                          }

                          const dialCode = `+${country?.dialCode || ""}`; // Safely get the dial code
                          const formattedPhoneNumber = phoneNumber.startsWith(
                            dialCode
                          )
                            ? phoneNumber.substring(dialCode.length)
                            : phoneNumber;

                          const data = {
                            countryCode: country?.countryCode || "",
                            dialCode,
                            phoneNumber: formattedPhoneNumber,
                          };

                          formik.setFieldValue(data.name, data);
                        }}
                      />
                    </>
                  ) : data.type === "countryDropdown" ? (
                    <Select
                      size={matchesSm ? "small" : "medium"}
                      fullWidth
                      id={data.name}
                      name={data.name}
                      defaultValue={formik.values[data.name]}
                      value={formik.values[data.name]}
                      onChange={formik.handleChange}
                      disabled={!editProfile}
                      edit={editProfile}
                      sx={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "white"
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
                      multiple={data?.multiple}
                      disabled={!editProfile}
                      edit={editProfile}
                      name={data.name}
                      defaultValue={formik.values[data.name] || []}
                      value={[formik.values[data.name]] || []}
                      onChange={formik.handleChange}
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
                            ? "white"
                            : theme.palette.background.default,
                      }}
                    >
                      {data.options.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          defaultValue={formik.values[data.name]}
                        >
                          {option.label ? option.label : option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : data.type === "mentoringFor" ? (
                    <Select
                      size={matchesSm ? "small" : "medium"}
                      fullWidth
                      multiple={data?.multiple}
                      disabled={!editProfile}
                      edit={editProfile}
                      name={data.name}
                      value={formik.values[data.name] || []}
                      onChange={formik.handleChange}
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
                            ? "white"
                            : theme.palette.background.default,
                      }}
                    >
                      {data.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label ? option.label : option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : data.type === "responsibleFor" ? (
                    <Select
                      size={matchesSm ? "small" : "medium"}
                      fullWidth
                      multiple={data?.multiple}
                      disabled={!editProfile}
                      edit={editProfile}
                      name={data.name}
                      value={formik.values[data.name] || []}
                      onChange={formik.handleChange}
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
                            ? "white"
                            : theme.palette.background.default,
                      }}
                    >
                      {country.map((option) => (
                        <MenuItem
                          key={option.countryId}
                          value={option.countryId}
                        >
                          {option.countryName}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <InputField
                      id={data.name}
                      name={data.field}
                      onChange={formik.handleChange}
                      defaultValue={formik.values[data.name]}
                      disabled={!editProfile || data.disabled}
                      edit={editProfile}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </form>
        </Container>
        {openState && (
          <CustomizedSnackbars
            message={message}
            severity={"success"}
            openstate={openState}
            setOpenState={setOpenState}
          />
        )}
      </Box>
    </>
  );
}

export default Profile;
