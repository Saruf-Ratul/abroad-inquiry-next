import { m } from "framer-motion";
import { useEffect, useState } from "react";
// next
import NextLink from "next/link";
import { usePathname } from "next/navigation";
// @mui
import {
  Box,
  CardActionArea,
  Grid,
  Link,
  List,
  ListSubheader,
  Popover,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  textDecoration: "none",
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

const ListItemStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  alignItems: "center",
  padding: 0,
  marginTop: theme.spacing(3),
  color: theme.palette.text.secondary,
  transition: theme.transitions.create("color"),
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

// ----------------------------------------------------------------------

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row">
      {navConfig.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function IconBullet({ type = "item" }) {
  return (
    <Box sx={{ width: 24, height: 16, display: "flex", alignItems: "center" }}>
      <Box
        component="span"
        sx={{
          ml: "2px",
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "currentColor",
          ...(type !== "item" && {
            ml: 0,
            width: 8,
            height: 2,
            borderRadius: 2,
          }),
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

function MenuDesktopItem({ item, isHome, isOpen, isOffset, onOpen, onClose }) {
  const pathname = usePathname();

  const { title, path, children } = item;

  const isActive = (path) => pathname === path;
  if (children) {
    return (
      <>
        <LinkStyle
          onClick={onOpen}
          sx={{
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            ...(isHome && { color: "common.white" }),
            ...(isOffset && { color: "text.primary" }),
            ...(isOpen && { opacity: 0.48 }),
          }}
        >
          {title}
          <Iconify
            icon={
              isOpen
                ? "eva:arrow-ios-upward-fill"
                : "eva:arrow-ios-downward-fill"
            }
            sx={{ ml: 0.5, width: 16, height: 16 }}
          />
        </LinkStyle>

        <Popover
          open={isOpen}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 80, left: 0 }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={onClose}
          PaperProps={{
            sx: {
              px: 3,
              pt: 5,
              pb: 3,
              right: 16,
              m: "auto",
              borderRadius: 2,
              maxWidth: (theme) => theme.breakpoints.values.lg,
              boxShadow: (theme) => theme.customShadows.z24,
            },
          }}
        >
          <Grid container spacing={3}>
            {children.map((list) => {
              const { subheader, items } = list;

              return (
                <Grid
                  key={subheader}
                  item
                  xs={12}
                  md={subheader === "Dashboard" ? 6 : 2}
                >
                  <List disablePadding>
                    <ListSubheader
                      disableSticky
                      disableGutters
                      sx={{
                        display: "flex",
                        lineHeight: "unset",
                        alignItems: "center",
                        color: "text.primary",
                        typography: "overline",
                      }}
                    >
                      <IconBullet type="subheader" /> {subheader}
                    </ListSubheader>

                    {items.map((item) => (
                      <NextLink key={item.title} href={item.path} passHref>
                        <ListItemStyle
                          underline="none"
                          sx={{
                            ...(isActive(item.path) && {
                              color: "text.primary",
                              typography: "subtitle2",
                            }),
                          }}
                        >
                          {item.title === "Dashboard" ? (
                            <CardActionArea
                              sx={{
                                py: 5,
                                px: 10,
                                borderRadius: 2,
                                color: "primary.main",
                                bgcolor: "background.neutral",
                              }}
                            >
                              <Box
                                component={m.img}
                                whileTap="tap"
                                whileHover="hover"
                                variants={{
                                  hover: { scale: 1.02 },
                                  tap: { scale: 0.98 },
                                }}
                                src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_dashboard.png"
                              />
                            </CardActionArea>
                          ) : (
                            <>
                              <IconBullet />
                              {item.title}
                            </>
                          )}
                        </ListItemStyle>
                      </NextLink>
                    ))}
                  </List>
                </Grid>
              );
            })}
          </Grid>
        </Popover>
      </>
    );
  }

  if (title === "Documentation") {
    return (
      <LinkStyle
        href={path}
        target="_blank"
        rel="noopener"
        sx={{
          ...(isHome && { color: "common.white" }),
          ...(isOffset && { color: "text.primary" }),
        }}
      >
        {title}
      </LinkStyle>
    );
  }

  return (
    <NextLink href={path} style={{ textDecoration: "none" }}>
      <LinkStyle
        sx={{
          ...(isHome && { color: "common.white" }),
          ...(isOffset && { color: "text.primary" }),
          ...(isActive(path) && {
            color: "secondary.main",
          }),
        }}
      >
        {title}
      </LinkStyle>
    </NextLink>
  );
}
