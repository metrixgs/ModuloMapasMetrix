import { useState } from "react"

import Button from "@components/UI/Button";

import { themeOptions } from "@/config.theme";
// import { INITIAL_LAYERS } from "@/config.map";

import { getTheme, setTheme } from "@/utils/themeUtils";

// import { useMapLayersStore } from "@/stores/useMapLayersStore";

const ThemeToggle = () => {

  const [dark, setDark] = useState<boolean>(getTheme() == themeOptions.dark);

  // const { turnOffLayer, turnOnLayer } = useMapLayersStore((state) => state);

  const toggleTheme = () => {
    const current = getTheme();

    if (current == themeOptions.dark) {
      setTheme(themeOptions.light);
      // turnOffLayer(INITIAL_LAYERS.jawg.id);
      // turnOnLayer(INITIAL_LAYERS.positron.id);
      setDark(false);
    } else {
      setTheme(themeOptions.dark);
      // turnOffLayer(INITIAL_LAYERS.positron.id);
      // turnOnLayer(INITIAL_LAYERS.jawg.id);
      setDark(true);
    }
  }

  return (
    <Button onClick={toggleTheme}>
      {
        dark ? 
        "☀️"
        : "🌙"
      }
    </Button>
  )
}

export default ThemeToggle;