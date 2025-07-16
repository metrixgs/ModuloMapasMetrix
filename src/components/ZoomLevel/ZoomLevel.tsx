import { useState, type ChangeEvent } from "react";

import {
  Popover,
  TextInput,
  Label,
  HelperText,
  RangeSlider,
} from "flowbite-react";

import { useTranslation } from "react-i18next";

import { BiChevronUp, BiShare } from "react-icons/bi";

import Button from "@components/UI/Button";

import { useMapStore } from "@/stores/useMapStore";
import { useMapStateStore } from "@/stores/useMapStateStore";
import { MAX_ZOOM, MIN_ZOOM } from "@/config.map";

const ZoomLevel = () => {
  const { t } = useTranslation("global");

  const { map } = useMapStore((state) => state);
  const { zoom } = useMapStateStore((state) => state);

  const [zoom_, setZoom_] = useState<string>("");

  const handleClick = () => {
    map?.setZoom(parseInt(zoom_));
  };

  const handleChangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
    setZoom_(e.target.value);
    map?.setZoom(parseInt(e.target.value));
  };

  const ZoomContent = (
    <>
      {/* <div className="max-w-72 py-3 px-4 flex flex-col">
        <Label>{t("body.footer.zoom.zoom-title")}</Label>
        <div className="w-full mt-4 flex gap-2">
          <TextInput
            type="number"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            className="flex-grow"
            value={zoom_}
            onChange={(e) => setZoom_(e.target.value)}
            sizing="sm"
          />
          <Button onClick={handleClick}>
            <BiShare className="w-5 h-5 rotate-y-180" />
          </Button>
        </div>
        <HelperText>{t("body.footer.zoom.zoom-helper")}</HelperText>
      </div> */}
      <div className="max-w-72 py-3 px-4 flex flex-col">
        <Label>{t("body.footer.zoom.zoom-title")}</Label>
        <div className="w-full flex gap-2 ">
          <RangeSlider
            className="flex-grow"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            value={zoom}
            onChange={handleChangeSlider}
            sizing="lg"
          />
          <span className="w-11 text-center text-sm font-black dark:text-white">
            { zoom }
          </span>
        </div>
        <HelperText>{t("body.footer.zoom.zoom-slider-helper")}</HelperText>
      </div>
    </>
  );

  return (
    <div className="min-w-24 flex items-center justify-between">
      <p className="text-xs dark:text-white">
        <span className="font-bold">{t("body.footer.zoom.title")}:</span> {zoom}
      </p>
      <Popover content={ZoomContent}>
        <Button>
          <BiChevronUp className="w-5 h-5" />
        </Button>
      </Popover>
    </div>
  );
};

export default ZoomLevel;
