"use client";
import withAuth from "@/sections/auth/withAuth";
import AppWelcome from "@/sections/dashboard/main/AppWelcome";
import Countries from "@/sections/dashboard/main/Countries";
import { Container, Grid } from "@mui/material";

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <AppWelcome />
        </Grid>
        <Grid item xs={12} md={4}>
          <Countries />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withAuth(Dashboard);
