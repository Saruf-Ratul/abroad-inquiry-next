"use client";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Iconify from "./Iconify";

function OfficeInfoCard({ item }) {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { title, address, map, email, phone, officeHour, country } = item;

  // Map for country flags (you can expand this as needed)
  const countryIcons = {
    Bangladesh: "twemoji:flag-bangladesh",
    Netherlands: "twemoji:flag-netherlands",
  };


  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: matchesSm ? "column" : "row",
        boxShadow: 4,
        borderRadius: 2,
      }}
    >
      <Grid container>
        {/* Left Section: Office Information */}
        <Grid item xs={12} md={6}>
          <CardContent sx={{ p: matchesSm ? 2 : 4 }}>
            {/* Country Icon and Title */}
            <Box display="flex" alignItems="center" mb={2}>
              {/* Flag Icon */}
              {countryIcons[country] && (
                <Iconify
                  icon={countryIcons[country]}
                  width={36}
                  height={36}
                  sx={{ mr: 2 }}
                />
              )}
              <Typography
                fontWeight="bold"
                variant={matchesSm ? "h5" : "h4"}
                sx={{ color: theme.palette.primary.main }}
              >
                {title}
              </Typography>
            </Box>

            <Box
              bgcolor={theme.palette.primary.main}
              width={50}
              height={3}
              my={2}
            />

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              <strong>Address:</strong> {address}
              <br />
              <strong>Office Hours:</strong> {officeHour}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${email.href}`}
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                }}
              >
                {email.href}
              </a>
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              Phone:
            </Typography>
            {phone.map((num, idx) => (
              <Typography
                key={idx}
                variant="subtitle1"
                color="text.secondary"
                display="inline-block"
                sx={{ mt: 1 }}
              >
                <a
                  href={`tel:${num}`}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                  }}
                >
                  {num}
                </a>
                {idx !== phone.length - 1 && ", "}
              </Typography>
            ))}
          </CardContent>
        </Grid>

        {/* Right Section: Embedded Map */}
        <Grid item xs={12} md={6}>
          <iframe
            src={map}
            title="Office Location"
            style={{
              width: "100%",
              height: matchesSm ? 300 : "100%",
              border: 0,
              borderRadius: "0 8px 8px 0",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default OfficeInfoCard;
