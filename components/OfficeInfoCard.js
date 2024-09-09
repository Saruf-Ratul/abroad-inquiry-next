"use client"
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { phoneNumbers } from "@/data/contact";

function OfficeInfoCard({ item }) {
  const theme = useTheme();
  const matchesSm = useMediaQuery("(max-width:600px)");
  const { title, address, map, email, phone, officeHour } = item;
  return (
    <>
      <Card sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardContent
              sx={{
                pl: matchesSm ? 2 : 5,
                pt: matchesSm ? 2 : 4,
                pb: matchesSm ? 2 : 5,
              }}
            >
              <Typography fontWeight="bold" variant={matchesSm ? "h4" : "h3"}>
                {title}
              </Typography>

              <Box bgcolor={"#FF5857"} width={50} height={3} my={1} />
              <Typography gutterBottom variant="subtitle1" color="text.primary">
                <strong>Address: </strong> {address}
                <br />
                <strong>Office Hour: </strong>
                {officeHour}
              </Typography>

              <Typography gutterBottom variant="subtitle1" color="text.primary">
                <strong>Email: </strong>
                <a
                  href={`mailto:${email.href}`}
                  style={{ textDecoration: "underline",color: theme.palette.mode === "dark" ? "white" : "black" }}
                >
                  {email.href}
                </a>
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Phone:
              </Typography>
              {phone.map((num, idx) => {
                return (
                  <Typography pt={1} display="inline-block" key={idx}>
                    <a
                      href={`tel:${num}`}
                      style={{
                        textDecoration: "underline",
                        color: theme.palette.mode === "dark" ? "white" : "black"
                      }}
                    >
                      {`${num}${idx !== phoneNumbers.length - 1 ? ", " : "."}`}
                    </a>
                  </Typography>
                );
              })}
            </CardContent>
          </Grid>

          <Grid item xs={12} md={6}>
            <iframe
              src={map}
              title="Abroad Inquiry Map"
              style={{
                width: "100%",
                height: matchesSm ? 350 : "100%",
                border: 0,
              }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default OfficeInfoCard;
