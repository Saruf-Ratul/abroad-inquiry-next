"use client";
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

import cssStyles from "@/utils/cssStyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/axios";
import { fetchCountries } from "@/redux/features/country/countrySlice";
import { useRouter } from "next/navigation";
import DataLoading from "@/components/DataLoading";

const OverlayStyle = styled("div")(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: "100%",
  height: "100%",
  position: "absolute",
}));

export default function CountryList() {
  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries(1));
  }, [dispatch]);

  return (
    <>
      <Container sx={{ mb: 6 }}>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Popular place to study abroad
          </Typography>
          {loading ? (
            <DataLoading />
          ) : (
            <Grid container spacing={3}>
              {countries.map((country) => (
                <Grid key={country.countryId} item xs={12} md={4}>
                  <CountryCard country={country} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}

function CountryCard({ country }) {
  const router = useRouter();
  const [showDescription, setShowDescription] = useState(false);
  const matchesMd = useMediaQuery((theme) => theme.breakpoints.down('md')); 

  const handleMouseEnter = () => {
    !matchesMd && setShowDescription(true);
  };

  const handleMouseLeave = () => {
    !matchesMd && setShowDescription(false);
  };

  return (
    <Card
      sx={{ textAlign: "center", position: "relative" }} // Add relative positioning
      onClick={() => router.push(`/countries/${country.countryId}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        alt="gallery image"
        src={`${BASE_URL}/${country.countryImage}`}
        width={200}
        height={200}
        style={{ width: "100%", objectFit: "contain", scale: 1.5 }}
      />
      <Box sx={{ position: "relative" }}>
        <Avatar
          alt={country.countryName}
          src={`https://flagcdn.com/w80/${country.countryCode}.png`}
          srcset="https://flagcdn.com/w40/za.png 2x"
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -22,
            mx: "auto",
          }}
        />

        {showDescription && (
          <Box
            sx={{
              position: "absolute",
              top: -200, 
              width: "100%",
              height: "30vh",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: 2,
            }}
          >
            <Typography
              variant="h4"
              color="secondary"
              fontWeight={600}
              gutterBottom
            >
              Study in {country.countryName}
            </Typography>
            <Typography variant="caption" fontWeight={200} textAlign="justify">
              {country.countryName} is a popular place for study.
              International students can apply for bachelor, master’s,
              doctoral and postdoctoral programs...
              <Typography color="secondary" variant="h6" display="inline">
                Read More
              </Typography>
            </Typography>
          </Box>
        )}
      </Box>

      <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
        {country.countryName}
      </Typography>
    </Card>
  );
}

