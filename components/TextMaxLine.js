"use client";
import { forwardRef } from "react";
// @mui
import { Link, Typography } from "@mui/material";
// utils
import GetFontValue from "../utils/getFontValue";

// ----------------------------------------------------------------------

const TextMaxLine = forwardRef(
  (
    {
      asLink,
      variant = "body1",
      line = 2,
      persistent = false,
      children,
      sx,
      ...other
    },
    ref
  ) => {
    const { lineHeight } = GetFontValue(variant);

    const style = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: line,
      WebkitBoxOrient: "vertical",
      ...(persistent && {
        height: lineHeight * line,
      }),
      ...sx,
    };

    if (asLink) {
      return (
        <Link
          color="inherit"
          ref={ref}
          variant={variant}
          sx={{ ...style }}
          {...other}
        >
          {children}
        </Link>
      );
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Typography>
    );
  }
);

TextMaxLine.displayName = "TextMaxLine";
export default TextMaxLine;
