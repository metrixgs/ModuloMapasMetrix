import { type PathOptions } from "leaflet";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Label, ToggleSwitch, RangeSlider } from "flowbite-react";

interface LineStringPathOptionsProps {
  initialPathOptions?: PathOptions;
  onPathOptionsChange?: (newPathOptions: PathOptions) => void;
}

const LineStringPathOptions = ({
  initialPathOptions,
  onPathOptionsChange,
}: LineStringPathOptionsProps) => {
  const { t } = useTranslation("global");
  const tref = "body.controls.layers.tabs.symbology.controller.options";

  const [stroke, setStroke] = useState(initialPathOptions?.stroke);
  const [weight, setWeight] = useState(initialPathOptions?.weight);
  const [opacity, setOpacity] = useState(initialPathOptions?.opacity);
  const [color, setColor] = useState(initialPathOptions?.color);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (onPathOptionsChange) {
        onPathOptionsChange({
          stroke,
          weight,
          opacity,
          color,
        });
      }
    }, 100);

    return () => {
      clearTimeout(debounce);
    };
  }, [stroke, weight, opacity, color]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 items-center">
        <Label>{t(tref + ".stroke-label")}</Label>
        <ToggleSwitch
          sizing="sm"
          checked={stroke ? stroke : false}
          onChange={() => setStroke(!stroke)}
        />
      </div>
      <div className="grid grid-cols-2 items-center">
        <Label>{t(tref + ".stroke-weight-label")}</Label>
        <RangeSlider
          className="accent-primary-500"
          min={0}
          max={10}
          sizing="lg"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-2 items-center">
        <Label>{t(tref + ".stroke-opacity-label")}</Label>
        <RangeSlider
          className="accent-primary-500"
          min={0}
          max={100}
          step={1}
          sizing="lg"
          value={opacity && opacity*100}
          onChange={(e) => setOpacity(Number(e.target.value)/100)}
        />
      </div>
      <div className="grid grid-cols-2 items-center">
        <Label>{t(tref + ".stroke-color-label")}</Label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LineStringPathOptions;
