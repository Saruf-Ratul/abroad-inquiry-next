import { Box, Card, Container, Typography } from '@mui/material'
import React from 'react'


function Disclaimer() {
    return (
        <div style={{marginTop:"120px"}}>
            <Container maxWidth="lg" >
                <Card sx={{px:8 ,mt:8}}>
                <Box margin="auto" textAlign="center" py={5}>
                    <Typography variant='h2' marginY={3} textAlign="center">Disclaimer</Typography>
                    <Typography textAlign="justify" marginBottom={8}>
                        To get admission, scholarship and visa depend on the admission board, embassy,
                        or particular countrys university/immigration policy. In addition, the candidates 
                        academic and professional profile, financial documents, motivation letter, and embassy 
                        interview also played a vital role in the success of an application. Due to the immigration
                         policy and periodic changes of the admission/immigration rules, Abroad Inquiry is not ensuring 
                         or conforming to the aspirants to get 100% admission/visa. However, Abroad Inquiry is guiding the 
                         candidates through expert mentors so that the applicants get a better outcome of their 
                         application. In addition, the Abroad Inquiry team will accept files of the students eligible 
                         to make applications abroad.
                        Moreover, students need to pay all the additional costs in the whole process, which include- 
                        university application fee (if applicable), Embassy/VFS fee (if applicable), 
                        consulate fee (if applicable), DHL fee (if applicable), etc. Consequently, provided information
                         about various countries through the website/app is not entirely accurate. Therefore, Abroad Inquiry 
                         advises the applicants to check the information from the relevant website. Last but not least,
                          before aspirants apply through Abroad Inquiry, candidates are strongly advised to double-check
                           our refund policy, privacy policy & terms, and conditions.
                        <br />
                        If aspirants have any questions regarding the refund policy, service charge
                         policy, privacy policy, and term conditions, do not hesitate to contact us.
                    </Typography>
                </Box>
                </Card>
            </Container>
        </div>
    )
}

export default Disclaimer
