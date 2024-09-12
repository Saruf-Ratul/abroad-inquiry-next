import { forwardRef } from "react";
// @mui
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 190,
        height: 40,
        display: "inline-flex",
        cursor: disabledLink ? "default" : "pointer",
        ...sx,
      }}
      {...other}
    >
      <Image
        src="/assets/images/logo/logo.webp"
        alt="Abroad Inquiry"
        priority
        width={190}
        height={40}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link href="/" passHref>
      {logo}
    </Link>
  );
});

Logo.displayName = "Logo";

export default Logo;
