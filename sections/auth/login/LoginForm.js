"use client";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import NextLink from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Checkbox,
  useTheme,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Divider,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { PATH_AUTH } from "@/routes/paths";
import useIsMountedRef from "@/hooks/useIsMountedRef";
import { useRouter } from "next/navigation";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import Iconify from "@/components/Iconify";
import { fetchUserInfo, userLogin } from "@/redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/firebaseConfig";
import { STUDENT_SIGNUP_CALL } from "@/services/studentRequests";
import Loading from "@/app/loading";

export default function LoginForm() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); 
  const [message,setMessage] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError: setFormError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(userLogin(data)).unwrap();
      router.push("/");
    } catch (err) {
      reset();
      setMessage("Email and Password didn't match!")
      setError(err.message || "An error occurred during login.");
      if (isMountedRef.current) {
        setFormError("afterSubmit", { type: "manual", message: err.message });
      }
    }
  };

  const SignUpUsingGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        if (user) {
          let data = {
            email: user.email,
            name: user.displayName,
            password: String(user.uid).concat("@"),
          };

          STUDENT_SIGNUP_CALL(data)
            .then((res) => {
              setLoading(false);
              let token = res.data.token;
              let userId = res.data.userId;
              Cookies.set("token", token, { expires: 7, secure: true });
              Cookies.set("userId", userId, { expires: 7, secure: true });
              Cookies.set("userStatus", "student", {
                expires: 7,
                secure: true,
              });
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                window.location.reload();
              }, "1000");
            })
            .catch((err) => {
              setLoading(true);
              if (err.response && err.response.status === 422) {
                let data = {
                  email: user.email,
                  password: String(user.uid).concat("@"),
                };
                dispatch(userLogin(data)).unwrap();
                setTimeout(() => {
                  setLoading(false);
                  window.location.reload();
                }, "2000");
              }
            });
        } else {
          console.log("User data not available");
        }
      })
      .catch((error) => {
        console.log("Error signing in with Google:", error);
      });
  };

  return (
    <>
      {error && (
        <Box mb={2} mt={2}>
          <Alert style={{ textAlign: "center" }} severity="error">
            Email and Password didn't match!
          </Alert>
        </Box>
      )}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField
            name="email"
            label="Email address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"tabler:mail"} width={24} height={24} />
                </InputAdornment>
              ),
              style: {
                width: "100%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.paper
                    : theme.palette.background.default,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
              },
            }}
            FormHelperTextProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
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

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"mdi:lock-outline"} width={24} height={24} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                width: "100%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.paper
                    : theme.palette.background.default,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
              },
            }}
            FormHelperTextProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            name="checked"
            control={
              <Checkbox
                checked={checked}
                onClick={() => setChecked(!checked)}
                size="small"
                style={{ color: theme.palette.success.main }}
              />
            }
            label={<>Remember me</>}
          />
          <Link
            component={NextLink}
            variant="subtitle2"
            style={{
              color: theme.palette.mode === "dark" ? "white" : "black",
            }}
            href={PATH_AUTH.forgetPassword}
            passHref
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="outlined"
          color="success"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          my={2}
          color="#04223F"
        >
          <Divider
            sx={{
              width: "5%",
              backgroundColor:
                theme.palette.mode === "dark" ? "white" : "#04223F",
              height: 2,
              marginRight: "10px",
            }}
          />
          <Typography
            variant="body2"
            style={{
              color: theme.palette.mode === "dark" ? "white" : "black",
            }}
          >
            OR
          </Typography>
          <Divider
            sx={{
              width: "5%",
              backgroundColor:
                theme.palette.mode === "dark" ? "white" : "#04223F",
              height: 2,
              marginLeft: "10px",
            }}
          />
        </Box>
        <LoadingButton
          loading={loading}
          onClick={SignUpUsingGoogle}
          variant="contained"
          startIcon={
            loading ? null : (
              <Iconify
                icon={"flat-color-icons:google"}
                width={24}
                height={24}
              />
            )
          }
          size="large"
          fullWidth
          style={{
            textAlign: "left",
            backgroundColor: "#022552",
            color: "white",
          }}
        >
          {loading ? null : "Google"}
        </LoadingButton>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Alert
            severity="info"
            sx={{
              fontSize: 10,
              backgroundColor: "#FFFF",
            }}
          >
            Google login is only available for students.
          </Alert>
        </Box>
      </FormProvider>
    </>
  );
}
