"use client";
import { fetchSingleCareer } from "@/redux/features/career/careerSlice";
import {
  Box,
  Card,
  Typography,
  CardActions,
  Button,
  Container,
  CircularProgress,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import ApplyForm from "@/sections/career/ApplyForm";

function CareerDetail({ params }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { career, loading } = useSelector((state) => state.careers);

  useEffect(() => {
    if (params.slug) {
      dispatch(fetchSingleCareer(params.slug));
    }
  }, [dispatch, params.slug]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginTop: "130px" }}>
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
        <Container sx={{ marginTop: "50px" }}>
          <Box my={5} sx={{ mt: 8, mb: 4 }}>
            <Card>
              <Box m={3}>
                <Typography component="div" variant="h2" mt={2} mb={2}>
                  {career.title}
                </Typography>
              </Box>

              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Vacancy:</strong> {career.vacancy}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography
                  component="div"
                  variant="p"
                  mt={2}
                  mb={2}
                  sx={{ textAlign: "justify" }}
                >
                  <strong>Job Context:</strong> {career.jobContext}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography
                  component="div"
                  variant="p"
                  mt={2}
                  mb={2}
                  sx={{ textAlign: "justify" }}
                >
                  <strong>Job Responsibilities:</strong>{" "}
                  {career.responsibilities}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Employment Status:</strong> {career.status}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Educational Requirements:</strong> {career.education}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Experience Requirements:</strong> {career.experience}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Age:</strong> {career.age}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Gender:</strong> {career.gender}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Workplace:</strong> {career.workPlace}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Location:</strong> {career.location}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Salary:</strong> Negotiable
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Salary Review:</strong> Yearly
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Festival Bonus:</strong> {career.bonus}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Compensation & other benefits:</strong>{" "}
                  {career.benefit}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography component="div" variant="p" mt={2} mb={2}>
                  <strong>Application Deadline:</strong> {career.deadline}
                </Typography>
              </Box>
              <Box m={3}>
                <Typography
                  component="div"
                  variant="p"
                  mt={2}
                  mb={2}
                  align="center"
                >
                  <strong>Read Before Apply</strong>
                </Typography>
                <Typography
                  component="div"
                  variant="p"
                  mt={2}
                  mb={2}
                  sx={{ textAlign: "justify" }}
                >
                  {career.description}
                </Typography>
              </Box>
              <CardActions sx={{ marginBottom: "50px" }}>
                <Button
                  sx={{ m: "auto", mb: 0 }}
                  size="large"
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Container>
      )}

      <>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <ApplyForm title={career.title} careerPostId={career.careerPostId} handleClose={handleClose} />
        </Dialog>
      </>
    </div>
  );
}

export default CareerDetail;
