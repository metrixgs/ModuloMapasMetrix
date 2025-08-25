import { useState } from "react";

import { Popover, TextInput, Label, HelperText } from "flowbite-react";

import { useTranslation } from "react-i18next";

import { BiChevronUp, BiShare } from "react-icons/bi";

import Button from "@components/UI/Button";

import { INITIAL_VIEW } from "@/config.map";
import { currentCoordsId } from "@/config.id";

import { formatNumber } from "@/utils/numberUtils";

import { useMapStore } from "@/stores/useMapStore";

const Coordinates = () => {
  const { t } = useTranslation("global");

  const { map } = useMapStore((state) => state);

  const [coordinates, setCoordinates] = useState<string>("");

  const handleClick = () => {
    const latLng = coordinates.split(",");

    if (latLng.length === 2) {
      try {
        const lat = parseFloat(latLng[0]);
        const lng = parseFloat(latLng[1]);

        if (lat > -90 && lat < 90 && lng > -180 && lng < 180) {
          map?.flyTo([lat, lng], 15);
          setCoordinates("");
        } else {
          throw new Error("Latitude or Longitude out of range.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const CoordinatesContent = (
    <div className="max-w-72 py-3 px-4 flex flex-col">
      <Label>{t("body.footer.coordinates.goto-title")}</Label>
      <div className="w-full mt-4 flex gap-2">
        <TextInput
          className="flex-grow"
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
          sizing="sm"
        />
        <Button onClick={handleClick}>
          <BiShare className="w-5 h-5 rotate-y-180" />
        </Button>
      </div>
      <HelperText>{t("body.footer.coordinates.goto-helper")}</HelperText>
    </div>
  );

  return (
    <div className="min-w-[calc(4px*68)] flex items-center justify-between">
      <div className="text-xs dark:text-white">
        <span className="font-bold">{t("body.footer.coordinates.title")}:</span>{" "}
        <span id={currentCoordsId}>
          {formatNumber(INITIAL_VIEW.center.lat, { maximumFractionDigits: 6 })},{" "}
          {formatNumber(INITIAL_VIEW.center.lng, { maximumFractionDigits: 6 })}
        </span>
      </div>
      <Popover content={CoordinatesContent}>
        <Button>
          <BiChevronUp className="w-5 h-5" />
        </Button>
      </Popover>
    </div>
  );
};

export default Coordinates;
