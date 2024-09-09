import {
  Box,
  Card,
  useMediaQuery,
  Typography,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import Iconify from "./Iconify";

function VisaSuccessCard({ data }) {
  const matchesSm = useMediaQuery("(max-width:400px)");

  return (
    <>
      <Box
        mx={matchesSm ? 0 : 1}
        style={{ cursor: "pointer", marginTop: "20px" }}
      >
        <Card
          sx={{
            borderRadius: 3,
            transition: "transform 0.15s ease-in-out",
            position: "relative",
            "&:hover": {
              transform: "scale3d(1.05, 1.05, 1)",
              boxShadow: "0 0 11px rgba(33,33,33,.2)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              top: 0,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "80px",
                color: "white",
                background:
                  "linear-gradient(229deg, rgba(247,60,78,1) 0%, rgba(233,161,31,1) 58%)",
                padding: "5px",
                borderBottomRightRadius: "5px",
                borderBottomLeftRadius: "5px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Iconify icon={"fa-solid:crown"} width={24} height={24} />
              <Typography
                fontWeight={600}
                variant="p"
                component="div"
                sx={{ color: "white", marginLeft: "3px" }}
              >
                Admit
              </Typography>
            </div>
          </Box>
          <CardContent sx={{ textAlign: "center", p: matchesSm ? 2 : 3 }}>
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                marginTop: "15px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                fontWeight={600}
                variant="p"
                sx={{
                  marginLeft: "12px",
                  marginTop: "8px",
                  fontFamily: "montserrat",
                  fontSize: "18px",
                }}
              >
                {data.university}
              </Typography>
            </div>

            <Image
             alt="universityImg"
              src={data.universityImg}
              width={0}
              height={0}
              style={{
                height: "200px",
                width: "100%",
                borderRadius: "5px",
                marginBottom: "4px",
              }}
            />

            <Box
              height={60}
              width="100%"
              bgcolor="#D5EBC9"
              borderRadius="10px"
              margin="auto"
              mt={-2}
              mb={1}
              sx={{ display: "flex" }}
            >
              <div
                style={{
                  marginLeft: "12px",
                  marginRight: "12px",
                  marginTop: "25px",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                alt="universityimg"
                  src={data.img}
                  style={{
                    width: "40px",
                    height: "40px",
                    padding: "4px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    border: "1px solid gray",
                  }}
                />
              </div>

              <Typography
                sx={{
                  marginTop: "20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "left",
                  marginLeft: "3px",
                  fontFamily: "montserrat",
                  lineHeight: "14.5px",
                  color: "#000448",
                }}
              >
                {data.name} <br />
                <span
                  style={{
                    fontSize: "12px",
                    opacity: "0.7",
                    textAlign: "left",
                    color: "#000448",
                  }}
                >
                  {data.intake}
                </span>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default VisaSuccessCard;
