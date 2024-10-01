"use client";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import Iconify from "@/components/Iconify";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userResetPassword } from "@/redux/features/auth/authSlice";
import { RESET_PASSWORD_CALL } from "@/services/studentRequests";

// Validation schema using Yup
const passwordValidationschema = yup.object().shape({
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password Required")
    .oneOf([yup.ref("password"), null], "Both passwords must match"),
});

function ResetPassword() {
  const dispatch = useDispatch();
  const matchSm = useMediaQuery("(min-width:600px)");
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  // const { loading, resetPass, error } = useSelector((state) => state.user);
  const uid = searchParams.get("uid");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationschema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const data = {
        password: values.password,
        confirmPassword: values.confirmPassword,
        uid: uid,
      };
      // dispatch(userResetPassword(data));

      RESET_PASSWORD_CALL(data)
      .then((res) => {
        setResetSuccess(true); 
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

      resetForm(); 
    },
  });

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ margin: matchSm ? "180px auto" : "100px 0px" }}
      >
        <Card
          sx={{
            paddingX: matchSm ? "150px" : "20px",
            paddingY: matchSm ? "50px" : "20px",
          }}
        >
          <Typography variant="h2" textAlign={"center"}>
           Reset Password
          </Typography>

          {!resetSuccess ? (
            <form
              onSubmit={formik.handleSubmit}
              method="post"
              style={{
                marginLeft: matchSm ? "80px" : "20px",
                marginRight: matchSm ? "80px" : "20px",
              }}
            >
              <Typography textAlign={"center"} variant="subtitle1">
                Set your new password
              </Typography>
              <br />
              <br />
              {error && (
                <Box mb={2} mt={2}>
                  <Alert style={{ textAlign: "center" }} severity="error">
                    {error}
                  </Alert>
                </Box>
              )}
              <br />
              <br />
              <TextField
                id="password"
                type={showPassword.password ? "text" : "password"}
                label="Password"
                variant="filled"
                fullWidth
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputLabelProps={{
                  style: { color: "black" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            password: !showPassword.password,
                          })
                        }
                        edge="end"
                      >
                        {showPassword.password ? (
                          <Iconify icon={"eva:eye-fill"} />
                        ) : (
                          <Iconify icon={"eva:eye-off-fill"} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <br />
              <TextField
                id="confirmPassword"
                type={showPassword.confirmPassword ? "text" : "password"}
                label="Confirm Password"
                variant="filled"
                fullWidth
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputLabelProps={{
                  style: { color: "black" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            confirmPassword: !showPassword.confirmPassword,
                          })
                        }
                        edge="end"
                      >
                        {showPassword.confirmPassword ? (
                          <Iconify icon={"eva:eye-fill"} />
                        ) : (
                          <Iconify icon={"eva:eye-off-fill"} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <br />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                Continue
              </Button>
            </form>
          ) : (
            <Box textAlign="center">
              <br />
              <Typography pt={1}>Your password has been updated!</Typography>
              <br />
              <Button
                variant="contained"
                style={{ width: 200 }}
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
            </Box>
          )}
        </Card>
      </Container>
    </>
  );
}

export default ResetPassword;
