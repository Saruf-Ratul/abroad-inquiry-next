import {
  Box,
  Container,
  Divider,
  Grid,
  InputAdornment,
  InputBase,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Iconify from "./Iconify";

const phoneNumbers = [
  "+8801718665274",
  "+8801711160462",
  "+8801813067704",
  "+8801911248972",
  "+8801914308005",
  "+8801717733386",
];

const socialMediaLinks = [
  {
    href: "https://wa.me/+8801712343359",
    icon: "ic:baseline-whatsapp",
    background: "#00A884",
  },
  {
    href: "https://www.facebook.com/Abroadinquiry/",
    icon: "bi:facebook",
    background: "#166FE5",
  },
  {
    href: "https://www.youtube.com/c/AbroadInquiry",
    icon: "fa6-brands:square-youtube",
    background: "#FF0000",
  },
  {
    href: "https://www.instagram.com/abroadinquiryofficial",
    icon: "fa6-brands:square-instagram",
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  },
  {
    href: "https://bd.linkedin.com/company/abroadinquiry?trk=public_profile_topcard-current-company",
    icon: "fa:linkedin-square",
    background: "#0a66c2",
  },
];

const email = {
  href: "info@abroadinquiry.com",
};

const address = {
  title:
    "Block: C, House No: 47, Road No: 6, 5th floor, Niketon,Gulshan 1. Dhaka -1212, Bangladesh",
  href: "https://www.google.com/maps/place/Abroad+Inquiry/@23.7727425,90.4098402,17z/data=!3m2!4b1!5s0x3755c778764dffe3:0x1c228f7976fd0bed!4m6!3m5!1s0x3755c71071531def:0x679ff0b229fcaa71!8m2!3d23.7727376!4d90.4124151!16s%2Fg%2F11j8_0grnp?entry=ttu",
};

function TopLabel() {
  const [selectedNumber, setSelectedNumber] = useState(phoneNumbers[0]);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <Box
      height={40}
      display="flex"
      alignItems="center"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: isHome
          ? "#FFFF"
          : theme.palette.mode === "dark"
          ? "white"
          : "black",
      }}
    >
      <Container maxWidth="xl">
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="caption">
              <Stack direction="row" alignItems="center" gap={1}>
                <Iconify icon={"ph:clock-light"} width={18} height={18} />
                <Stack
                  sx={{
                    color: isHome
                      ? "#FFFF"
                      : theme.palette.mode === "dark"
                      ? "white"
                      : "black",
                  }}
                >
                  Sat - Thu 9.30 AM - 6.00 PM
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ background: "#F2F2F2" }}
                />
                <Stack direction="row" alignItems="center" gap={1}>
                  <Iconify icon={"carbon:location"} width={18} height={18} />
                  <Stack
                    component={Link}
                    href={address.href}
                    target="_blank"
                    sx={{
                      color: isHome
                        ? "#FFFF"
                        : theme.palette.mode === "dark"
                        ? "white"
                        : "black",
                    }}
                  >
                    Our Office
                  </Stack>
                </Stack>
              </Stack>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Typography variant="caption">
              <Stack direction="row" alignItems="center" gap={1.5}>
                <Iconify icon={"tabler:mail"} width={14} height={14} />
                <Stack
                  component={Link}
                  href={`mailto:${email.href}`}
                  sx={{
                    color: isHome
                      ? "#FFFF"
                      : theme.palette.mode === "dark"
                      ? "white"
                      : "black",
                  }}
                >
                  {email.href}
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ background: "#F2F2F2", height: 20, mt: 0.8 }}
                />
                {!matchesMd && (
                  <>
                    <Stack direction="row" gap={1}>
                      {socialMediaLinks.map((link, idx) => (
                        <Stack
                          key={idx}
                          component={Link}
                          target="_blank"
                          href={link.href}
                          underline="none"
                          sx={{
                            background: link.background,
                            p: 0.5,
                            color: "#FFFF",

                            borderRadius: 1,
                            cursor: "pointer",
                          }}
                        >
                          <Iconify icon={link.icon} width={14} height={14} />
                        </Stack>
                      ))}
                    </Stack>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ background: "#F2F2F2", height: 20, mt: 0.8 }}
                    />
                  </>
                )}
                <Select
                  labelId="mobile-number-label"
                  id="mobile-number-select"
                  value={selectedNumber}
                  onChange={(event) => setSelectedNumber(event.target.value)}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  open={open}
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon={"ph:phone"} width={18} height={18} />
                    </InputAdornment>
                  }
                  input={<InputBase />}
                  sx={{
                    border: "none",
                    color: isHome
                      ? "#FFFF"
                      : theme.palette.mode === "dark"
                      ? "white"
                      : "black",
                    "& .MuiSelect-root": {
                      padding: 0,
                      border: "none",
                      "&:focus": {
                        backgroundColor: "transparent",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    },
                    "& .MuiSelect-icon": {
                      color: isHome
                        ? "#FFFF"
                        : theme.palette.mode === "dark"
                        ? "white"
                        : "black",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {phoneNumbers.map((num, idx) => (
                    <MenuItem value={num} key={idx}>
                      <Link
                        href={`tel:${num}`}
                        sx={{ textDecoration: "none" }}
                        color="inherit"
                        fontSize={14}
                      >
                        {num}
                      </Link>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default TopLabel;
