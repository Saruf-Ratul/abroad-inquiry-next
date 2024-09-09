"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  useMediaQuery,
  AlertTitle,
  Button,
  Box,
  Alert,
  Container,
} from "@mui/material";
import brackBank from "@/public/assets/images/others/brac.png";
import premierBank from "@/public/assets/images/others/premier.png";
import cityBank from "@/public/assets/images/others/cityBank.png";
import Bkash from "@/public/assets/images/others/bkash.jpeg";
import Nagod from "@/public/assets/images/others/nagad.png";
import Iconify from "@/components/Iconify";
import Image from "next/image";

const PaymentMethod = () => {
  const matchesMd = useMediaQuery("(max-width:650px)");
  const handlePayment = () => {
    window.open(
      "https://shop.bkash.com/abroad-tickets01911913660/paymentlink",
      "_blank"
    );
  };
  return (
    <>
    <div style={{ marginTop: "120px" }}>
      <div
        style={{
          marginTop: matchesMd ? "50px" : "100px",
          marginLeft: matchesMd ? "40px" : "150px",
          marginBottom: matchesMd ? "20px" : "100px",
        }}
      >
        <h1 style={{ color: "#FF6D00", fontWeight: "bold" }}>
          Payment Methods
        </h1>

        <Alert
          icon={false}
          severity="success"
          style={{
            marginRight: matchesMd ? "40px" : "100px",
            marginTop: "15px",
          }}
        >
          To start the processing of your file, an opening charge/registration
          fee is required. This fee can be paid through various payment methods
          listed below.
        </Alert>

        <div>
          <div style={{ display: "flex", marginTop: "50px" }}>
            <Iconify
              icon={"mingcute:bank-fill"}
              width={24}
              height={24}
              style={{
                color: "#FF6D00",
                fontWeight: "bold",
                fontSize: "44px",
                marginTop: "3px",
              }}
            />
            <h4
              style={{
                marginLeft: "10px",
                color: "#FF6D00",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              Direct Banking
            </h4>
          </div>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              marginRight: matchesMd ? "20px" : "100px",
              flexWrap: "wrap",
            }}
          >
            <Card
              sx={{
                maxWidth: 345,
                marginTop: matchesMd ? "20px" : "20px",
                width: matchesMd ? "300px" : "auto",
              }}
            >
              <CardActionArea>
                <Image
                  src={brackBank}
                  width={150}
                  height={80}
                  alt="brackBank"
                  style={{
                    marginLeft: matchesMd ? "30px" : "60px",
                    marginTop: "50px",
                    width: matchesMd ? "200px" : "220px",
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#FF6D00",
                    }}
                  >
                    Brack Bank LTD
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Bank Account Name:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      ABROAD INQUIRY
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    A/C No.:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      1501205186101001
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Routing number:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      060261726
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Branch:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      GULSHAN
                    </span>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              sx={{
                maxWidth: 345,
                marginTop: matchesMd ? "20px" : "20px",
                width: matchesMd ? "300px" : "auto",
              }}
            >
              <CardActionArea>
                <Image
                  width={150}
                  height={125}
                  src={premierBank}
                  alt="brackBank"
                  style={{
                    marginLeft: matchesMd ? "30px" : "60px",
                    width: matchesMd ? "200px" : "200px",
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#FF6D00",
                    }}
                  >
                    The Premier Bank LTD
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Bank Account Name:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      ABROAD INQUIRY
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    A/C No.:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      017811100000501
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Routing number:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      235261922
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Branch:{" "}
                    <span
                      style={{
                        color: "#FF6D00",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      GULSHAN- TEJGAON LINK ROAD
                    </span>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              sx={{
                maxWidth: 345,
                marginTop: matchesMd ? "20px" : "20px",
                width: matchesMd ? "300px" : "auto",
              }}
            >
              <CardActionArea>
                <Image
                  width={150}
                  height={115}
                  src={cityBank}
                  alt="brackBank"
                  style={{
                    marginLeft: matchesMd ? "30px" : "70px",
                    width: matchesMd ? "200px" : "150px",
                    marginTop: "20px",
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#FF6D00",
                    }}
                  >
                    The City Bank LTD
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Bank Account Name:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      ABROAD INQUIRY
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    A/C No.:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      1263004469001
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Routing number:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      225261729
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Branch:{" "}
                    <span style={{ color: "#FF6D00", fontWeight: "bold" }}>
                      GULSHAN
                    </span>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            {/* <Card sx={{ maxWidth: 345, marginTop: "20px", width: matchesMd ? "300px" : "auto" }} >
                            <CardActionArea>
                                <img src={ificBank} alt='brackBank' style={{ marginLeft: matchesMd ? "30px" : "60px", width: matchesMd ? "200px" : "160px", marginTop: "20px" }} />
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#FF6D00" }}>
                                        IFIC BANK LTD
                                    </Typography>
                                    <Typography variant="body2" style={{ color: "#2196F3", fontWeight: "bold" }}>Bank Account Name: <span style={{ color: "#FF6D00", fontWeight: "bold" }}>ABROAD INQUIRY</span></Typography>
                                    <Typography variant="body2" style={{ color: "#2196F3", fontWeight: "bold" }}  >A/C No.: <span style={{ color: "#FF6D00", fontWeight: "bold" }}>0220100413001</span></Typography>
                                    <Typography variant="body2" style={{ color: "#2196F3", fontWeight: "bold" }}>Routing number: <span style={{ color: "#FF6D00", fontWeight: "bold" }}>120261729</span></Typography>
                                    <Typography variant="body2" style={{ color: "#2196F3", fontWeight: "bold" }}>Branch: <span style={{ color: "#FF6D00", fontWeight: "bold" }}>GULSHAN</span></Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card> */}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", marginTop: "50px" }}>
            <Iconify
              icon={"entypo:mobile"}
              width={24}
              height={24}
              style={{
                color: "#FF6D00",
                fontWeight: "bold",
                fontSize: "44px",
                marginTop: "4px",
              }}
            />
            <h4
              style={{
                marginLeft: "5px",
                color: "#FF6D00",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              Mobile Banking
            </h4>
          </div>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "flex-start",
              marginRight: matchesMd ? "20px" : "100px",
              flexWrap: "wrap",
            }}
          >
            <Card
              sx={{
                maxWidth: 345,
                marginTop: matchesMd ? "20px" : "20px",
                width: matchesMd ? "300px" : "auto",
              }}
            >
              <CardActionArea>
                <Image
                  width={250}
                  height={250}
                  src={Bkash}
                  alt="brackBank"
                  style={{
                    marginLeft: matchesMd ? "30px" : "60px",
                    marginTop: "20px",
                    width: matchesMd ? "200px" : "200px",
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Button variant="contained" onClick={handlePayment}>
                      Payment Link
                    </Button>
                  </Box>
                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Please write your name in the reference section.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              sx={{
                maxWidth: 345,
                marginTop: matchesMd ? "20px" : "20px",
                width: matchesMd ? "300px" : "auto",
                marginLeft: matchesMd ? "0px" : "50px",
              }}
            >
              <CardActionArea>
                <Image
                  width={150}
                  height={120}
                  src={Nagod}
                  alt="brackBank"
                  style={{
                    marginLeft: matchesMd ? "30px" : "60px",
                    marginTop: "20px",
                    width: matchesMd ? "200px" : "200px",
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ color: "#FF6D00" }}
                  >
                    01813067704 (personal)
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ color: "#FF6D00" }}
                  >
                    01711160462 (personal)
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{ color: "#2196F3", fontWeight: "bold" }}
                  >
                    Please write your name in the reference section.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>

        <Alert
          severity="info"
          sx={{ textAlign: "justify" }}
          style={{
            marginTop: "50px",
            marginRight: matchesMd ? "40px" : "100px",
          }}
        >
          <AlertTitle sx={{ fontWeight: "bold" }}>Info: </AlertTitle>
          Abroad Inquiry will refund the aspirants full registration fee if
          Abroad Inquiry fails to get the aspirants offer letter or Visa
          refusal. If you receive Visa, you must pay visa processing fee.
        </Alert>
      </div>
    </div>

    <div >
            <Container maxWidth="lg" >
                <Box margin="auto" py={5}>
                    <Typography variant='h3' marginY={3} >Disclaimer</Typography>
                    <Typography textAlign="justify" marginBottom={8}>
                        To get admission, scholarship and visa depend on the admission board, embassy,
                        or particular countrys university/immigration policy. In addition, the candidates 
                        academic and professional profile, financial documents, motivation letter, and embassy 
                        interview also played a vital role in the success of an application. Due to the immigration
                         policy and periodic changes of the admission/immigration rules, Abroad Inquiry is not ensuring 
                         or conforming to the aspirants to get 100% admission/visa. However, Abroad Inquiry is guiding the 
                         candidates through expert mentors so that the applicants get a better outcome of their 
                         application. In addition, the Abroad Inquiry team will accept files of the students eligible 
                         to make applications abroad.
                        Moreover, students need to pay all the additional costs in the whole process, which include- 
                        university application fee (if applicable), Embassy/VFS fee (if applicable), 
                        consulate fee (if applicable), DHL fee (if applicable), etc. Consequently, provided information
                         about various countries through the website/app is not entirely accurate. Therefore, Abroad Inquiry 
                         advises the applicants to check the information from the relevant website. Last but not least,
                          before aspirants apply through Abroad Inquiry, candidates are strongly advised to double-check
                           our refund policy, privacy policy & terms, and conditions.
                        <br />
                        If aspirants have any questions regarding the refund policy, service charge
                         policy, privacy policy, and term conditions, do not hesitate to contact us.
                    </Typography>
                </Box>
               
            </Container>
        </div>
    </>
  );
};

export default PaymentMethod;
