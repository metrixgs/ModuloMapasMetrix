import { useTranslation } from "react-i18next";

import type { Layer, LocationEvent, Popup } from "leaflet";

import Button from "@components/UI/Button";

interface LocationPopupProps {
  location: LocationEvent;
  popup?: Popup;
  layers: Layer[];
}

const LocationPopup = ({ location, layers }: LocationPopupProps) => {
  const { t } = useTranslation("global");

  const handleClick = () => {
    layers.forEach((layer) => {
      layer.remove();
    });
  };
  return (
    <div className="p-4 flex flex-col gap-2">
      <div>
        <span className="font-bold">
          {t("body.controls.location.latitude")}:
        </span>{" "}
        {location.latlng.lat}
      </div>
      <div>
        <span className="font-bold">
          {t("body.controls.location.longitude")}:
        </span>{" "}
        {location.latlng.lng}
      </div>
      <div>
        <span className="font-bold">
          {t("body.controls.location.accuracy")}:
        </span>{" "}
        {location.accuracy} m
      </div>
      <div className="h-6 flex justify-center">
        <Button onClick={handleClick}>
          {t("body.controls.location.delete")}
        </Button>
      </div>
    </div>
  );
};

export default LocationPopup;
