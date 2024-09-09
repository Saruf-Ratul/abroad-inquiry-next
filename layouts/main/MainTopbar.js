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
import React, { useState } from "react";
// import {
//   AiOutlineClockCircle,
//   AiOutlineEnvironment,
//   AiOutlineMail,
//   AiOutlinePhone,
// } from "react-icons/ai";

function MainTopbar() {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      bgcolor="#1B182F"
      color="#FFF"
      height={60}
      display="flex"
      alignItems="center"
    >
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="caption">
              <Stack direction="row" alignItems="center" gap={1}>
                {/* <AiOutlineClockCircle /> */}
                <Stack>Sat - Thu 9.30 AM - 6.00 PM</Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ background: "#F2F2F2" }}
                />
                <Stack direction="row" alignItems="center" gap={1}>
                  {/* <AiOutlineEnvironment /> */}
                  <Stack
                    component={Link}
                    //   href={address.href}
                    target="_blank"
                    color="#FFFF"
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
                {/* <AiOutlineMail /> */}
                <Stack
                  component={Link}
                  color="inherit"
                  //  href={`mailto:${email.href}`}
                >
                  sadfasd
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ background: "#F2F2F2", height: 20, mt: 0.8 }}
                />
                {!matchesMd && (
                  <>
                    <Stack direction="row" gap={1}>
                      {[].map((link, idx) => (
                        <Stack
                          key={idx}
                          component={Link}
                          target="_blank"
                          //   href={link.href}
                          underline="none"
                          sx={{
                            background: link.background,
                            p: 0.5,
                            color: "#FFFF",
                            borderRadius: 1,
                            cursor: "pointer",
                          }}
                        >
                          {/* {<link.icon size={15} />} */}
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
                      {/* <AiOutlinePhone color="#FFFF" /> */}
                    </InputAdornment>
                  }
                  input={<InputBase />}
                  sx={{
                    border: "none",
                    color: "#FFFF",
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
                      color: "inherit",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {[].map((num, idx) => (
                    <MenuItem value={num} key={idx}>
                      <Link
                        href={`tel:${num}`}
                        sx={{ textDecoration: "none" }}
                        color="inherit"
                        fontSize={14}
                      >
                        12222121221
                      </Link>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Typography>

            {/* <Typography
                sx={{ textDecoration: "none" ,fontSize:"14px", marginTop:"5px"}}
               >
                Feedback
              </Typography> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default MainTopbar;
