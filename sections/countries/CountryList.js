"use client";
import DataLoading from "@/components/DataLoading";
import { fetchCountries } from "@/redux/features/country/countrySlice";
import { BASE_URL } from "@/utils/axios";
import cssStyles from "@/utils/cssStyles";
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const [page, setPage] = useState(1);
  const { countries, loading, totalCountry } = useSelector(
    (state) => state.countries
  );
  const loader = useRef(null); // For observing the scroll position

  // Fetch countries when page changes
  useEffect(() => {
    if (page) {
      dispatch(fetchCountries(page));
    }
  }, [dispatch, page]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && countries.length < totalCountry) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null, // Observe viewport
        rootMargin: "20px",
        threshold: 1.0, // Trigger when fully in view
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [countries, totalCountry]);

  return (
    <>
      <Container sx={{ mb: 6 }}>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Popular places to study abroad
          </Typography>
          {loading && page === 1 ? (
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

        {/* Loader Element for triggering next page load */}
        {loading && page > 1 && (
          <Stack alignItems="center" mt={2}>
            <DataLoading />
          </Stack>
        )}
        <div ref={loader} style={{ height: "20px", marginTop: "20px" }} />
      </Container>
    </>
  );
}

function CountryCard({ country }) {
  const router = useRouter();
  const [showDescription, setShowDescription] = useState(false);
  const matchesMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleMouseEnter = () => {
    !matchesMd && setShowDescription(true);
  };

  const handleMouseLeave = () => {
    !matchesMd && setShowDescription(false);
  };

  return (
    <Card
      sx={{ textAlign: "center", position: "relative", cursor: "pointer" }} // Add relative positioning
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
              height: "35vh",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
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
              {country.countryName} is a popular place for study. International
              students can apply for bachelor, master’s, doctoral and
              postdoctoral programs...
              <Typography color="secondary" variant="body2" display="inline">
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
