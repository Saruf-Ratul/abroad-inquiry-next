"use client"
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function RefundPolicy() {
  const router = useRouter();
  return (
    <div style={{marginTop:"100px"}}>
       <Container maxWidth="lg">
        <Box margin="auto" py={5}>
          <Typography variant="h2" marginBottom={4} >
            Refund Policy and Service Charge Conditions
          </Typography>
          <Typography>
            <Typography variant="body1" textAlign="justify">
              Abroad Inquiry will refund the aspirants full registration charge
              if Abroad Inquiry fails to get the aspirants offer letter. In case
              of visa refusal, Abroad Inquiry will not charge any fees for
              admission, visa, or registration cost that Abroad Inquiry charges
              for services. However, if aspirants want to withdraw their
              application after submitting the paper to the university or embassy,
              Abroad Inquiry will not refund the aspirants registration fees.
              Furthermore, for example, Abroad Inquiry can accomplish the
              application process and get the positive result visa/admission of
              the application if the applicant does not want to go abroad for
              personal circumstances. In that case, Abroad Inquiry will still
              charge the registration fees, service fees, and the applicant is
              bound to pay the service fees to Abroad Inquiry. Be aware that
              Abroad Inquiry will not pay any of your application fee, embassy/VFS
              fee or any costs related to applying abroad. Moreover, students need
              to pay all the additional costs in the whole process, which include-
              university application fee (if applicable), Embassy/VFS fee (if
              applicable), consulate fee (if applicable), DHL fee (if applicable),
              etc.
            </Typography>
          </Typography>

          <br />
          <Typography variant="h6">
            If you want to register online, please pay 20000 Bangladeshi Taka as a
            registration fee (conditionally refundable)
          </Typography>

          <Button 
          onClick={()=>router.push("/payment-method")}
          color="success" 
          variant="outlined" 
          sx={{mt:2}}
          >
            Payment Option
          </Button>
         
        </Box>
      </Container>
    </div>
  );
}

export default RefundPolicy;
