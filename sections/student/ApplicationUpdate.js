"use client";
import React, { useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentApplicationUpdate } from "@/redux/features/student/studentSlice";

const ApplicationUpdate = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, applicationUpdate } = useSelector((state) => state.student);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchStudentApplicationUpdate(userInfo.id));
  }, [dispatch]);

  const {
    name,
    status,
    program,
    comment,
    invoice,
    studentEmail,
    dependentVisa,
    dependentVisaApplication,
    mentors,
    studentAppliedCountry,
  } = applicationUpdate;

  return (
    <div>
      {applicationUpdate &&
      applicationUpdate.studentAppliedCountry &&
      applicationUpdate.studentAppliedCountry.length > 0 ? (
        <div style={{ marginTop: "80px" }}>
          <Card className="header-card">
            <CardContent className="header-text">
              <div className="header-content">
                <Typography variant="h5" component="div">
                  <strong> Your Name: </strong> {name}
                </Typography>
                <Typography variant="h5" component="div" className="invoice">
                  <strong>Invoice Number: </strong>
                  {invoice}
                </Typography>
              </div>

              <Typography variant="h5" component="div">
                <strong> Documents Submmision:</strong> {comment}
                Complete
              </Typography>
              <Typography variant="h5" component="div">
                <strong>
                  The program you are interested in studying abroad:{" "}
                </strong>{" "}
                {program}
              </Typography>
            </CardContent>
          </Card>

          <h4
            style={{
              marginTop: "15px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Your Interested Country{" "}
          </h4>
          <hr
            style={{
              width: "175px",
              margin: "0 auto",
              border: "0.5px solid #112E4A",
            }}
          />

          <div
            // key={item.studentAppliedCountryId}
            style={{
              marginTop: "10px",
              display: "grid",
              gridColumn: "auto auto auto",
            }}
          >
            {applicationUpdate.studentAppliedCountry.map((item) => (
              <Card className="country-card">
                {/* <img src={mapImg} alt="not Found" className="mapImg" /> */}
                <CardContent className="country-content">
                  <div className="country-img">
                    <Typography variant="h4" component="div">
                      {/* <img
                                className="count-img"
                                loading="lazy"
                                width="140"
                                src={`${BASE_URL}/${item.countryImg}`}
                                alt="not found"
                              /> */}
                    </Typography>
                  </div>
                  <div className="country-text">
                    <div style={{ display: "flex" }}>
                      {/* <TbWorld
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  marginTop: "5px",
                                  marginRight: "2px",
                                }}
                              /> */}
                      <Typography
                        component="div"
                        gutterBottom
                        variant="h5"
                        mt="2"
                        sx={{
                          ml: 1,
                          fontWeight: "bold",
                        }}
                        fontWeight={500}
                        textTransform={"uppercase"}
                        fontSize="24px"
                      >
                        {item.countryName}
                      </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                      {/* <FaUserGraduate
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  marginTop: "4px",
                                  marginLeft: "5px",
                                }}
                              /> */}
                      <Typography variant="body1">
                        <strong style={{ marginLeft: "7px" }}>
                          Admission Application:
                        </strong>{" "}
                        {item.admissionApplication}
                      </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                      {/* <FaRocket
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  marginTop: "4px",
                                  marginLeft: "5px",
                                }}
                              /> */}
                      <Typography variant="body1">
                        <strong style={{ marginLeft: "7px" }}>
                          Visa Application:
                        </strong>{" "}
                        {item.visaApplication}
                      </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                      {/* <MdInsertComment
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  marginTop: "4px",
                                  marginLeft: "5px",
                                }}
                              /> */}
                      <Typography variant="body1">
                        <strong style={{ marginLeft: "7px" }}>Comment:</strong>{" "}
                        {item.comment}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Alert
            severity="info"
            sx={{
              ml: 8,
              mr: 8,
              mb: 8,
              backgroundColor: "none",
              textAlign: "justify",
            }}
          >
            <AlertTitle sx={{ fontWeight: "bold" }}>Info: </AlertTitle> Please
            stop by our office or speak with one of our mentors if you want to
            apply abroad. Your application updated information will be available
            when you register at our office. To update your profile on our
            system, please contact our office representative or the IT
            department if you have already registered with us. Thank you.
            <br></br>
            <br />
            <strong>OUR OFFICE</strong> <br></br>
            <Typography variant="body1">
              <Typography variant="body1">
                <strong>Address:</strong> Block: C, House No: 47, Road No: 6,
                5th floor, Niketon,Gulshan 1. Dhaka -1212, Bangladesh.
              </Typography>
              <Typography variant="body1">
                <strong>Office Hour:</strong> Sat - Thu 10.30 AM - 7.00 PM
              </Typography>
              <Typography variant="body1">
                <strong>Email: </strong> info@abroadinquiry.com
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> +8801718665274, +8801813067704,
                +8801911248972, +8801914308005, +8801717733386.
              </Typography>
            </Typography>
            <Grid xs={12} md={6} sx={{ marginTop: "20px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14605.153654618252!2d90.412397!3d23.7727419!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c71071531def%3A0x679ff0b229fcaa71!2sAbroad%20Inquiry!5e0!3m2!1sen!2sbd!4v1698049460950!5m2!1sen!2sbd"
                title="Abroad Inquiry Map"
                style={{
                  width: "834px",
                  height: "256px",
                  border: 0,
                }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </Grid>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ApplicationUpdate;
