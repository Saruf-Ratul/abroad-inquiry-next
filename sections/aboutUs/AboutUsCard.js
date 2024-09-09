"use client"
import React from "react";

import Logo from "@/public/assets/images/logo/logo-square.webp";
import Image from "next/image";
import { Container } from "@mui/material";


// import LabelSection from "../components/LabelSection";



function AboutUsCard() {
  return (
    <>
      <style>
        {`
        .container {
          margin: 60px auto;
          padding: 0 15px;
          font-family: 'Poppins', sans-serif;
          
        }

        .grid {
          display: grid;
          grid-template-columns: 4fr 1fr; 
          gap: 30px;
        }

        .text {
          font-weight: 300;
        }

        .text p {
          text-align: justify;
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 30px;
        //   color: #333333;
          font-weight: 400;
        }

        .image {
          text-align: center;
        }

        .image img {
          max-width: 100%;
          height: auto;
        }

        @media (max-width: 767px) {
          
        .text p {
          margin-bottom: 0px;
        }
          .image {
            padding: 100px;
          }
          .grid {
            grid-template-columns: 1fr; /* Revert to single column layout for smaller screens */
          }
        }

        @media (max-width: 500px) {
         
            .image {
              padding: 40px;
            }
            
          .image img {
           display: none
        }
            
          }
        `}
      </style>
     
     
      <Container className="container">
        <div className="grid">
          <div className="text">
            <p>
              Abroad Inquiry was born in 2017 from an altruist Facebook group
              that has helped hundreds of international students pursue higher
              study abroad worldwide. Abroad Inquiry's a community-based
              platform run by a group of international students from different
              countries. Why was the Abroad Inquiry born? The common thing that
              we noticed is that students are being provided with false
              information and misleading career guidelines from unauthentic
              sources, resulting in the refusal of their visa application and
              career breakthrough. This is not a refusal; we think it’s the
              death of a dream. At our Abroad Inquiry, we provide all accurate
              factual information related to higher study abroad that we have
              acquired from our real-life experience and thorough research. We
              believe that a current student who has already gone through the
              hectic study abroad journey can be the best source of information
              and understand the situation better than others. The information
              obtained is more authentic than online sources or any other
              student consultancy firms. Thus, we have built this platform to
              help upcoming students.
            </p>
          </div>
          <div className="image">
            <Image src={Logo} alt="" width={200} height={200}/>
          </div>
        </div>
        <div className="text">
          <p>
            Our mentors have already graduated from top-notch universities in
            different countries. Moreover, some of them are working at reputed
            companies working relentlessly to ease the journey of potential
            future students. However, we decided to serve upcoming students
            because, as international students, we experienced the same thing
            before going to a new place. For instance, sufficient information,
            the difficulty of getting admission, preparation of necessary
            documents as per the requirement of the respective university, and
            visa consular office are essential to know from authentic sources.
            We have an expert team of passionate individuals who are
            professional to make your dream of studying abroad into a reality.
            Furthermore, we also provide comprehensive guidelines to manage
            housing, part-time jobs, study advice, Permanent Residency, etc.
          </p>
          <p>
            In a nutshell, our company provides complete support from admission
            to settlement in a foreign country. In addition, students will get
            all the support and motivation from our mentors who run this
            company. Therefore, let’s get in touch with us from the very first
            day of your planning stage.
          </p>
        </div>
      </Container>
      {/* <LabelSection title="Want to Apply Abroad ?" buttonText="Click Here" /> */}
     
    </>
  );
}

export default AboutUsCard;