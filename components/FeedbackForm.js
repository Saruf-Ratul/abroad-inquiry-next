import emailjs from "@emailjs/browser";
import {
  Alert,
  Button,
  Card,
  Grid,
  Snackbar,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter your Name").required("Name is required"),
  phone: yup.string("Enter your Phone").required("Phone is required"),
  problem: yup.string("Enter your problem").required("Problem is required"),
  suggestions: yup
    .string("Enter your suggestions")
    .required("Suggestions is required"),
});

function FeedbackForm({ setFormOpen }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [severity, setSeverity] = useState("success"); // New severity state for Snackbar
  const matchesSm = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const form = useRef();

  const handleClose = () => {
    setOpen(false);
  };

  const sendEmail = (values, resetForm) => {
    setLoading(true); // Set loading to true on submit
    emailjs
      .sendForm(
        "service_jedhcvp",
        "template_jdbm58f",
        form.current,
        "user_4KpXNpaBasqQfzUWutRrB"
      )
      .then(
        () => {
          resetForm();
          setMessage("Thank you for your valuable feedback!");
          setSeverity("success"); // Set severity to success
          setOpen(true);

          // Set the form to close after 30 seconds
          setTimeout(() => {
            setFormOpen(false);
          }, 2000); // 30 seconds
        },
        () => {
          setMessage("Error! Please try again.");
          setSeverity("error"); // Set severity to error
          setOpen(true);
        }
      )
      .finally(() => {
        setLoading(false); // Set loading to false after completion
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      problem: "",
      suggestions: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      sendEmail(values, resetForm);
      handleClose(); // Close dialog after submission
    },
  });

  return (
    <Card
      sx={{
        p: matchesSm ? 2 : 5,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        borderRadius: "15px",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <form ref={form} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="problem"
              name="problem"
              label="Problem"
              multiline
              rows={4} // Set rows for multiline
              value={formik.values.problem}
              onChange={formik.handleChange}
              error={formik.touched.problem && Boolean(formik.errors.problem)}
              helperText={formik.touched.problem && formik.errors.problem}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="suggestions"
              name="suggestions"
              label="Suggestions"
              multiline
              rows={4} // Set rows for multiline
              value={formik.values.suggestions}
              onChange={formik.handleChange}
              error={
                formik.touched.suggestions && Boolean(formik.errors.suggestions)
              }
              helperText={
                formik.touched.suggestions && formik.errors.suggestions
              }
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading} // Disable button when loading
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {loading ? "Submitting..." : "Submit Feedback"}{" "}
              {/* Change button text */}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default FeedbackForm;
