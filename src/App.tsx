import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "flowbite-react";

import i18next from "@/translations/index";
import { I18nextProvider } from "react-i18next";

// Pages
import HomePage from "./pages/Home/HomePage";
import MapPage from "@/pages/MapPage/MapPage";

import { initializeTheme } from "@/utils/themeUtils";
import { customTheme } from "@/config.theme";

const App = () => {
  useEffect(() => {
    initializeTheme();
  }, []);
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={customTheme}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map/:id" element={<MapPage />} />
          </Routes>
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
};

export default App;
