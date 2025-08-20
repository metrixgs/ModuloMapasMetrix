import { type PathOptions } from "leaflet";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Label, TextInput, ToggleSwitch } from "flowbite-react";

interface PointPathOptionsProps {
  initialPathOptions?: PathOptions;
  onPathOptionsChange?: (newPathOptions: PathOptions) => void;
}

const PointPathOptions = ({
  initialPathOptions,
  onPathOptionsChange,
}: PointPathOptionsProps) => {
  const { t } = useTranslation("global");
  const tref = "body.controls.layers.tabs.symbology.controller.options";

  const [fill, setFill] = useState(initialPathOptions?.fill);
  const [fillColor, setFillColor] = useState(initialPathOptions?.fillColor);
  const [fillOpacity, setFillOpacity] = useState(
    initialPathOptions?.fillOpacity
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (onPathOptionsChange) {
        onPathOptionsChange({
          fill,
          fillOpacity,
          fillColor,
        });
      }
    }, 100);

    return () => {
      clearTimeout(debounce);
    };
  }, [fill, fillOpacity, fillColor]);

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-2 items-center">
        <Label>{t(tref + ".fill-label")}</Label>
        <ToggleSwitch
          checked={fill ? fill : false}
          onChange={() => setFill(!fill)}
          sizing="sm"
        />
      </div>
      <div className="grid grid-cols-2 items-center">
        <Label>{t(tref + ".fill-opacity-label")}</Label>
        <TextInput
          className="w-18"
          type="number"
          min={0}
          max={100}
          step={1}
          sizing="sm"
          value={fillOpacity && fillOpacity*100}
          onChange={(e) => setFillOpacity(Number(e.target.value)/100)}
        />
      </div>
      <div className="grid grid-cols-2 items-center">
        <Label>{t(tref + ".fill-color-label")}</Label>
        <input
          type="color"
          value={fillColor}
          onChange={(e) => setFillColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PointPathOptions;
