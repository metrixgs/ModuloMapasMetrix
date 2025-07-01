import { LocalStorageKeys } from "@/config";
import { themeOptions } from "@/config.theme";

export const setTheme = (option: string | undefined) => {
  if (option == themeOptions.dark) {
    document.documentElement.className = themeOptions.dark;
    localStorage.setItem(LocalStorageKeys.theme, themeOptions.dark);
  } else {
    document.documentElement.className = "";
    localStorage.setItem(LocalStorageKeys.theme, themeOptions.light);
  }
};

export const getTheme = () => {
  const value = localStorage.getItem(LocalStorageKeys.theme);
  return value == null ? undefined : value;
};

export const detectBrowserTheme = () => {
  const dark = window.matchMedia("(prefers-color-scheme: dark)");

  if (dark.matches) {
    return themeOptions.dark;
  } else if (dark.matches == false) {
    return themeOptions.light;
  } else {
    return undefined;
  }
};

export const initializeTheme = () => {
  let theme;

  if (getTheme()) {
    theme = getTheme();
  } else {
    theme = detectBrowserTheme();
  }

  setTheme(theme);

  return theme;
};