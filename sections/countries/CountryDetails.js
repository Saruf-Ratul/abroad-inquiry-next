"use client";
import DataLoading from "@/components/DataLoading";
import MentorCard from "@/components/mentor-card/MentorCard";
import {
  fetchCountriesAccordingToMentors,
  fetchCountryDetails,
} from "@/redux/features/country/countrySlice";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryDetailHero from "./CountryDetailHero";

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  marginTop: "30px",
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(11),
  },
}));

function Factory({ data }) {
  const processedData = [];
  for (const key in data) {
    const value = data[key];
    if (Array.isArray(value)) {
      processedData.push(
        <div key={key}>
          {value.map((item, index) => (
            <Typography key={index} textAlign="justify" pb={2}>
              {Object.keys(item).map((nestedKey) => (
                <>
                  <b key={nestedKey}>{nestedKey}:</b> {item[nestedKey]}
                </>
              ))}
            </Typography>
          ))}
        </div>
      );
    } else if (typeof value === "object") {
      processedData.push(
        <Typography key={key} textAlign="justify" pb={2}>
          {Object.keys(value).map((nestedKey) => (
            <>
              <b key={nestedKey}>{nestedKey}:</b> {value[nestedKey]}
            </>
          ))}
        </Typography>
      );
    } else {
      processedData.push(
        <Typography key={key} textAlign="justify" pb={2}>
          <b>{key}:</b> {value}
        </Typography>
      );
    }
  }
  return <div>{processedData}</div>;
}

export default function CountryDetails({ params }) {
  const theme = useTheme();

  const { slug } = params;
  const dispatch = useDispatch();
  const { loading, countryDetails, countriesMentors } = useSelector(
    (state) => state.countries
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchCountryDetails(slug));
      dispatch(fetchCountriesAccordingToMentors(slug));
    }
  }, [dispatch, slug]);

  return (
    <RootStyle>
      <CountryDetailHero countryDetails={countryDetails} />
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
        <Container sx={{ mt: 8 }}>
          <Factory data={countryDetails?.description} />
        </Container>
      )}

      {loading ? (
        <Container>
          <DataLoading />
        </Container>
      ) : (
        <Container>
          <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
            Available Mentors for {countryDetails.countryName}
          </Typography>
          <Grid container spacing={3}>
            {countriesMentors.map((mentor) => (
              <Grid key={mentor.id} item xs={12} md={4}>
                <MentorCard mentor={mentor} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </RootStyle>
  );
}
