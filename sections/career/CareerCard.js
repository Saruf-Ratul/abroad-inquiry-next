"use client";
import Iconify from "@/components/Iconify";
import { fetchCareers } from "@/redux/features/career/careerSlice";
import { BASE_URL } from "@/utils/axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DataLoading from "@/components/DataLoading";

function CareerCard({ job }) {
  const matcheSm = useMediaQuery('(min-width:600px)');
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
      {
        loading ? (
          <DataLoading />
        ) : (
          <Box
            sx={{
              marginTop: "20px",
              marginBottom: "50px",
              display: "flex",
              flexDirection: matcheSm ? "row" : "column",
              justifyContent: "space-between",
            }}
          >
            {careers.map((career) => {
              return (
                <Card sx={{ maxWidth: 345, mt: matcheSm ? 0 : 4 }} key={career.careerPostId}>
                  <Image
                    src={`${BASE_URL}/${career.image}`}
                    width={400}
                    height={200}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {career.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Deadline: {career.deadline}
                    </Typography>
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
                      sx={{ mx: "auto", mt: 2 }}
                      onClick={() => handleClick(career.careerPostId)}
                    >
                      See Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )
      }
    </Container>
  );
}

export default CareerCard;
