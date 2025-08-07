import { useTranslation } from "react-i18next";

import { BiUser } from "react-icons/bi";

import { useModalStore } from "@/stores/useModalStore";

import { MapControl } from "@components/Pages/MapPage/Map/Controls/MapControl";
import BddContent from "@components/Pages/MapPage/Bdd/BddContent";

const Bdd = () => {
  const { t } = useTranslation("global");

  const { setTitle, setChildren, setSize, open } = useModalStore(
    (state) => state
  );

  const clickHandler = () => {
    setChildren(<BddContent />);
    setSize("7xl");
    setTitle(t("body.controls.bdd.title"));
    open();
  };
  return (
    <MapControl onClick={clickHandler}>
      <BiUser className="w-4 h-4" />
    </MapControl>
  );
};

export default Bdd;
