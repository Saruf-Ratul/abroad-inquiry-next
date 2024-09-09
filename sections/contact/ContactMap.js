import OfficeInfoCard from "@/components/OfficeInfoCard";
import { Container, Divider } from "@mui/material";
import React from "react";
import { officeInfo } from "@/data/contact";

export default function ContactMap() {
  return (
    <>
    <Container maxWidth="md" sx={{marginBottom:"60px"}}>
    <Divider style={{ margin: "50px 0" }} />
     
        {officeInfo.map((item, idx) => (
          <div key={idx}>
            <OfficeInfoCard key={idx} item={item} />
            {idx !== officeInfo.length - 1 && <Divider sx={{ my: 5 }} />}
          </div>
        ))}
        <br />
    </Container>
    </>
  );
}
