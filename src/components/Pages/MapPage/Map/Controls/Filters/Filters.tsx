import { useTranslation } from "react-i18next";
import { Badge } from "flowbite-react";
import { BiFilterAlt } from "react-icons/bi";

import { MapControl } from "@components/Pages/MapPage/Map/Controls/MapControl";
import { useSidebarStore } from "@/stores/useSidebarStore";

import FiltersContent from "@components/Pages/MapPage/Map/Controls/Filters/FiltersContent";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const Filters = () => {
  const { t } = useTranslation("global");

  const { layerFilter } = useMapLayersStore((state) => state);

  const { open, setTitle, setIcon, setChildren } = useSidebarStore(
    (state) => state
  );

  const handleClick = () => {
    setTitle(t("body.controls.filters.sidebar-title"));
    setIcon(<BiFilterAlt className="mr-2" />);
    setChildren(<FiltersContent />);
    open();
  };

  return (
    <MapControl
      className="relative"
      onClick={handleClick}
      title={t("body.controls.filters.title")}
    >
      <Badge
        className="absolute top-0 left-0 -translate-x-1/2 bg-primary-300"
        color="success"
        size="xs"
      >
        {Object.keys(layerFilter).length}
      </Badge>
      <BiFilterAlt className="w-4 h-4" />
    </MapControl>
  );
};

export default Filters;
