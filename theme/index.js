"use client";
import { useMemo } from "react";
// @mui
import useSettings from "@/hooks/useSettings";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import breakpoints from "./breakpoints";
import ComponentsOverrides from "./overrides";
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import typography from "./typography";

export default function ThemeProvider({ children }) {
  const { themeMode } = useSettings();
  const isLight = themeMode === "light";
  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );
  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
