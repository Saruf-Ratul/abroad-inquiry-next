"use client"
import { Box, CircularProgress, useTheme } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const theme = useTheme();
    const Router = useRouter();
    const [loading, setLoading] = useState(true); // State to track loading state
    const token = Cookies.get("token");

    useEffect(() => {
      if (!token) {
        Router.replace('/auth/login');
      } else {
        setTimeout(() => {
          setLoading(false); 
        }, 500); 
      }
    }, [token, Router]);

    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh", 
          }}
        >
          <CircularProgress sx={{ color: theme.palette.mode === 'dark' ? "white" : "black" }} />
        </Box>
      );
    }

    return token ? <WrappedComponent {...props} /> : <div>Unauthorized Access</div>;
  };
};

export default withAuth;
