import {
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Iconify from "@/components/Iconify";

const RootStyle = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
}));

const SectionWrapper = styled("div")(({ theme }) => ({
  background: "#006CC5",
  padding: "30px 50px",
  margin: "30px 0",
  borderRadius: 20,

  "@media(max-width:700px)": {
    padding: "20px 30px",
    margin: "20px 0",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: "#FFFF",
  "@media(max-width:1050px)": {
    fontSize: 18,
  },
  "@media(max-width:700px)": {
    fontSize: 16,
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  color: "#FFFF",
  fontWeight: 300,
  textAlign: "justify",
  margin: "5px 0px",

  "@media(max-width:1050px)": {
    fontSize: 14,
  },

  "@media(max-width:700px)": {
    fontSize: 12,
  },
}));

function JoinFbGroupSection() {
  const matchesSm = useMediaQuery("(max-width:600px)");
  return (
    <RootStyle>
      <Container>
        <br />
        <SectionWrapper>
          <Grid
            container
            spacing={matchesSm ? 2 : 5}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={6} md={5}>
              <Image
                src="/assets/images/others/facebook-groups.webp"
                alt=""
                width={400}
                height={200}
                objectFit="contain"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <div>
                <SectionTitle variant="h4">
                  Are you looking for a free guideline, blogs and our latest
                  update?
                </SectionTitle>

                <Text py={1}>
                  You can join our Facebook Community group, and you can
                  directly post . Our colleagues and benevolent group members
                  will answer your questions. In addition, you can check the
                  group files to apply your own. Finally, keep following the
                  group to read our blogs and our latest update.
                </Text>
                <a
                  href="https://www.facebook.com/groups/AbroadInquiry/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    size="large"
                    style={{
                      background: "#FFFF",
                      color: "#04223F",
                      fontWeight: "bold",
                    }}
                    variant="contained"
                    endIcon={
                      <Iconify
                        icon={"mdi:account-multiple-plus"}
                        width={24}
                        height={24}
                      />
                    }
                  >
                    Join Now
                  </Button>
                </a>
              </div>
            </Grid>
          </Grid>
        </SectionWrapper>
      </Container>
      <br />
    </RootStyle>
  );
}

export default JoinFbGroupSection;
