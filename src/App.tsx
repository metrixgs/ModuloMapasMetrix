import { useEffect } from "react";

import { ThemeProvider } from "flowbite-react";

import i18next from "@/translations/index";
import { I18nextProvider } from "react-i18next";

import Home from "@/pages/Home/Home";

import { initializeTheme } from "@/utils/themeUtils";
import { customTheme } from "@/config.theme";

const App = () => {
  useEffect(() => {
    initializeTheme();
  }, [])
  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={customTheme}>
        <Home />
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
