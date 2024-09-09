import PropTypes from "prop-types";
import { forwardRef } from "react";
// next
import NextLink from "next/link";
// @mui
import { Box, Link } from "@mui/material";
// config
import { ICON } from "../../../config";
//
import { isExternalLink } from "..";
import Iconify from "../../Iconify";
import { ListItemStyle } from "./style";

// ----------------------------------------------------------------------

export const NavItemRoot = forwardRef(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent icon={icon} title={title}>
            {children}
          </NavItemContent>
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle
        component={Link}
        href={path}
        target="_blank"
        rel="noopener"
      >
        <NavItemContent icon={icon} title={title}>
          {children}
        </NavItemContent>
      </ListItemStyle>
    ) : (
      <NextLink href={path}>
        <ListItemStyle activeRoot={active}>
          <NavItemContent icon={icon} title={title}>
            {children}
          </NavItemContent>
        </ListItemStyle>
      </NextLink>
    );
  }
);

NavItemRoot.displayName = "NavItemRoot";

// ----------------------------------------------------------------------

export const NavItemSub = forwardRef(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent icon={icon} title={title} subItem>
            {children}
          </NavItemContent>
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle
        subItem
        href={path}
        disableRipple
        rel="noopener"
        target="_blank"
        component={Link}
      >
        <NavItemContent icon={icon} title={title} subItem>
          {children}
        </NavItemContent>
      </ListItemStyle>
    ) : (
      <NextLink href={path}>
        <ListItemStyle disableRipple activeSub={active} subItem>
          <NavItemContent icon={icon} title={title} subItem>
            {children}
          </NavItemContent>
        </ListItemStyle>
      </NextLink>
    );
  }
);

NavItemSub.displayName = "NavItemSub";
// ----------------------------------------------------------------------

function NavItemContent({ icon, title, children, subItem }) {
  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
            "& svg": { width: "100%", height: "100%" },
          }}
        >
          {icon}
        </Box>
      )}
      {title}
      {children && (
        <Iconify
          icon={subItem ? "eva:chevron-right-fill" : "eva:chevron-down-fill"}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
      {children}
    </>
  );
}
