// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaWhatsapp,
//   FaYoutube,
// } from "react-icons/fa";

export const phoneNumbers = [
  "+8801718665274",
  "+8801813067704",
  "+8801911248972",
  "+8801914308005",
  "+8801717733386",
];

// export const socialMediaLinks = [
//   {
//     href: "https://wa.me/+8801712343359",
//     icon: FaWhatsapp,
//     background: "#00A884",
//   },
//   {
//     href: "https://www.facebook.com/Abroadinquiry/",
//     icon: FaFacebook,
//     background: "#166FE5",
//   },
//   {
//     href: "https://www.youtube.com/c/AbroadInquiry",
//     icon: FaYoutube,
//     background: "#FF0000",
//   },
//   {
//     href: "https://www.instagram.com/abroadinquiryofficial",
//     icon: FaInstagram,
//     background:
//       "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
//   },
//   {
//     href: "https://bd.linkedin.com/company/abroadinquiry?trk=public_profile_topcard-current-company",
//     icon: FaLinkedin,
//     background: "#0a66c2",
//   },
// ];

export const email = {
  href: "info@abroadinquiry.com",
};

export const address = {
  title:
    "Block: C, House No: 47, Road No: 6, 5th floor, Niketon,Gulshan 1. Dhaka -1212, Bangladesh",
  href: "https://www.google.com/maps/place/Abroad+Inquiry/@23.7727425,90.4098402,17z/data=!3m2!4b1!5s0x3755c778764dffe3:0x1c228f7976fd0bed!4m6!3m5!1s0x3755c71071531def:0x679ff0b229fcaa71!8m2!3d23.7727376!4d90.4124151!16s%2Fg%2F11j8_0grnp?entry=ttu",
};

export const officeLocation = [
  {
    title: "Bangladesh Office",
    address:
      "Block: C, House No: 47, Road No: 6, 5th floor, Niketon,Gulshan 1. Dhaka -1212, Bangladesh.",
    href: "https://www.google.com/maps/place/Abroad+Inquiry/@23.7727425,90.4098402,17z/data=!3m2!4b1!5s0x3755c778764dffe3:0x1c228f7976fd0bed!4m6!3m5!1s0x3755c71071531def:0x679ff0b229fcaa71!8m2!3d23.7727376!4d90.4124151!16s%2Fg%2F11j8_0grnp?entry=ttu",
  },
  {
    title: "Netherlands Office",
    address: "Stationsweg 267, 2515 CA, The Hague, Netherlands.",
    href: "/",
  },
];

export const officeInfo = [
  {
    ...officeLocation[0],
    officeHour: "Sat - Thu 9.30 AM - 6.00 PM",
    email: email,
    phone: phoneNumbers,
    country: "Bangladesh",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d322.7309433020732!2d90.41230002696352!3d23.772905683210215!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x679ff0b229fcaa71!2sAbroad%20Inquiry!5e0!3m2!1sen!2sbd!4v1650032843785!5m2!1sen!2sbd",
  },
  {
    ...officeLocation[1],
    officeHour: "Sat - Thu 9.30 AM - 6.00 PM",
    email: email,
    phone: phoneNumbers,
    country: "Netherlands",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452.5143315021437!2d4.3214407999999995!3d52.07036639999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b71fc0e8a2bf%3A0xec5e74c07b36fc72!2sStationsweg%20267%2C%202515%20BM%20Den%20Haag%2C%20Netherlands!5e0!3m2!1sen!2sbd!4v1691078545002!5m2!1sen!2sbd",
  },
];
