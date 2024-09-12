// @mui
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
//
import Link from "next/link";
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

export default function SocialsButton({
  initialColor = false,
  simple = true,
  links = {},
  sx,
  ...other
}) {
  const SOCIALS = [
    {
      name: "Whatsapp",
      icon: "ic:outline-whatsapp",
      socialColor: "#00A884",
      path: links.whatsapp || "https://wa.me/+8801712343359",
    },
    {
      name: "FaceBook",
      icon: "eva:facebook-fill",
      socialColor: "#1877F2",
      path: links.facebook || "https://www.facebook.com/Abroadinquiry/",
    },
    {
      name: "Youtube",
      icon: "mingcute:youtube-line",
      socialColor: "#FF0000",
      path: links.youtube || "https://www.youtube.com/c/AbroadInquiry",
    },
    {
      name: "Instagram",
      icon: "mdi:instagram",
      socialColor: "#E02D69",
      path:
        links.instagram || "https://www.instagram.com/abroadinquiryofficial",
    },
    {
      name: "Linkedin",
      icon: "eva:linkedin-fill",
      socialColor: "#007EBB",
      path:
        links.linkedin ||
        "https://bd.linkedin.com/company/abroadinquiry?trk=public_profile_topcard-current-company",
    },
  ];

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      {SOCIALS.map((social) => {
        const { name, icon, path, socialColor } = social;
        return simple ? (
          <Link key={name} href={path} target="_blank">
            <Tooltip title={name} placement="top">
              <IconButton
                color="inherit"
                sx={{
                  ...(initialColor && {
                    color: socialColor,
                    "&:hover": {
                      bgcolor: alpha(socialColor, 0.08),
                    },
                  }),
                  ...sx,
                }}
                {...other}
              >
                <Iconify icon={icon} sx={{ width: 24, height: 24}} />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <Button
            key={name}
            href={path}
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={icon} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                "&:hover": {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08),
                },
              }),
              ...sx,
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
