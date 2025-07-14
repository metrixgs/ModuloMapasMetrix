import { useState } from "react"

import Button from "@components/UI/Button";

import { themeOptions } from "@/config.theme";
import { LAYERS } from "@/config.map";

import { getTheme, setTheme } from "@/utils/themeUtils";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

const ThemeToggle = () => {

  const [dark, setDark] = useState<boolean>(getTheme() == themeOptions.dark);

  const { turnOffLayer, turnOnLayer } = useMapLayersStore((state) => state);

  const toggleTheme = () => {
    const current = getTheme();

    if (current == themeOptions.dark) {
      setTheme(themeOptions.light);
      turnOffLayer(LAYERS.jawg.id);
      turnOnLayer(LAYERS.positron.id);
      setDark(false);
    } else {
      setTheme(themeOptions.dark);
      turnOffLayer(LAYERS.positron.id);
      turnOnLayer(LAYERS.jawg.id);
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