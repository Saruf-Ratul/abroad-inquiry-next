import useSettings from "@/hooks/useSettings";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Iconify from "./Iconify";

// Custom styled component for the button container
const ToggleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  // width: 56, // Adjust width to fit the icon properly
  // height: 56, // Adjust height to fit the icon properly
  transition: theme.transitions.create("all", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SettingMode() {
  const { themeMode, onChangeMode } = useSettings();
  const [mode, setMode] = useState(themeMode);

  const handleToggle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    onChangeMode({ target: { value: newMode } });
  };


  return (
    // <ToggleContainer>
    <IconButton onClick={handleToggle}>
      <Iconify
        icon={mode === "light" ? "ph:moon-duotone" : "ph:sun-duotone"}
        width={28}
        height={28}
      />
    </IconButton>
    //    </ToggleContainer>
  );
}
