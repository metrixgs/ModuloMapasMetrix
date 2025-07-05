import { BiFilterAlt } from "react-icons/bi";

import { MapControl } from "@components/Map/Controls/MapControl";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useTranslation } from "react-i18next";

import FiltersContent from "@components/Map/Controls/Filters/FiltersContent/FiltersContent";

const Filters = () => {
  const { t } = useTranslation("global");
  const {
    open,
    setTitle,
    setIcon,
    setChildren
  } = useSidebarStore((state) => state);

  const handleClick = () => {
    setTitle(t("body.controls.filters.sidebar-title"));
    setIcon(<BiFilterAlt className="mr-2" />);
    setChildren(<FiltersContent />);
    open();
  }

  return (
    <MapControl onClick={handleClick} title={t("body.controls.filters.title")}>
      <BiFilterAlt className="w-4 h-4" />
    </MapControl>
  )
}

export default Filters;