"use client";
import { useState } from "react";
import NextLink from "next/link";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PATH_AUTH } from "@/routes/paths";
import Iconify from "@/components/Iconify";
import { useRouter } from "next/navigation";
import AuthHeader from "@/layouts/auth/MainHeader";
import MainFooter from "@/layouts/main/MainFooter";
import { useFormik } from "formik";

import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userForgetPassword } from "@/redux/features/auth/authSlice";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: "50px",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

let emailValidationschema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export default function ResetPassword() {
  const theme = useTheme();
  const route = useRouter();
  const dispatch = useDispatch();
  const {loading ,isOTPSent} = useSelector((state)=>state.user) 

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailValidationschema,
    onSubmit: (values, { resetForm }) => {
      handleEmailSubmit(values.email);
    },
  });

  const handleEmailSubmit = (email) => {
    let data = { email };
    dispatch(userForgetPassword(data))
  };

  return (
    <>
      <AuthHeader />
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: "auto" }}>
            {!isOTPSent ? (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  style={{ marginTop: 30, marginBottom: "20px" }}
                  onClick={() => route.push("/")}
                  startIcon={
                    <Iconify
                      icon={"lets-icons:refund-back-light"}
                      width={24}
                      height={24}
                    />
                  }
                >
                  Back
                </Button>
                <Typography variant="h3" paragraph>
                  Forgot your password?
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 5 }}>
                  Please enter the email address associated with your account
                  and We will email you a link to reset your password.
                </Typography>

                <form onSubmit={formik.handleSubmit} method="post">
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary },
                    }}
                  />
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    Continue
                  </Button>
                </form>

                <NextLink href={PATH_AUTH.login} passHref>
                  <Button fullWidth size="large" sx={{ mt: 1 }}>
                    Back
                  </Button>
                </NextLink>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  style={{ marginTop: 30, marginBottom: "20px" }}
                  onClick={() => route.push("/")}
                  startIcon={
                    <Iconify
                      icon={"lets-icons:refund-back-light"}
                      width={24}
                      height={24}
                    />
                  }
                >
                  Back
                </Button>

                <Alert severity="success">
                  {`A password reset email has been sent to your email : ${formik.values.email}. `}
                </Alert>
                <br />
                <Typography variant="h4" gutterBottom>
                  Check your email to reset password.
                </Typography>
                <Typography variant="caption">
                  If you are having any issues with your account, please do not
                  hesitate to contact our support team. Thanks!
                </Typography>
              </>
            )}
          </Box>
        </Container>
      </RootStyle>
      <MainFooter />
    </>
  );
}
