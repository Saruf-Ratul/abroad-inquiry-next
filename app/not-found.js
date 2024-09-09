import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Img from '../public/assets/images/others/404.webp';
import Iconify from "@/components/Iconify";
import Link from 'next/link';


function NotFound() {
    
    return (
        <>
            <Container maxWidth="sm" >
                <Box margin="auto" textAlign="center" py={10}>
                    <Image 
                        placeholder='blur'
                        src={Img} 
                        alt="Page Not Found" 
                        layout="responsive" 
                        width={700} 
                        height={700} 
                        style={{ width: '100%', height: 'auto' }} // Ensure it respects the parent's width
                    />
                    <Typography variant='h2'  marginY={3} textAlign="center">
                        Page Not Found
                    </Typography>
                   <Link href={"/"}>
                   <Button 
                    variant="contained" 
                    color="success"
                    startIcon={
                        <Iconify icon={"akar-icons:arrow-back-thick-fill"} width={24} height={24} />
                      }
                    >
                        Back to home
                    </Button>
                   </Link>
                </Box>
            </Container>
        </>
    );
}

export default NotFound;
