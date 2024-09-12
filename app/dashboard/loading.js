import Logo from "@/public/assets/images/logo/logo-small.webp";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
function Loading(props) {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Box position="relative" width={100}>
        <CircularProgress
          style={{ color: "#D3D3D3" }}
          size={100}
          thickness={1.8}
        />
        <Image
          src={Logo}
          alt="Abroad Inquiry Logo"
          width={40}
          height={40}
          style={{
            height: 60,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            margin: "auto",
          }}
        />
      </Box>
    </Box>
  );
}

export default Loading;
