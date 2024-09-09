import { Container, Grid } from "@mui/material";
import ContactForm from "@/sections/contact/ContactForm";
import ContactHero from "@/sections/contact/ContactHero";
import ContactMap from "@/sections/contact/ContactMap";
import { RootStyle } from "./style";

export default function Contact() {
  return (
    <RootStyle>
      <ContactHero />
     <Container sx={{ my: 10 }}>
        <Grid container >
        <ContactForm />
        </Grid>

        <Grid container >
        <ContactMap />
        </Grid>
      </Container>
    </RootStyle>
  );
}
