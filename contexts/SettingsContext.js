"use client";

import { createContext, useEffect, useState } from "react";
// config
import { onChangeSetting } from "@/utils/chageSetting";
import { defaultSettings } from "../config";

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  onChangeMode: () => {},
  onToggleMode: () => {},
  onResetSetting: () => {},
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

function SettingsProvider({ children, defaultSettings = {} }) {
  const [settings, setSettings] = useSettingCookies(defaultSettings);

  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    });
  };

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        onChangeMode,
        onToggleMode,
        // Reset Setting
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContext, SettingsProvider };

// ----------------------------------------------------------------------

function useSettingCookies(defaultSettings) {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    onChangeSetting(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return [settings, setSettings];
}
