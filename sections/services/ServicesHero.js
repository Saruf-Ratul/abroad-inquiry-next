import {Container, Typography } from "@mui/material";
import { MotionContainer, TextAnimate } from "@/components/animate";
import AnimatedComponent from "@/components/animate/AnimatedComponent";
import { ContentStyle, RootStyle } from "./style";


export default function ServicesHero() {
  return (
    <RootStyle>
      <Container
        component={MotionContainer}
        sx={{ position: "relative", height: "100%" }}
      >
        <ContentStyle spacing={2}>
          <TextAnimate text="Services" sx={{ color: "secondary.main" }} />
          <AnimatedComponent animationType={"inRight"}>
            <Typography
              variant="h4"
              sx={{
                color: "common.white",
                fontWeight: "fontWeightMedium",
              }}
            >
              We Are The Most Trusted Visa and Immigration Consultant
            </Typography>
          </AnimatedComponent>

          <AnimatedComponent animationType="inRight">
            <Typography
              sx={{
                mt: 1,
                mb: 1,
                color: "common.white",
              }}
            >
              Informing the aspirants of the factual information of a country
              and providing admission, scholarship, and visa services for study
              abroad through expert mentors who already went through the
              process, became successful and living in the country.
            </Typography>
          </AnimatedComponent>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
