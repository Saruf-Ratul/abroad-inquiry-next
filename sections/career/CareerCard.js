"use client";
import Iconify from "@/components/Iconify";
import { fetchCareers } from "@/redux/features/career/careerSlice";
import { BASE_URL } from "@/utils/axios";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DataLoading from "@/components/DataLoading";

function CareerCard() {
  const matcheSm = useMediaQuery("(min-width:600px)");
  const router = useRouter();
  const dispatch = useDispatch();
  const { careers, loading } = useSelector((state) => state.careers);

  useEffect(() => {
    dispatch(fetchCareers(1));
  }, [dispatch]);

  const handleClick = (id) => {
    if (id) {
      router.push(`/career/${id}`);
    }
  };

  return (
    <Container
      sx={{
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <Typography variant="h3" fontWeight="bold" paddingBottom={3}>
        Open Job Positions
      </Typography>
      {loading ? (
        <DataLoading />
      ) : (
        <Grid container spacing={4} marginTop="20px" marginBottom="50px">
          {careers.map((career) => (
            <Grid item xs={12} sm={6} md={4} key={career.careerPostId}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  maxWidth: 345,
                }}
              >
                <Image
                  src={`${BASE_URL}/${career.image}`}
                  width={400}
                  height={200}
                  alt={career.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {career.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Deadline: {career.deadline}
                  </Typography>
                </CardContent>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="medium"
                  endIcon={
                    <Iconify
                      icon={"ic:round-arrow-right-alt"}
                      width={24}
                      height={24}
                    />
                  }
                  sx={{ mx: "auto", mb: 2 }}
                  onClick={() => handleClick(career.careerPostId)}
                >
                  See Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default CareerCard;
