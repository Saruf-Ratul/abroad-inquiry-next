import { useEffect, useState } from "react";
// next
import NextLink from "next/link";
import { usePathname } from "next/navigation";
// @mui
import {
  Box,
  Collapse,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// config
import { NAVBAR } from "@/config";
// components
import Iconify from "@/components/Iconify";
import Logo from "@/components/Logo";
import Scrollbar from "@/components/Scrollbar";
import { IconButtonAnimate } from "@/components/animate";
import { NavSectionVertical } from "@/components/nav-section";

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

export default function MenuMobile({ isOffset, isHome = "", navConfig }) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: "common.white" }),
          ...(isOffset && { color: "text.primary" }),
        }}
      >
        <Iconify icon={"eva:menu-2-fill"} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List disablePadding>
            {navConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
              />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

function MenuMobileItem({ item, isOpen, onOpen }) {
  const pathname = usePathname();
  const { title, path, icon, children } = item;

  const isActive = pathname === path;

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Iconify
            icon={
              isOpen
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
            <NavSectionVertical
              navConfig={children}
              sx={{
                "& .MuiList-root:last-of-type .MuiListItemButton-root": {
                  height: 200,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  bgcolor: "background.neutral",
                  backgroundRepeat: "no-repeat",
                  backgroundImage:
                    "url(https://minimal-assets-api.vercel.app/assets/illustrations/illustration_dashboard.png)",
                  "& > *:not(.MuiTouchRipple-root)": { display: "none" },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  if (title === "Documentation") {
    return (
      <ListItemStyle
        href={path}
        target="_blank"
        rel="noopener"
        component={Link}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    );
  }

  return (
    <Link component={NextLink} href={path} passHref>
      <ListItemStyle
        sx={{
          ...(isActive && {
            color: "secondary.main",
            fontWeight: "fontWeightMedium",
            bgcolor: (theme) =>
              alpha(
                theme.palette.secondary.main,
                theme.palette.action.selectedOpacity
              ),
          }),
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    </Link>
  );
}
